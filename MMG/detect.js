    const mainPath = document.getElementById('mainDrag');
    const childPaths = document.querySelectorAll('.path');
    const childNodes = document.querySelectorAll('.node');
    const player = document.getElementById('player');
    const pathLength = mainPath.getTotalLength();

    player.addEventListener("click", openMap)

    function openMap() {
       player.classList.add('animated'); 
       mainPath.classList.add('animated');

               console.log(childNodes);
        for (node of childNodes) {
        node.classList.add('animated');
        console.log(childNodes);
       };
       for (path of childPaths) {
        path.classList.add('animated');

       };

    }