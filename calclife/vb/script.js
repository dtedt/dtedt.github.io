document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    let draggedItem = null;
    let isTap = false;
    let tapTimer = null;
    const tapDelay = 200;
    let dropIndicator = null;

    // Create drop indicator element
    function createDropIndicator() {
        dropIndicator = document.createElement('div');
        dropIndicator.className = 'drop-indicator';
        document.body.appendChild(dropIndicator);
        return dropIndicator;
    }

    initDragAndDrop();
    updateLayout();

    function initDragAndDrop() {
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('mousedown', handlePointerStart);
            card.addEventListener('touchstart', handlePointerStart, { passive: false });
        });

        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('touchmove', handlePointerMove, { passive: false });
        document.addEventListener('mouseup', handlePointerEnd);
        document.addEventListener('touchend', handlePointerEnd);

        // Initialize drop indicator
        createDropIndicator();
    }

    function handlePointerStart(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        isTap = true;
        
        tapTimer = setTimeout(() => {
            if (isTap) {
                draggedItem.classList.add('expanded');
            }
        }, tapDelay);

        const isTouch = e.type === 'touchstart';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        const rect = draggedItem.getBoundingClientRect();
        draggedItem._offsetX = clientX - rect.left;
        draggedItem._offsetY = clientY - rect.top;
        
        draggedItem.classList.add('dragging');
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';
    }

    function handlePointerMove(e) {
        if (!draggedItem) return;
        e.preventDefault();
        
        if (isTap && (Math.abs(e.movementX) > 5 || Math.abs(e.movementY) > 5)) {
            isTap = false;
            clearTimeout(tapTimer);
            draggedItem.classList.add('expanded');
        }
        
        const isTouch = e.type === 'touchmove';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        draggedItem.style.left = `${clientX - draggedItem._offsetX}px`;
        draggedItem.style.top = `${clientY - draggedItem._offsetY}px`;
        
        updateDropTarget(clientX, clientY);
    }

    function updateDropTarget(x, y) {
        // Hide all drop targets first
        dropIndicator.style.display = 'none';

        // Find all elements at pointer position
        const elements = document.elementsFromPoint(x, y);
        let dropColumn = null;

        // Find the nearest status column
        for (const element of elements) {
            if (element.classList.contains('status-column')) {
                dropColumn = element;
                break;
            }
            const column = element.closest('.status-column');
            if (column) {
                dropColumn = column;
                break;
            }
        }

        if (dropColumn) {
            // Position drop indicator on the column
            const rect = dropColumn.getBoundingClientRect();
            dropIndicator.style.display = 'block';
            dropIndicator.style.left = `${rect.left}px`;
            dropIndicator.style.top = `${rect.top}px`;
            dropIndicator.style.width = `${rect.width}px`;
            dropIndicator.style.height = `${rect.height}px`;
        }
    }

    function handlePointerEnd(e) {
        if (!draggedItem) return;
        
        clearTimeout(tapTimer);
        
        if (isTap) {
            draggedItem.classList.toggle('expanded');
        }
        
        const isTouch = e.type === 'touchend';
        const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;
        const clientY = isTouch ? e.changedTouches[0].clientY : e.clientY;
        
        // Find drop target
        const elements = document.elementsFromPoint(clientX, clientY);
        let dropContainer = null;
        
        for (const element of elements) {
            if (element.classList.contains('status-column')) {
                dropContainer = element.querySelector('.status-container');
                break;
            }
            const column = element.closest('.status-column');
            if (column) {
                dropContainer = column.querySelector('.status-container');
                break;
            }
        }

        // Clean up
        dropIndicator.style.display = 'none';
        
        draggedItem.classList.remove('dragging');
        draggedItem.style.position = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.width = '';
        draggedItem.style.pointerEvents = '';
        
        if (dropContainer) {
            dropContainer.appendChild(draggedItem);
            updateLayout();
        }
        
        draggedItem = null;
        isTap = false;
    }

    function updateLayout() {
        document.querySelectorAll('.status-column').forEach(column => {
            const container = column.querySelector('.status-container');
            const taskCount = container.children.length;
            
            column.classList.toggle('empty', taskCount === 0);
            container.classList.toggle('compact', taskCount > 3);
        });
    }

    // Close expanded cards when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.task-card.expanded')) {
            document.querySelectorAll('.task-card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
});