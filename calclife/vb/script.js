document.addEventListener('DOMContentLoaded', () => {
    const areas = {
        todo: document.querySelector('.todo .grid-container'),
        now: document.querySelector('.now .grid-container'),
        progress: document.querySelector('.progress .grid-container'),
        done: document.querySelector('.done .grid-container')
    };

    // Initialize grid cells (8x3 per area)
    Object.values(areas).forEach(area => {
        for (let i = 0; i < 24; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.position = i;
            area.appendChild(cell);
        }
    });

    // Create sample tasks
    createTask('Design', areas.todo, 0);
    createTask('Code', areas.now, 1);
    createTask('Test', areas.progress, 2);
    createTask('Deploy', areas.done, 3);

    function createTask(content, area, position) {
        const cell = area.children[position];
        const task = document.createElement('div');
        task.className = 'task';
        task.textContent = content;
        task.draggable = true;
        cell.appendChild(task);
        
        task.addEventListener('mousedown', startDrag);
        task.addEventListener('touchstart', startDrag, { passive: false });
    }

    let draggedTask = null;
    let startX = 0;
    let startY = 0;

    function startDrag(e) {
        e.preventDefault();
        draggedTask = e.currentTarget;
        
        const rect = draggedTask.getBoundingClientRect();
        startX = (e.clientX || e.touches[0].clientX) - rect.left;
        startY = (e.clientY || e.touches[0].clientY) - rect.top;
        
        draggedTask.classList.add('dragging');
        draggedTask.style.position = 'fixed';
        draggedTask.style.width = `${rect.width}px`;
        draggedTask.style.left = `${rect.left}px`;
        draggedTask.style.top = `${rect.top}px`;
        draggedTask.style.zIndex = '1000';
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    function drag(e) {
        if (!draggedTask) return;
        e.preventDefault();
        
        const x = (e.clientX || e.touches[0].clientX) - startX;
        const y = (e.clientY || e.touches[0].clientY) - startY;
        
        draggedTask.style.left = `${x}px`;
        draggedTask.style.top = `${y}px`;
    }

    function endDrag(e) {
        if (!draggedTask) return;
        
        const x = (e.clientX || e.changedTouches[0].clientX);
        const y = (e.clientY || e.changedTouches[0].clientY);
        
        // Find drop target
        const element = document.elementFromPoint(x, y);
        const targetCell = element?.closest('.grid-cell');
        
        if (targetCell && targetCell !== draggedTask.parentElement) {
            // Move task to new cell
            targetCell.appendChild(draggedTask);
        }
        
        // Reset styles
        draggedTask.classList.remove('dragging');
        draggedTask.style.position = '';
        draggedTask.style.left = '';
        draggedTask.style.top = '';
        draggedTask.style.zIndex = '';
        draggedTask.style.width = '';
        
        // Clean up
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
        draggedTask = null;
    }
});