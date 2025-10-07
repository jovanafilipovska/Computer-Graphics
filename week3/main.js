import * as THREE from 'three';

const scene = new THREE.Scene();// scene constructor
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight, 0.1, 1000
);

camera.position.z=3;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry= new THREE.SphereGeometry(0.5,32,32);
const material = new THREE. MeshStandardMaterial({color: 0x00ff00});
const sphere= new THREE.Mesh(geometry, material);
sphere.position.x = 0
sphere.position.y=0.5
scene.add(sphere);


const light= new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y  +=0.02;
    // sphere.rotation.x  +=0.02;
    sphere.rotation.z  +=0.02;
    renderer.render(scene,camera);
}

animate();

