document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    const columns = document.querySelectorAll('.status-column');
    let draggedItem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let currentDropTarget = null;

    // Initialize
    initDragAndDrop();
    updateLayout();
    window.addEventListener('resize', debounce(updateLayout, 100));

    function initDragAndDrop() {
        // Add event listeners to all task cards
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('mousedown', startDrag);
            card.addEventListener('touchstart', startDrag, { passive: false });
        });

        // Add drop target listeners to headers
        document.querySelectorAll('.status-header').forEach(header => {
            header.addEventListener('dragover', handleDragOver);
            header.addEventListener('dragenter', handleDragEnter);
            header.addEventListener('dragleave', handleDragLeave);
            header.addEventListener('drop', handleDrop);
        });
    }

    function startDrag(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        
        // Store initial positions
        const isTouch = e.type === 'touchstart';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        const rect = draggedItem.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        
        // Set up drag styles
        draggedItem.classList.add('dragging');
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';
        draggedItem.style.transform = 'none'; // Reset any transforms
        
        // Add movement listeners
        if (isTouch) {
            document.addEventListener('touchmove', handleDragMove, { passive: false });
            document.addEventListener('touchend', endDrag);
        } else {
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', endDrag);
        }
    }

    function handleDragMove(e) {
        if (!draggedItem) return;
        e.preventDefault();
        
        const isTouch = e.type === 'touchmove';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        // Update position
        draggedItem.style.left = `${clientX - offsetX}px`;
        draggedItem.style.top = `${clientY - offsetY}px`;
        
        // Highlight drop targets
        updateDropTargets(clientX, clientY);
    }

    function updateDropTargets(x, y) {
        // Clear previous target
        if (currentDropTarget) {
            currentDropTarget.classList.remove('drop-target');
            currentDropTarget = null;
        }
        
        // Find new target
        const element = document.elementFromPoint(x, y);
        const header = element?.closest('.status-header');
        
        if (header) {
            currentDropTarget = header;
            header.classList.add('drop-target');
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drop-target');
    }

    function handleDragLeave(e) {
        e.currentTarget.classList.remove('drop-target');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drop-target');
        
        if (draggedItem) {
            const container = e.currentTarget.closest('.status-column').querySelector('.status-container');
            container.appendChild(draggedItem);
        }
    }

    function endDrag(e) {
        if (!draggedItem) return;
        
        // Get drop position
        const isTouch = e.type === 'touchend';
        const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;
        const clientY = isTouch ? e.changedTouches[0].clientY : e.clientY;
        
        // Clear drop target
        if (currentDropTarget) {
            currentDropTarget.classList.remove('drop-target');
            currentDropTarget = null;
        }
        
        // Reset styles
        draggedItem.classList.remove('dragging');
        draggedItem.style.position = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.width = '';
        draggedItem.style.pointerEvents = '';
        draggedItem.style.transform = '';
        
        // Find drop container
        const element = document.elementFromPoint(clientX, clientY);
        const dropHeader = element?.closest('.status-header');
        const dropContainer = dropHeader 
            ? dropHeader.closest('.status-column').querySelector('.status-container')
            : element?.closest('.status-container');
        
        // Move to new container if valid
        if (dropContainer) {
            dropContainer.appendChild(draggedItem);
        }
        
        // Update layout
        updateLayout();
        
        // Clean up
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
        draggedItem = null;
    }

    function updateLayout() {
        columns.forEach(column => {
            const container = column.querySelector('.status-container');
            const taskCount = container.children.length;
            
            column.classList.toggle('empty', taskCount === 0);
            container.classList.toggle('compact', taskCount > 3);
        });
        
        // Consolidation logic remains the same...
    }

    function debounce(fn, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, arguments), delay);
        };
    }
});