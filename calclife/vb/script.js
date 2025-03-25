document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    let draggedItem = null;
    let isTap = false;
    let tapTimer = null;
    const tapDelay = 200; // ms to consider as tap vs drag

    initDragAndDrop();
    updateLayout();
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

        document.querySelectorAll('.status-header').forEach(header => {
            header.addEventListener('dragover', handleDragOver);
            header.addEventListener('dragenter', handleDragEnter);
            header.addEventListener('dragleave', handleDragLeave);
            header.addEventListener('drop', handleHeaderDrop);
        });

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
        document.querySelectorAll('.status-header').forEach(header => {
            header.classList.remove('drop-target');
        });
        dropIndicator.style.display = 'none';

        // Find the best drop target
        const elements = document.elementsFromPoint(x, y);
        let bestTarget = null;
        
        for (const element of elements) {
            if (element.classList.contains('status-header')) {
                bestTarget = element;
                break;
            }
            if (element.classList.contains('status-container')) {
                const header = element.closest('.status-column')?.querySelector('.status-header');
                if (header) {
                    bestTarget = header;
                    break;
                }
            }
        }

        if (bestTarget) {
            bestTarget.classList.add('drop-target');
            
            // Position drop indicator
            const rect = bestTarget.getBoundingClientRect();
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
            if (element.classList.contains('status-header')) {
                dropContainer = element.closest('.status-column')?.querySelector('.status-container');
                break;
            }
            if (element.classList.contains('status-container')) {
                dropContainer = element;
                break;
            }
        }

        // Clean up
        document.querySelectorAll('.status-header').forEach(header => {
            header.classList.remove('drop-target');
        });
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

    // ... (rest of the functions remain the same) ...
});
    function initDragAndDrop() {
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('mousedown', handlePointerStart);
            card.addEventListener('touchstart', handlePointerStart, { passive: false });
        });

        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('touchmove', handlePointerMove, { passive: false });
        document.addEventListener('mouseup', handlePointerEnd);
        document.addEventListener('touchend', handlePointerEnd);

        document.querySelectorAll('.status-header').forEach(header => {
            header.addEventListener('dragover', handleDragOver);
            header.addEventListener('dragenter', handleDragEnter);
            header.addEventListener('dragleave', handleDragLeave);
            header.addEventListener('drop', handleHeaderDrop);
        });
    }

    function handlePointerStart(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        isTap = true;
        
        // Start timer to distinguish between tap and drag
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
        
        // If we moved enough, it's a drag not a tap
        if (isTap && (Math.abs(e.movementX) > 5 || Math.abs(e.movementY) > 5) {
            isTap = false;
            clearTimeout(tapTimer);
            draggedItem.classList.add('expanded');
        }
        
        const isTouch = e.type === 'touchmove';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        draggedItem.style.left = `${clientX - draggedItem._offsetX}px`;
        draggedItem.style.top = `${clientY - draggedItem._offsetY}px`;
        
        highlightDropTarget(clientX, clientY);
    }

    function handlePointerEnd(e) {
        if (!draggedItem) return;
        
        clearTimeout(tapTimer);
        
        if (isTap) {
            // It was a tap - toggle description
            draggedItem.classList.toggle('expanded');
        }
        
        const isTouch = e.type === 'touchend';
        const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;
        const clientY = isTouch ? e.changedTouches[0].clientY : e.clientY;
        
        document.querySelectorAll('.status-header').forEach(header => {
            header.classList.remove('drop-target');
        });
        
        draggedItem.classList.remove('dragging');
        draggedItem.style.position = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.width = '';
        draggedItem.style.pointerEvents = '';
        
        const element = document.elementFromPoint(clientX, clientY);
        const dropHeader = element?.closest('.status-header');
        const dropContainer = dropHeader 
            ? dropHeader.closest('.status-column').querySelector('.status-container')
            : element?.closest('.status-container');
        
        if (dropContainer) {
            dropContainer.appendChild(draggedItem);
            updateLayout();
        }
        
        draggedItem = null;
        isTap = false;
    }

    function highlightDropTarget(x, y) {
        document.querySelectorAll('.status-header').forEach(header => {
            header.classList.remove('drop-target');
        });
        
        const element = document.elementFromPoint(x, y);
        const header = element?.closest('.status-header');
        if (header) {
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

    function handleHeaderDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drop-target');
        
        if (draggedItem) {
            const container = e.currentTarget.closest('.status-column').querySelector('.status-container');
            container.appendChild(draggedItem);
            updateLayout();
        }
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