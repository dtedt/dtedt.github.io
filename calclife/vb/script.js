document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.status-container');
    const dragHandles = document.querySelectorAll('.drag-handle');

    let draggedItem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialX = 0;
    let initialY = 0;

    // Add event listeners to drag handles
    dragHandles.forEach(handle => {
        const card = handle.parentElement;

        // Touch events for mobile
        handle.addEventListener('touchstart', handleDragStart);
        card.addEventListener('touchstart', handleDragStart);

        // Mouse events for desktop
        handle.addEventListener('mousedown', handleDragStart);
        card.addEventListener('mousedown', handleDragStart);
    });

    function handleDragStart(e) {
        e.preventDefault();
        
        // Get the card element
        draggedItem = e.target.closest('.task-card');
        if (!draggedItem) return;

        // Get initial position
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

        // Set dragging styles
        draggedItem.classList.add('dragging');
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';

        // Add move and end listeners
        document.addEventListener('touchmove', handleDragMove);
        document.addEventListener('touchend', handleDragEnd);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    }

    function handleDragMove(e) {
        if (!draggedItem) return;
        e.preventDefault();

        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Calculate new position
        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        // Update position
        draggedItem.style.left = `${initialX + deltaX}px`;
        draggedItem.style.top = `${initialY + deltaY}px`;
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

        // Find drop target
        const dropTarget = document.elementFromPoint(clientX, clientY);
        const dropContainer = findDropContainer(dropTarget);

        // Reset styles before moving back to DOM
        draggedItem.style.position = '';
        draggedItem.style.width = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.pointerEvents = '';
        draggedItem.classList.remove('dragging');

        // Move to new container if valid
        if (dropContainer) {
            const afterElement = getDragAfterElement(dropContainer, clientY);
            if (afterElement) {
                dropContainer.insertBefore(draggedItem, afterElement);
            } else {
                dropContainer.appendChild(draggedItem);
            }
        }

        // Clean up
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
});