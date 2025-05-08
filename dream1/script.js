// Game variables
let scene, camera, renderer;
let player;
let boundaries = 5; // 5 units in each direction
let speed = 4 / 60; // 4 units per minute converted to units per frame (assuming 60fps)
let gameActive = true;
let clouds = [];
let birds = [];
let plane;
let beta = 0; // Device tilt left/right
let gamma = 0; // Device tilt forward/back

// Initialize the game
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0;
    camera.rotation.y = Math.PI; // Face forward
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.touchAction = 'none';
    document.body.appendChild(renderer.domElement);
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('deviceorientation', handleOrientation);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // For devices without device orientation (desktop testing)
    if (!window.DeviceOrientationEvent) {
        document.addEventListener('mousemove', handleMouseMove);
        document.getElementById('instructions').textContent = "Move your mouse to navigate the dream";
    }
    
    // Create player (just a camera in this case)
    player = camera;
    
    // Create dream environment
    createEnvironment();
    
    // Start game loop
    animate();
}

// Create dream environment
function createEnvironment() {
    // Add directional light (sun)
    const light = new THREE.DirectionalLight(0xfff5e6, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Create fluffy clouds
    const cloudGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const cloudMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    
    for (let i = 0; i < 20; i++) {
        const cloud = new THREE.Group();
        
        // Create cloud from multiple spheres
        for (let j = 0; j < 5; j++) {
            const part = new THREE.Mesh(cloudGeometry, cloudMaterial);
            part.position.set(
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5
            );
            part.scale.set(
                1 + Math.random(),
                1 + Math.random() * 0.5,
                1 + Math.random()
            );
            cloud.add(part);
        }
        
        // Position clouds randomly in front of the player
        cloud.position.set(
            Math.random() * boundaries * 2 - boundaries,
            Math.random() * boundaries - boundaries/2,
            -Math.random() * 100 - 20
        );
        
        scene.add(cloud);
        clouds.push(cloud);
    }
    
    // Create dream birds
    const birdGeometry = new THREE.ConeGeometry(0.1, 0.2, 3);
    const birdMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x333333,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < 10; i++) {
        const bird = new THREE.Mesh(birdGeometry, birdMaterial);
        
        // Position birds randomly
        bird.position.set(
            Math.random() * boundaries * 2 - boundaries,
            Math.random() * boundaries - boundaries/2,
            -Math.random() * 100 - 30
        );
        
        // Birds should face forward (toward the player)
        bird.rotation.y = Math.PI;
        
        scene.add(bird);
        birds.push({
            mesh: bird,
            speed: 0.02 + Math.random() * 0.03,
            wingFlapSpeed: 5 + Math.random() * 3,
            originalY: bird.position.y,
            originalX: bird.position.x
        });
    }
    
    // Create dream plane
    const planeBodyGeometry = new THREE.BoxGeometry(1, 0.2, 0.5);
    const planeWingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.3);
    const planeMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    
    plane = new THREE.Group();
    
    const body = new THREE.Mesh(planeBodyGeometry, planeMaterial);
    const wing = new THREE.Mesh(planeWingGeometry, planeMaterial);
    wing.position.y = -0.1;
    
    plane.add(body);
    plane.add(wing);
    
    // Position plane far ahead
    plane.position.set(
        boundaries * 0.7,
        boundaries * 0.5,
        -80
    );
    
    scene.add(plane);
}

// Game loop
function animate() {
    if (!gameActive) return;
    
    requestAnimationFrame(animate);
    
    // Move player forward through the dream
    player.position.z -= speed;
    
    // Update player position based on device tilt
    updatePlayerPosition();
    
    // Check boundaries (if player wakes up by leaving the dream)
    if (Math.abs(player.position.x) > boundaries || 
        Math.abs(player.position.y) > boundaries) {
        endGame("You left the dream...");
        return;
    }
    
    // Check collision with plane (if player sees something shocking)
    if (checkCollisionWithPlane()) {
        endGame("You saw something impossible...");
        return;
    }
    
    // Update dream elements
    updateClouds();
    updateBirds();
    updatePlane();
    
    renderer.render(scene, camera);
}

// Update player position based on device tilt
function updatePlayerPosition() {
    // Smooth movement with easing
    const targetX = THREE.MathUtils.clamp(gamma * 0.05, -boundaries, boundaries);
    const targetY = THREE.MathUtils.clamp(beta * -0.05, -boundaries, boundaries);
    
    player.position.x += (targetX - player.position.x) * 0.1;
    player.position.y += (targetY - player.position.y) * 0.1;
}

// Handle device orientation
function handleOrientation(event) {
    beta = event.beta;  // -180 to 180 (front/back tilt)
    gamma = event.gamma; // -90 to 90 (left/right tilt)
}

// Fallback for desktop testing
function handleMouseMove(event) {
    gamma = (event.clientX / window.innerWidth) * 180 - 90;
    beta = (event.clientY / window.innerHeight) * 180 - 90;
}

// Update cloud positions
function updateClouds() {
    clouds.forEach(cloud => {
        // Move clouds toward the player
        cloud.position.z += speed * 0.8; // Clouds move slower for depth effect
        
        // If cloud is behind the player, reposition it ahead
        if (cloud.position.z > 15) {
            cloud.position.set(
                Math.random() * boundaries * 2 - boundaries,
                Math.random() * boundaries - boundaries/2,
                -Math.random() * 100 - 50
            );
            
            // Randomize cloud scale for variety
            const scale = 0.5 + Math.random();
            cloud.children.forEach(part => {
                part.scale.set(scale, scale, scale);
            });
        }
    });
}

// Update bird positions and animations
function updateBirds() {
    const time = Date.now() * 0.001; // Get time in seconds
    
    birds.forEach(bird => {
        const birdObj = bird.mesh;
        
        // Move birds toward the player
        birdObj.position.z += speed + bird.speed;
        
        // Make birds flap wings (rotate on x-axis)
        birdObj.rotation.x = Math.sin(time * bird.wingFlapSpeed) * 0.5;
        
        // Make birds move in gentle arcs
        birdObj.position.y = bird.originalY + Math.sin(time * 2 + bird.originalX) * 0.3;
        birdObj.position.x = bird.originalX + Math.cos(time * 1.5 + bird.originalY) * 0.3;
        
        // If bird is behind the player, reposition it ahead
        if (birdObj.position.z > 15) {
            birdObj.position.set(
                Math.random() * boundaries * 2 - boundaries,
                Math.random() * boundaries - boundaries/2,
                -Math.random() * 100 - 40
            );
            bird.originalY = birdObj.position.y;
            bird.originalX = birdObj.position.x;
        }
    });
}

// Update plane position
function updatePlane() {
    // Move plane toward the player
    plane.position.z += speed * 1.5; // Plane moves faster
    
    // Make plane move in gentle arcs
    plane.position.y += Math.sin(Date.now() * 0.0005) * 0.02;
    plane.position.x += Math.cos(Date.now() * 0.0007) * 0.01;
    
    // If plane is behind the player, reposition it ahead
    if (plane.position.z > 15) {
        plane.position.set(
            (Math.random() > 0.5 ? 1 : -1) * boundaries * 0.7,
            Math.random() * boundaries * 0.5,
            -80 - Math.random() * 40
        );
    }
}

// Check collision with plane
function checkCollisionWithPlane() {
    const distance = player.position.distanceTo(plane.position);
    return distance < 1.5; // Collision radius
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// End game function
function endGame(message) {
    gameActive = false;
    document.getElementById('game-over').innerHTML = `${message}<br><button id="restart-btn">Dream Again</button>`;
    document.getElementById('game-over').style.display = 'block';
    // Re-add event listener for the new button
    document.getElementById('restart-btn').addEventListener('click', restartGame);
}

// Restart game function
function restartGame() {
    // Reset player position
    player.position.set(0, 0, 0);
    beta = 0;
    gamma = 0;
    
    // Reset all objects
    resetObjects();
    
    // Hide game over screen
    document.getElementById('game-over').style.display = 'none';
    
    // Show brief instructions again
    document.getElementById('instructions').style.animation = 'none';
    void document.getElementById('instructions').offsetWidth; // Trigger reflow
    document.getElementById('instructions').style.animation = 'fadeOut 5s forwards';
    
    // Reactivate game
    gameActive = true;
    
    // Restart animation loop
    animate();
}

// Reset all game objects
function resetObjects() {
    // Reset clouds
    clouds.forEach(cloud => {
        cloud.position.set(
            Math.random() * boundaries * 2 - boundaries,
            Math.random() * boundaries - boundaries/2,
            -Math.random() * 100 - 50
        );
    });
    
    // Reset birds
    birds.forEach(bird => {
        bird.mesh.position.set(
            Math.random() * boundaries * 2 - boundaries,
            Math.random() * boundaries - boundaries/2,
            -Math.random() * 100 - 40
        );
        bird.originalY = bird.mesh.position.y;
        bird.originalX = bird.mesh.position.x;
    });
    
    // Reset plane
    plane.position.set(
        (Math.random() > 0.5 ? 1 : -1) * boundaries * 0.7,
        Math.random() * boundaries * 0.5,
        -80 - Math.random() * 40
    );
}

// Start the dream
init();