document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.status-container');
    const dragHandles = document.querySelectorAll('.drag-handle');
    const board = document.querySelector('.kanban-board');

    let draggedItem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialX = 0;
    let initialY = 0;
    let originalContainer = null;
    let originalIndex = 0;

    // Initialize responsive layout
    updateLayout();
    window.addEventListener('resize', updateLayout);

    // Drag handle events
    dragHandles.forEach(handle => {
        const card = handle.parentElement;

        handle.addEventListener('touchstart', handleDragStart);
        card.addEventListener('touchstart', handleDragStart);

        handle.addEventListener('mousedown', handleDragStart);
        card.addEventListener('mousedown', handleDragStart);
    });

    function handleDragStart(e) {
        e.preventDefault();
        
        draggedItem = e.target.closest('.task-card');
        if (!draggedItem) return;

        // Store initial positions
        if (e.type === 'touchstart') {
            dragStartX = e.touches[0].clientX;
            dragStartY = e.touches[0].clientY;
        } else {
            dragStartX = e.clientX;
            dragStartY = e.clientY;
        }

        const rect = draggedItem.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        originalContainer = draggedItem.parentElement;
        originalIndex = Array.from(originalContainer.children).indexOf(draggedItem);

        // Expand card for dragging
        draggedItem.classList.add('dragging');
        draggedItem.style.height = 'auto';
        draggedItem.style.minHeight = '80px';
        draggedItem.querySelector('.task-description').style.display = '-webkit-box';
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';

        // Add event listeners
        document.addEventListener('touchmove', handleDragMove);
        document.addEventListener('touchend', handleDragEnd);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    }

    function handleDragMove(e) {
        if (!draggedItem) return;
        e.preventDefault();

        // Get current position
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Calculate movement
        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        // Update position
        draggedItem.style.left = `${initialX + deltaX}px`;
        draggedItem.style.top = `${initialY + deltaY}px`;

        // Check if we need to auto-scroll
        checkAutoScroll(clientY);
    }

    function handleDragEnd(e) {
        if (!draggedItem) return;
        e.preventDefault();

        // Get drop position
        let clientX, clientY;
        if (e.type === 'touchend') {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Reset card styles
        resetCardStyles();

        // Find drop target
        const dropTarget = document.elementFromPoint(clientX, clientY);
        const dropContainer = findDropContainer(dropTarget);

        // Move card to new position
        if (dropContainer) {
            const afterElement = getDragAfterElement(dropContainer, clientY);
            if (afterElement) {
                dropContainer.insertBefore(draggedItem, afterElement);
            } else {
                dropContainer.appendChild(draggedItem);
            }
        } else {
            // Return to original position if drop is invalid
            originalContainer.insertBefore(draggedItem, originalContainer.children[originalIndex]);
        }

        // Update layout
        setTimeout(updateLayout, 10);

        // Clean up
        cleanup();
    }

    function resetCardStyles() {
        draggedItem.style.position = '';
        draggedItem.style.width = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.pointerEvents = '';
        draggedItem.style.height = '';
        draggedItem.style.minHeight = '';
        draggedItem.querySelector('.task-description').style.display = '';
        draggedItem.classList.remove('dragging');
    }

    function cleanup() {
        if (!draggedItem) return;
        
        draggedItem = null;
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
    }

    function findDropContainer(element) {
        while (element && !element.classList.contains('status-container')) {
            element = element.parentElement;
            if (!element || element === document.body) return null;
        }
        return element;
    }

    function getDragAfterElement(container, y) {
        const cards = [...container.querySelectorAll('.task-card:not(.dragging)')];
        
        return cards.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function checkAutoScroll(y) {
        const scrollThreshold = 50;
        const scrollSpeed = 10;
        
        containers.forEach(container => {
            const rect = container.getBoundingClientRect();
            // Check if near top
            if (y < rect.top + scrollThreshold) {
                container.scrollTop -= scrollSpeed;
            }
            // Check if near bottom
            else if (y > rect.bottom - scrollThreshold) {
                container.scrollTop += scrollSpeed;
            }
        });
    }

    function updateLayout() {
        // Update empty states
        document.querySelectorAll('.status-column').forEach(column => {
            const container = column.querySelector('.status-container');
            const isEmpty = container.children.length === 0;
            
            column.classList.toggle('empty', isEmpty);
            
            // Force compact mode for columns with 3+ tasks
            const shouldCompact = container.children.length >= 3;
            column.classList.toggle('compact', shouldCompact);
        });
        
        // Adjust board columns based on available space
        const boardWidth = board.clientWidth;
        const minColumnWidth = 200;
        const maxColumns = Math.min(Math.floor(boardWidth / minColumnWidth), 4);
        board.style.gridTemplateColumns = `repeat(${maxColumns}, minmax(${minColumnWidth}px, 1fr))`;
    }
});