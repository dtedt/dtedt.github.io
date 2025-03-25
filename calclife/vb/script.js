document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.status-container');
    const dragHandles = document.querySelectorAll('.drag-handle');

    let draggedCard = null;
    let startX, startY;
    let touchStartTime;

    // Add touch event listeners to drag handles
    dragHandles.forEach(handle => {
        const card = handle.parentElement;
        
        // For touch devices
        handle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartTime = Date.now();
            draggedCard = card;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            card.classList.add('dragging');
        });

        // For mouse devices
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            draggedCard = card;
            startX = e.clientX;
            startY = e.clientY;
            card.classList.add('dragging');
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

    // Touch move handler
    document.addEventListener('touchmove', (e) => {
        if (!draggedCard) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        
        // Only start dragging after a small delay to distinguish from tap
        if (Date.now() - touchStartTime > 100) {
            updateCardPosition(x, y);
        }
    }, { passive: false });

    // Touch end handler
    document.addEventListener('touchend', (e) => {
        if (!draggedCard) return;
        
        const touch = e.changedTouches[0];
        handleDrop(touch.clientX, touch.clientY);
        cleanup();
    });

    // Mouse move handler
    function onMouseMove(e) {
        if (!draggedCard) return;
        updateCardPosition(e.clientX, e.clientY);
    }

    // Mouse up handler
    function onMouseUp(e) {
        if (!draggedCard) return;
        handleDrop(e.clientX, e.clientY);
        cleanup();
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Update card position during drag
    function updateCardPosition(x, y) {
        const dx = x - startX;
        const dy = y - startY;
        
        draggedCard.style.transform = `translate(${dx}px, ${dy}px) rotate(2deg)`;
        draggedCard.style.zIndex = '1000';
    }

    // Handle drop logic
    function handleDrop(x, y) {
        draggedCard.style.transform = '';
        draggedCard.style.zIndex = '';
        
        const dropTarget = document.elementFromPoint(x, y);
        const container = findContainer(dropTarget);
        
        if (container) {
            const afterElement = getDragAfterElement(container, y);
            if (afterElement) {
                container.insertBefore(draggedCard, afterElement);
            } else {
                container.appendChild(draggedCard);
            }
        }
    }

    // Clean up after drag
    function cleanup() {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            draggedCard.style.transform = '';
            draggedCard.style.zIndex = '';
            draggedCard = null;
        }
    }

    // Helper functions
    function findContainer(element) {
        while (element && !element.classList.contains('status-container')) {
            element = element.parentElement;
        }
        return element;
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
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