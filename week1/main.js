import * as THREE from 'three';

const scene = new THREE.Scene();// scene constructor
scene.background = new THREE.Color(0x202020);

const aspectRatio= window.innerWidth/window.innerHeight
const camera=new THREE.OrthographicCamera(
    -1*aspectRatio, //left
    1*aspectRatio, //right
    1, //top
    -1, //bottom
    0.1, //near clipping plane
    100 //far clipping plane
)

camera.position.z=3;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry= new THREE.BoxGeometry(1,1,1);
const material = new THREE. MeshStandardMaterial({color:0xFF00000});
const cubeMesh= new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const light= new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);


function animate(){
    requestAnimationFrame(animate);
    cubeMesh.rotation.x  +=0.01;
    renderer.render(scene,camera);
}

animate();