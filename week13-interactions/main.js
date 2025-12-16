import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    renderer.domElement.width / renderer.domElement.height,
    0.1,
    100
);
camera.position.set(1, 0, 5);
scene.add(camera);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Raycaster
const raycaster = new THREE.Raycaster();
raycaster.near = 0.0;
raycaster.far = 100;

const mouse = new THREE.Vector2();

// UI panel
const infoPanel = document.getElementById("infoPanel");

// Cubes storage
const cubes = [];
let lastSelectedCube = null;
let lastSelectedCubeColor = null;

// Create cubes
for (let i = 0; i < 30; i++) {

    const size = randBetween(0.2, 1);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        randBetween(-4, 4),
        randBetween(-4, 4),
        randBetween(-5, 0)
    );

    // Store size for later display
    cube.userData.size = { width: size, height: size, depth: size };

    scene.add(cube);
    cubes.push(cube);
}

// Mouse click detection
window.addEventListener("click", (event) => {

    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Restore previous cube color
    if (lastSelectedCube) {
        lastSelectedCube.material.color.set(lastSelectedCubeColor);
        lastSelectedCube.scale.set(1, 1, 1);
    }

    if (intersects.length > 0) {
        const selectedCube = intersects[0].object;

        lastSelectedCube = selectedCube;
        lastSelectedCubeColor = selectedCube.material.color.getHex();

        // Highlight cube
        selectedCube.material.color.set(0xffffff);
        selectedCube.scale.set(1.2, 1.2, 1.2);

        // Update UI panel
        const pos = selectedCube.position;
        const size = selectedCube.userData.size;

        infoPanel.innerHTML = `
            <strong>Cube Selected</strong><br><br>
            <strong>Position:</strong><br>
            x: ${pos.x.toFixed(2)}<br>
            y: ${pos.y.toFixed(2)}<br>
            z: ${pos.z.toFixed(2)}<br><br>
            <strong>Size:</strong><br>
            width: ${size.width.toFixed(2)}<br>
            height: ${size.height.toFixed(2)}<br>
            depth: ${size.depth.toFixed(2)}
        `;
    } else {
        // Clicked empty space
        lastSelectedCube = null;
        infoPanel.innerHTML = "No object selected.";
    }
});

// Resize handling
window.addEventListener('resize', () => {
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Helper functions
function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    return Math.random() * 0xffffff;
}
