// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    let draggedItem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let offsetX = 0;
    let offsetY = 0;
// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ... (keep previous variable declarations and init code) ...

    function startDrag(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        draggedItem.classList.add('expanded', 'dragging'); // Add expanded class
        
        // ... (rest of startDrag implementation) ...
    }

    function endDrag(e) {
        if (!draggedItem) return;
        
        // ... (existing endDrag code) ...
        
        draggedItem.classList.remove('dragging', 'expanded'); // Remove expanded class
        
        // ... (rest of endDrag implementation) ...
    }

    // ... (rest of your JavaScript) ...
});
    // Initialize drag and drop
    initDragAndDrop();
    updateLayout();

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
            header.addEventListener('drop', handleHeaderDrop);
        });
    }

    function startDrag(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        draggedItem.classList.add('expanded'); // Show description when dragging
        
        const isTouch = e.type === 'touchstart';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        const rect = draggedItem.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        
        draggedItem.classList.add('dragging');
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';
        
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
        
        draggedItem.style.left = `${clientX - offsetX}px`;
        draggedItem.style.top = `${clientY - offsetY}px`;
        
        highlightDropTarget(clientX, clientY);
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

    function endDrag(e) {
        if (!draggedItem) return;
        
        const isTouch = e.type === 'touchend';
        const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;
        const clientY = isTouch ? e.changedTouches[0].clientY : e.clientY;
        
        document.querySelectorAll('.status-header').forEach(header => {
            header.classList.remove('drop-target');
        });
        
        draggedItem.classList.remove('dragging', 'expanded'); // Remove expanded class when done
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
        
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
        draggedItem = null;
    }

    function updateLayout() {
        document.querySelectorAll('.status-column').forEach(column => {
            const container = column.querySelector('.status-container');
            const taskCount = container.children.length;
            
            column.classList.toggle('empty', taskCount === 0);
            container.classList.toggle('compact', taskCount > 3);
        });
    }
});