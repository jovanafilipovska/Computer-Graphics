import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const group = new THREE.Group();
group.scale.y = 2.5;   
group.rotation.x = Math.PI * 0.15; 
scene.add(group);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 2),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cube.position.x =-2
group.add(cube);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
sphere.position.x = 0
sphere.position.y=0.5
group.add(sphere);

const pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(3, 1.5, 4),
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
pyramid.position.x = 2
group.add(pyramid);

function animate(){
    requestAnimationFrame(animate);
    group.rotation.y  +=0.02;
    renderer.render(scene,camera);
}

animate();
