import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// =====================
// SCENE, CAMERA, RENDERER
// =====================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 40, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// =====================
// CONTROLS
// =====================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// =====================
// LIGHTING
// =====================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(50, 80, 40);
sun.castShadow = true;
scene.add(ambientLight, sun);

// =====================
// TEXTURE LOADER
// =====================
const textureLoader = new THREE.TextureLoader();

// =====================
// GROUND (GRASS)
// =====================
const grassTex = textureLoader.load('textures/Grass001_2K-JPG_Color.jpg');
grassTex.wrapS = grassTex.wrapT = THREE.RepeatWrapping;
grassTex.repeat.set(8, 8);

const grassMaterial = new THREE.MeshStandardMaterial({ map: grassTex });
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  grassMaterial
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// =====================
// ROADS
// =====================
const roadTex = textureLoader.load('textures/Asphalt032_2K-JPG_Color.jpg');
roadTex.wrapS = roadTex.wrapT = THREE.RepeatWrapping;
roadTex.repeat.set(4, 4);

const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTex });
const roadHeight = 0.2;

const horizontalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(200, roadHeight, 20),
  roadMaterial
);
horizontalRoad.position.y = 0.1;

const verticalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(20, roadHeight, 200),
  roadMaterial
);
verticalRoad.position.y = 0.1;

scene.add(horizontalRoad, verticalRoad);

// =====================
// ROUNDABOUT
// =====================
const roundabout = new THREE.Mesh(
  new THREE.CylinderGeometry(12, 12, 0.8, 64),
  roadMaterial
);
roundabout.rotation.x=6.3;
roundabout.position.set(0,0.8,0);

const center = new THREE.Mesh(
  new THREE.CylinderGeometry(8, 8, 0.6, 32),
  grassMaterial
);
center.rotation.x=6.3;
center.position.set(0,1,0);

scene.add(roundabout, center);

const buildings = [];

// Textures
const brickTex = textureLoader.load('textures/Bricks075A_2K-JPG_Color.jpg');
const brick2Tex = textureLoader.load('textures/Bricks085_2K-JPG_Color.jpg');

// IT Support (Glass)
const itSupport = new THREE.Mesh(
  new THREE.BoxGeometry(38, 14, 18),
  new THREE.MeshPhysicalMaterial({
    color: 0x88ccee,
    transparent: true,
    opacity: 0.5,
    transmission: 0.9,
    roughness: 0.1
  })
);
itSupport.position.set(-35, 7, 30);
itSupport.castShadow = true;
scene.add(itSupport);
buildings.push(itSupport);

// LH2 (Concrete)
const LH2 = new THREE.Mesh(
  new THREE.BoxGeometry(24, 16, 16),
  new THREE.MeshStandardMaterial({ map: brick2Tex })
);
LH2.position.set(45, 8, 45);
LH2.castShadow = true;
scene.add(LH2);
buildings.push(LH2);

// CST (Gradient building)
const cstGeo = new THREE.BoxGeometry(26, 30, 22);
const cstMat = new THREE.MeshBasicMaterial({ vertexColors: true });
const colors = [];

for (let i = 0; i < cstGeo.attributes.position.count; i++) {
  const color = new THREE.Color().lerpColors(
    new THREE.Color(0x00ff7f),
    new THREE.Color(0x0000ff),
    i / cstGeo.attributes.position.count
  );
  colors.push(color.r, color.g, color.b);
}
cstGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const CST = new THREE.Mesh(cstGeo, cstMat);
CST.position.set(-35, 15, -45);
CST.castShadow = true;
scene.add(CST);
buildings.push(CST);

// LAW (Brick)
const LAW = new THREE.Mesh(
  new THREE.BoxGeometry(35, 20, 18),
  new THREE.MeshStandardMaterial({ map: brickTex })
);
LAW.position.set(35, 10, -25);
LAW.castShadow = true;
scene.add(LAW);
buildings.push(LAW);

let cones = [];
let windActive=false;
let windStartTime = 0;

const gltfLoader = new GLTFLoader();

gltfLoader.load('models/obstacle_conus.glb', (gltf) => {
  const obst_conus = gltf.scene;
  obst_conus.scale.set(10,10,10);
  obst_conus.position.set(60, 1, -7);
  obst_conus.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });
  scene.add(obst_conus);
  cones.push(obst_conus);
});


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(buildings);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.material && obj.material.color) {
      obj.material.color.set(Math.random() * 0xffffff);
    }
  }
});

function triggerWind(){
    windActive=true;
    windStartTime=Date.now();
}

setInterval(triggerWind,4000);

function animate() {
  requestAnimationFrame(animate);

  const time=Date.now();

  cones.forEach((cone)=>{
    if (windActive){
        cone.rotation.z = Math.min(cone.rotation.z + 0.02, Math.PI / 2);
    }else{
        cone.rotation.z *= 0.9;
    }
  });

  if(windActive && time - windStartTime > 2000){
    windActive=false;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
