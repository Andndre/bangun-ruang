import * as THREE from 'three';
import { OrbitControls } from "three/addons";
import { GLTFLoader } from "three/addons";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set background color to white

document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth camera movement
controls.dampingFactor = 0.25;

// Optimasi untuk perangkat mobile
controls.enableZoom = true;
controls.enablePan = true;
controls.touchAction = 'none'; // Mencegah scroll halaman saat menggeser model
controls.screenSpacePanning = true; // Memungkinkan panning yang lebih baik di layar sentuh

// Mencegah perilaku default saat menggeser
renderer.domElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        e.preventDefault();
    }
}, { passive: false });

renderer.domElement.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        e.preventDefault();
    }
}, { passive: false });

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


// Load 3D Model (Example: GLTF)
const loader = new GLTFLoader();
loader.load(
    `/models/${model}.glb`, // Replace with the actual path to your 3D model
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined, // Optional: onProgress callback
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

// Initial camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth damping
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
