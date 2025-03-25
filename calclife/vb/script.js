document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.status-container');
    const dragHandles = document.querySelectorAll('.drag-handle');

    let draggedItem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialX = 0;
    let initialY = 0;
    let originalContainer = null;
    let originalIndex = 0;

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

        draggedItem.classList.add('dragging');
        draggedItem.style.height = 'auto';
        draggedItem.style.minHeight = '80px';
        draggedItem.querySelector('.task-description').style.display = 'block';
        draggedItem.style.position = 'fixed';
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.left = `${rect.left}px`;
        draggedItem.style.top = `${rect.top}px`;
        draggedItem.style.zIndex = '1000';
        draggedItem.style.pointerEvents = 'none';

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

        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        draggedItem.style.left = `${initialX + deltaX}px`;
        draggedItem.style.top = `${initialY + deltaY}px`;
    }

    function handleDragEnd(e) {
        if (!draggedItem) return;
        e.preventDefault();

        let clientX, clientY;
        if (e.type === 'touchend') {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        draggedItem.style.position = '';
        draggedItem.style.width = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.pointerEvents = '';
        draggedItem.style.height = '';
        draggedItem.style.minHeight = '';
        draggedItem.querySelector('.task-description').style.display = 'none';
        draggedItem.classList.remove('dragging');

        const dropTarget = document.elementFromPoint(clientX, clientY);
        const dropContainer = findDropContainer(dropTarget);

        if (dropContainer) {
            const afterElement = getDragAfterElement(dropContainer, clientY);
            if (afterElement) {
                dropContainer.insertBefore(draggedItem, afterElement);
            } else {
                dropContainer.appendChild(draggedItem);
            }
        } else {
            originalContainer.insertBefore(draggedItem, originalContainer.children[originalIndex]);
        }

        setTimeout(() => {
            document.querySelectorAll('.status-column').forEach(col => {
                col.style.flex = col.querySelector('.status-container:not(:empty)') ? '2 1 auto' : '0 1 auto';
            });
        }, 10);

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