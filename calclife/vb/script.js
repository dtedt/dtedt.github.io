// Update these functions in your script.js

function updateCardPosition(x, y) {
    const dx = x - startX;
    const dy = y - startY;
    
    // Use translate3d for hardware acceleration
    draggedCard.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(2deg) scale(1.02)`;
    draggedCard.style.zIndex = '1000';
    draggedCard.style.willChange = 'transform'; // Optimize for performance
}

function handleDrop(x, y) {
    // Reset styles
    draggedCard.style.transform = '';
    draggedCard.style.zIndex = '';
    draggedCard.style.willChange = '';
    
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

function cleanup() {
    if (draggedCard) {
        // Add transition back for smooth reset
        draggedCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        draggedCard.classList.remove('dragging');
        draggedCard.style.transform = '';
        draggedCard.style.zIndex = '';
        draggedCard.style.willChange = '';
        
        // Remove transition after reset completes
        setTimeout(() => {
            draggedCard.style.transition = '';
        }, 200);
        
        draggedCard = null;
    }
}