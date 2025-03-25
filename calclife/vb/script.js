// Update the updateCardPosition function in script.js

function updateCardPosition(x, y) {
    const dx = x - startX;
    const dy = y - startY;
    
    // Apply the transform with translateZ(0) for hardware acceleration
    draggedCard.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(2deg) scale(1.02)`;
    
    // Temporarily move the card to the body to ensure it's above everything
    if (!draggedCard.isMovedToBody) {
        const rect = draggedCard.getBoundingClientRect();
        document.body.appendChild(draggedCard);
        draggedCard.style.position = 'fixed';
        draggedCard.style.width = `${rect.width}px`;
        draggedCard.style.height = `${rect.height}px`;
        draggedCard.style.left = `${rect.left}px`;
        draggedCard.style.top = `${rect.top}px`;
        draggedCard.style.margin = '0';
        draggedCard.isMovedToBody = true;
    }
    
    // Update position
    draggedCard.style.left = `${startX + dx - rect.left}px`;
    draggedCard.style.top = `${startY + dy - rect.top}px`;
}

function handleDrop(x, y) {
    // Reset styles first
    draggedCard.style.transform = '';
    draggedCard.style.zIndex = '';
    draggedCard.style.willChange = '';
    draggedCard.style.position = '';
    draggedCard.style.width = '';
    draggedCard.style.height = '';
    draggedCard.style.left = '';
    draggedCard.style.top = '';
    draggedCard.style.margin = '';
    
    const dropTarget = document.elementFromPoint(x, y);
    const container = findContainer(dropTarget);
    
    if (container) {
        // Move card back to its container
        const afterElement = getDragAfterElement(container, y);
        if (draggedCard.isMovedToBody) {
            if (afterElement) {
                container.insertBefore(draggedCard, afterElement);
            } else {
                container.appendChild(draggedCard);
            }
            draggedCard.isMovedToBody = false;
        }
    }
    
    // Force reflow before adding transition back
    void draggedCard.offsetHeight;
    draggedCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
}

function cleanup() {
    if (draggedCard) {
        // Ensure all styles are reset
        draggedCard.style.transform = '';
        draggedCard.style.zIndex = '';
        draggedCard.style.willChange = '';
        draggedCard.style.position = '';
        draggedCard.style.width = '';
        draggedCard.style.height = '';
        draggedCard.style.left = '';
        draggedCard.style.top = '';
        draggedCard.style.margin = '';
        draggedCard.style.transition = '';
        
        draggedCard.classList.remove('dragging');
        draggedCard.isMovedToBody = false;
        draggedCard = null;
    }
}