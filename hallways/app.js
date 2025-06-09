// Main App Module
const GridNavigator = (function() {
    // Configuration
    const config = {
        gridSize: 10,
        cellSize: 2,
        playerHeight: 1.6,
        turnSpeed: Math.PI / 2, // 90 degrees in radians
    };

    // State
    let state = {
        position: { x: 0, z: 0 },
        rotation: 0, // in radians (0 = facing positive Z)
        scene: null,
        camera: null,
        renderer: null,
        grid: []
    };

    // Initialize the application
    function init() {
        createScene();
        createGrid();
        setupControls();
        animate();
        window.addEventListener('resize', onWindowResize);
    }

    // Create Three.js scene
    function createScene() {
        // Scene
        state.scene = new THREE.Scene();
        
        // Camera
        state.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        updateCameraPosition();
        
        // Renderer
        state.renderer = new THREE.WebGLRenderer({ antialias: true });
        state.renderer.setSize(window.innerWidth, window.innerHeight);
        state.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('container').appendChild(state.renderer.domElement);
    }

    // Create the grid floor with wall indicators
    function createGrid() {
        const gridHelper = new THREE.Group();
        
        // Create grid lines
        const gridSize = config.gridSize * config.cellSize;
        const halfGridSize = gridSize / 2;
        
        // Center the grid around (0,0)
        const offset = -((config.gridSize - 1) * config.cellSize) / 2;
        
        // Create floor
        const floorGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
        const floorMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.01; // Slightly below grid lines to avoid z-fighting
        state.scene.add(floor);
        
        // Create grid lines
        for (let i = 0; i <= config.gridSize; i++) {
            // Horizontal lines (along Z axis)
            const zLine = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(offset, 0, offset + i * config.cellSize),
                    new THREE.Vector3(offset + (config.gridSize) * config.cellSize, 0, offset + i * config.cellSize)
                ]),
                new THREE.LineBasicMaterial({ color: 0x555555 })
            );
            gridHelper.add(zLine);
            
            // Vertical lines (along X axis)
            const xLine = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(offset + i * config.cellSize, 0, offset),
                    new THREE.Vector3(offset + i * config.cellSize, 0, offset + (config.gridSize) * config.cellSize)
                ]),
                new THREE.LineBasicMaterial({ color: 0x555555 })
            );
            gridHelper.add(xLine);
        }
        
        // Add wall indicators (red lines at grid boundaries)
        const wallMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        
        // Perimeter walls
        const perimeterPoints = [
            new THREE.Vector3(offset, 0, offset),
            new THREE.Vector3(offset + config.gridSize * config.cellSize, 0, offset),
            new THREE.Vector3(offset + config.gridSize * config.cellSize, 0, offset + config.gridSize * config.cellSize),
            new THREE.Vector3(offset, 0, offset + config.gridSize * config.cellSize),
            new THREE.Vector3(offset, 0, offset)
        ];
        const perimeterWall = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(perimeterPoints),
            wallMaterial
        );
        perimeterWall.position.y = 0.02; // Slightly above floor to avoid z-fighting
        gridHelper.add(perimeterWall);
        
        state.scene.add(gridHelper);
    }

    // Update camera position based on player state
    function updateCameraPosition() {
        const offset = -((config.gridSize - 1) * config.cellSize) / 2;
        const x = offset + state.position.x * config.cellSize;
        const z = offset + state.position.z * config.cellSize;
        
        state.camera.position.set(x, config.playerHeight, z);
        state.camera.rotation.y = state.rotation;
    }

    // Movement and rotation functions
    function moveForward() {
        const newX = state.position.x + Math.sin(state.rotation);
        const newZ = state.position.z + Math.cos(state.rotation);
        
        // Check boundaries
        if (newX >= 0 && newX < config.gridSize && newZ >= 0 && newZ < config.gridSize) {
            state.position.x = newX;
            state.position.z = newZ;
            updateCameraPosition();
        }
    }

    function rotateLeft() {
        state.rotation += config.turnSpeed;
        updateCameraPosition();
    }

    function rotateRight() {
        state.rotation -= config.turnSpeed;
        updateCameraPosition();
    }

    function turnAround() {
        state.rotation += Math.PI; // 180 degrees
        updateCameraPosition();
    }

    // Setup UI controls
    function setupControls() {
        document.getElementById('forward').addEventListener('click', moveForward);
        document.getElementById('left').addEventListener('click', rotateLeft);
        document.getElementById('right').addEventListener('click', rotateRight);
        document.getElementById('turnAround').addEventListener('click', turnAround);
    }

    // Handle window resize
    function onWindowResize() {
        state.camera.aspect = window.innerWidth / window.innerHeight;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        state.renderer.render(state.scene, state.camera);
    }

    // Public API
    return {
        init: init
    };
})();

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', GridNavigator.init);