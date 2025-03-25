document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.kanban-board');
    const columns = document.querySelectorAll('.status-column');
    
    // Initialize drag functionality
    initDragAndDrop();
    
    // Set up initial layout
    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    function initDragAndDrop() {
        let draggedItem = null;
        
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('mousedown', startDrag);
            card.addEventListener('touchstart', startDrag, { passive: false });
        });
        
        function startDrag(e) {
            e.preventDefault();
            draggedItem = e.currentTarget;
            
            // Set up drag styles
            draggedItem.style.position = 'fixed';
            draggedItem.style.zIndex = '1000';
            draggedItem.style.width = `${draggedItem.offsetWidth}px`;
            draggedItem.style.pointerEvents = 'none';
            draggedItem.style.transform = 'scale(1.05)';
            
            // Set initial position
            const rect = draggedItem.getBoundingClientRect();
            draggedItem.startX = e.clientX || e.touches[0].clientX;
            draggedItem.startY = e.clientY || e.touches[0].clientY;
            draggedItem.offsetX = draggedItem.startX - rect.left;
            draggedItem.offsetY = draggedItem.startY - rect.top;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }
        
        function drag(e) {
            if (!draggedItem) return;
            e.preventDefault();
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            draggedItem.style.left = `${clientX - draggedItem.offsetX}px`;
            draggedItem.style.top = `${clientY - draggedItem.offsetY}px`;
        }
        
        function endDrag(e) {
            if (!draggedItem) return;
            
            const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
            const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
            
            // Find drop target
            const dropTarget = document.elementFromPoint(clientX, clientY);
            const dropContainer = findDropContainer(dropTarget);
            
            // Reset styles
            draggedItem.style.position = '';
            draggedItem.style.left = '';
            draggedItem.style.top = '';
            draggedItem.style.zIndex = '';
            draggedItem.style.width = '';
            draggedItem.style.pointerEvents = '';
            draggedItem.style.transform = '';
            
            // Move to new container if valid
            if (dropContainer) {
                dropContainer.appendChild(draggedItem);
            }
            
            // Update layout
            updateLayout();
            
            // Clean up
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
            draggedItem = null;
        }
        
        function findDropContainer(element) {
            while (element && !element.classList.contains('status-container')) {
                element = element.parentElement;
            }
            return element;
        }
    }
    
    function updateLayout() {
        // Update each column's state
        columns.forEach(column => {
            const container = column.querySelector('.status-container');
            const taskCount = container.children.length;
            
            // Update empty state
            column.classList.toggle('empty', taskCount === 0);
            
            // Update compact state
            container.classList.toggle('compact', taskCount > 3);
        });
        
        // Check if we need to consolidate columns
        const visibleColumns = Array.from(columns).filter(col => !col.classList.contains('empty'));
        
        if (visibleColumns.length > 3 && window.innerHeight < 600) {
            // Find two emptiest columns (excluding already empty ones)
            const sortedColumns = Array.from(columns)
                .filter(col => !col.classList.contains('empty'))
                .sort((a, b) => {
                    return a.querySelector('.status-container').children.length - 
                           b.querySelector('.status-container').children.length;
                });
            
            if (sortedColumns.length >= 2) {
                // Create a consolidated row
                const consolidatedRow = document.createElement('div');
                consolidatedRow.className = 'consolidated-row';
                consolidatedRow.style.gridColumn = '1 / -1';
                consolidatedRow.style.display = 'grid';
                consolidatedRow.style.gridTemplateColumns = '1fr 1fr';
                consolidatedRow.style.gap = '10px';
                
                // Move the two emptiest columns into the consolidated row
                sortedColumns[0].style.gridColumn = '';
                sortedColumns[1].style.gridColumn = '';
                consolidatedRow.appendChild(sortedColumns[0]);
                consolidatedRow.appendChild(sortedColumns[1]);
                board.appendChild(consolidatedRow);
            }
        } else {
            // Remove any existing consolidation
            document.querySelectorAll('.consolidated-row').forEach(row => {
                while (row.firstChild) {
                    board.appendChild(row.firstChild);
                }
                row.remove();
            });
            
            // Reset all columns to normal flow
            columns.forEach(col => {
                col.style.gridColumn = '';
            });
        }
    }
});