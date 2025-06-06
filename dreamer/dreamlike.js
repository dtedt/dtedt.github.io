// Main Dreamlike Experience Class
class DreamlikeExperience {
    constructor(config) {
        // Configuration with defaults
        this.config = {
            sceneId: 'scene',
            instructionsId: 'instructions',
            fadeInstructionsAfter: 5000, // ms
            movementSensitivity: 0.2,
            autoRotateSpeed: 0.01,
            ...config
        };

        // State
        this.isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        this.rotation = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.pointerDown = false;
        this.lastPointerPosition = { x: 0, y: 0 };
        this.autoRotate = true;
        this.animationFrameId = null;

        // DOM elements
        this.scene = document.getElementById(this.config.sceneId);
        this.instructions = document.getElementById(this.config.instructionsId);

        // Initialize
        this.initScene();
        this.initEventListeners();
        this.startAnimation();

        // Fade instructions after delay
        setTimeout(() => {
            this.instructions.classList.add('fade');
        }, this.config.fadeInstructionsAfter);
    }

    initScene() {
        // Create a basic scene with a sky gradient
        this.scene.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%)';
        
        // Add clouds - these could be replaced with any other elements
        for (let i = 0; i < 15; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.position = 'absolute';
            cloud.style.width = `${100 + Math.random() * 150}px`;
            cloud.style.height = `${50 + Math.random() * 100}px`;
            cloud.style.background = 'white';
            cloud.style.borderRadius = '50%';
            cloud.style.opacity = '0.8';
            cloud.style.filter = 'blur(10px)';
            
            // Position clouds randomly in 3D space
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 100 - 50;
            const z = Math.random() * 1000 - 500;
            cloud.setAttribute('data-pos', `${x},${y},${z}`);
            
            this.scene.appendChild(cloud);
        }
    }

    initEventListeners() {
        // Mouse/touch events
        if (this.isMobile) {
            this.scene.addEventListener('touchstart', this.onPointerDown.bind(this));
            this.scene.addEventListener('touchmove', this.onPointerMove.bind(this));
            this.scene.addEventListener('touchend', this.onPointerUp.bind(this));
        } else {
            this.scene.addEventListener('mousedown', this.onPointerDown.bind(this));
            this.scene.addEventListener('mousemove', this.onPointerMove.bind(this));
            this.scene.addEventListener('mouseup', this.onPointerUp.bind(this));
            this.scene.addEventListener('mouseleave', this.onPointerUp.bind(this));
        }
    }

    onPointerDown(e) {
        this.pointerDown = true;
        this.autoRotate = false;
        const pos = this.getPointerPosition(e);
        this.lastPointerPosition = pos;
    }

    onPointerMove(e) {
        if (!this.pointerDown) return;
        
        const pos = this.getPointerPosition(e);
        const delta = {
            x: pos.x - this.lastPointerPosition.x,
            y: pos.y - this.lastPointerPosition.y
        };
        
        this.targetRotation.y += delta.x * this.config.movementSensitivity;
        this.targetRotation.x += delta.y * this.config.movementSensitivity;
        
        // Limit vertical rotation
        this.targetRotation.x = Math.max(-90, Math.min(90, this.targetRotation.x));
        
        this.lastPointerPosition = pos;
    }

    onPointerUp() {
        this.pointerDown = false;
        // Could enable auto-rotate after inactivity here
    }

    getPointerPosition(e) {
        const rect = this.scene.getBoundingClientRect();
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        } else {
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    }

    updateScene() {
        // Smooth rotation towards target
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.1;
        this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.1;
        
        // Apply auto-rotation when not interacting
        if (!this.pointerDown && this.autoRotate) {
            this.targetRotation.y += this.config.autoRotateSpeed;
        }
        
        // Apply perspective to all elements
        const clouds = this.scene.querySelectorAll('.cloud');
        clouds.forEach(cloud => {
            const [x, y, z] = cloud.getAttribute('data-pos').split(',').map(Number);
            
            // Simple 3D projection with rotation
            const cosY = Math.cos(this.rotation.y * Math.PI / 180);
            const sinY = Math.sin(this.rotation.y * Math.PI / 180);
            const cosX = Math.cos(this.rotation.x * Math.PI / 180);
            const sinX = Math.sin(this.rotation.x * Math.PI / 180);
            
            // Rotate around Y (horizontal), then X (vertical)
            let xRot = x * cosY - z * sinY;
            let zRot = x * sinY + z * cosY;
            
            let yRot = y * cosX - zRot * sinX;
            zRot = y * sinX + zRot * cosX;
            
            // Perspective projection
            const scale = 1000 / (1000 + zRot);
            const left = 50 + xRot * scale;
            const top = 50 - yRot * scale;
            
            cloud.style.left = `${left}%`;
            cloud.style.top = `${top}%`;
            cloud.style.transform = `scale(${scale})`;
            cloud.style.zIndex = Math.floor(1000 - zRot);
        });
    }

    startAnimation() {
        const animate = () => {
            this.updateScene();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    destroy() {
        cancelAnimationFrame(this.animationFrameId);
        // Remove event listeners here
    }
}

// Initialize the experience with cloud configuration
document.addEventListener('DOMContentLoaded', () => {
    new DreamlikeExperience({
        sceneId: 'scene',
        instructionsId: 'instructions',
        movementSensitivity: 0.3,
        autoRotateSpeed: 0.02
    });
});