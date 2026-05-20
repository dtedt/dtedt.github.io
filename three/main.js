import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate( time ) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

// Basic orientation listener
window.addEventListener('deviceorientation', function(event) {
    // These are the raw values from your device
    const alpha = event.alpha;  // Compass direction (0-360)
    const beta = event.beta;    // Front/back tilt (-180 to 180)
    const gamma = event.gamma;  // Left/right tilt (-90 to 90)
    
    // See what's happening in real-time
    console.log(`Tilt: ${gamma.toFixed(1)}° left/right, ${beta.toFixed(1)}° front/back`);
    
    // Update something on screen
    document.getElementById('debug').innerHTML = `
        Left/Right: ${gamma.toFixed(1)}°<br>
        Front/Back: ${beta.toFixed(1)}°<br>
    `;
});
