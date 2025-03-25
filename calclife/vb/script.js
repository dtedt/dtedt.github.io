document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    let draggedItem = null;
    let isTap = false;
    let tapTimer = null;
    const tapDelay = 200;
    let dropIndicator = null;
    let initialX = 0, initialY = 0;

    // Initialize the board
    function init() {
        createDropIndicator();
        setupEventListeners();
        updateLayout();
    }

    // Create visual drop indicator
    function createDropIndicator() {
        dropIndicator = document.createElement('div');
        dropIndicator.className = 'drop-indicator';
        document.body.appendChild(dropIndicator);
        dropIndicator.style.display = 'none';
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Task card interactions
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('mousedown', startDrag);
            card.addEventListener('touchstart', startDrag, { passive: false });
        });

        // Document-wide drag events
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        // Click outside to collapse cards
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.task-card.expanded')) {
                document.querySelectorAll('.task-card.expanded').forEach(card => {
                    card.classList.remove('expanded');
                });
            }
        });
    }

    // Start drag operation
    function startDrag(e) {
        e.preventDefault();
        draggedItem = e.currentTarget;
        isTap = true;
        
        // Set tap timer
        tapTimer = setTimeout(() => {
            if (isTap) {
                draggedItem.classList.add('expanded');
            }
        }, tapDelay);

        // Get initial position
        const isTouch = e.type === 'touchstart';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        initialX = clientX;
        initialY = clientY;
        
        // Set up dragging styles
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

    // Handle drag movement
    function dragMove(e) {
        if (!draggedItem) return;
        e.preventDefault();
        
        // Check if this is a drag (not tap)
        const isTouch = e.type === 'touchmove';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
        
        if (isTap && (Math.abs(clientX - initialX) > 5 || Math.abs(clientY - initialY) > 5)) {
            isTap = false;
            clearTimeout(tapTimer);
            draggedItem.classList.add('expanded');
        }
        
        // Update position
        draggedItem.style.left = `${clientX - draggedItem._offsetX}px`;
        draggedItem.style.top = `${clientY - draggedItem._offsetY}px`;
        
        // Update drop target
        updateDropTarget(clientX, clientY);
    }

    // Update visual drop target
    function updateDropTarget(x, y) {
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
        
        // Show drop indicator if valid target found
        if (dropColumn && dropColumn !== draggedItem.closest('.status-column')) {
            const rect = dropColumn.getBoundingClientRect();
            dropIndicator.style.display = 'block';
            dropIndicator.style.left = `${rect.left}px`;
            dropIndicator.style.top = `${rect.top}px`;
            dropIndicator.style.width = `${rect.width}px`;
            dropIndicator.style.height = `${rect.height}px`;
            dropColumn._isDropTarget = true;
        }
    }

    // End drag operation
    function endDrag(e) {
        if (!draggedItem) return;
        
        clearTimeout(tapTimer);
        
        // Handle tap (toggle description)
        if (isTap) {
            draggedItem.classList.toggle('expanded');
        } 
        // Handle drop
        else {
            const isTouch = e.type === 'touchend';
            const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;
            const clientY = isTouch ? e.changedTouches[0].clientY : e.clientY;
            
            // Find drop target
            const elements = document.elementsFromPoint(clientX, clientY);
            let dropColumn = null;
            
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
            
            // Move to new column if valid
            if (dropColumn) {
                const container = dropColumn.querySelector('.status-container');
                container.appendChild(draggedItem);
                updateLayout();
            }
        }
        
        // Clean up
        dropIndicator.style.display = 'none';
        resetDraggedItem();
        draggedItem = null;
        isTap = false;
    }

    // Reset dragged item styles
    function resetDraggedItem() {
        if (!draggedItem) return;
        
        draggedItem.classList.remove('dragging');
        draggedItem.style.position = '';
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';
        draggedItem.style.width = '';
        draggedItem.style.pointerEvents = '';
    }

    // Update column layouts
    function updateLayout() {
        document.querySelectorAll('.status-column').forEach(column => {
            const container = column.querySelector('.status-container');
            const taskCount = container.children.length;
            
            column.classList.toggle('empty', taskCount === 0);
            container.classList.toggle('compact', taskCount > 3);
        });
    }

    // Initialize the board
    init();
});