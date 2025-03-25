document.addEventListener('DOMContentLoaded', () => {
    // Update empty state of columns
    function updateEmptyStates() {
        const columns = document.querySelectorAll('.column');
        
        columns.forEach(column => {
            const tasksContainer = column.querySelector('.tasks');
            const hasTasks = tasksContainer.children.length > 0;
            
            if (hasTasks) {
                column.classList.remove('empty');
            } else {
                column.classList.add('empty');
            }
        });
    }
    
    // Initialize
    updateEmptyStates();
    
    // Make columns responsive to window resize
    window.addEventListener('resize', () => {
        updateEmptyStates();
    });
});