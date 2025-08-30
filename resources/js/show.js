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
let modelMesh; // Variabel untuk menyimpan referensi model

loader.load(
    `/models/${model}.glb`,
    function (gltf) {
        modelMesh = gltf.scene;

        // Set initial scale to 0
        modelMesh.scale.set(0, 0, 0);
        scene.add(modelMesh);

        // Animation variables
        let scale = 0;
        const targetScale = 1;
        const animationDuration = 1000; // 1 second
        const startTime = Date.now();

        // Set initial rotation
        modelMesh.rotation.set(
            THREE.MathUtils.degToRad(-30),  // x-rotation
            THREE.MathUtils.degToRad(45),   // y-rotation
            0                               // z-rotation
        );

        // Target rotation (back to 0,0,0)
        const targetRotation = { x: 0, y: THREE.MathUtils.degToRad(90 + 45), z: 0 };
        const startRotation = {
            x: modelMesh.rotation.x,
            y: modelMesh.rotation.y,
            z: modelMesh.rotation.z
        };

        // Animate function
        function animateModel() {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - startTime) / animationDuration);

            // Ease out quad function for smoother animation
            const easedProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Animate scale
            scale = easedProgress * targetScale;
            modelMesh.scale.set(scale, scale, scale);

            // Animate rotation
            modelMesh.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * easedProgress;
            modelMesh.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * easedProgress;
            modelMesh.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * easedProgress;

            if (progress < 1) {
                requestAnimationFrame(animateModel);
            }
        }

        // Start the animation
        animateModel();
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

// Initial camera position
camera.position.z = 8; // Increased from 5 to 8 for better initial view
camera.position.y = 2; // Slightly elevated view

// Set controls target to center of the scene
controls.target.set(0, 0, 0);

// Enable auto-rotation for better initial view
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1.0; // Slower rotation speed

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
