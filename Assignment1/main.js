import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(100,40,30);
camera.lookAt(0,0,0);

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0x87ceeb);
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

const light=new THREE.AmbientLight(0xffffff,0.6);
const sun=new THREE.DirectionalLight(0xffffff,0.9);
sun.position.set(50,80,40);
sun.castShadow=true;
scene.add(light,sun);


//grass
const grassMaterial=new THREE.MeshLambertMaterial({color:0x5dbb63});
const ground= new THREE.Mesh(new THREE.PlaneGeometry(200,200),grassMaterial);
ground.rotation.x=-Math.PI/2;
ground.rotation.y=0;
ground.receiveShadow=true;
scene.add(ground);

//roads
const roadMaterial=new THREE.MeshStandardMaterial({color:0x4f4f4f});
const roadHeight=0.2;

const horizontalRoad=new THREE.Mesh(new THREE.BoxGeometry(200,roadHeight,20),roadMaterial);
horizontalRoad.position.y=0.1;

const verticalRoad=new THREE.Mesh(new THREE.BoxGeometry(20,roadHeight,200),roadMaterial);
verticalRoad.position.y=0.1
scene.add(horizontalRoad,verticalRoad);

//rounabout

const roundabout=new THREE.Mesh(
    new THREE.CylinderGeometry(12,12,0.8,64),
    new THREE.MeshLambertMaterial({color:0x4f4f4f})
);
roundabout.rotation.x=6.3;
roundabout.position.set(0,0.8,0);

const center=new THREE.Mesh(
    new THREE.CylinderGeometry(10,10,1,32),
    new THREE.MeshLambertMaterial({color:0x8fd18c})
);
center.rotation.x=6.3;
center.position.set(0,1,0);

scene.add(roundabout,center);

//IT support

const itSupport= new THREE.Mesh(
    new THREE.BoxGeometry(38,14,18),
    new THREE.MeshStandardMaterial({color:0xffe066})
);
itSupport.position.set(-35,7,30);
itSupport.castShadow=true;
scene.add(itSupport);

//LH2

const LH2=new THREE.Mesh(
    new THREE.BoxGeometry(24,16,16),
    new THREE.MeshPhongMaterial({color:0x2e2e2e})
);

LH2.position.set(45,6,45);
LH2.castShadow=true;
scene.add(LH2);

//305

const cstGeo=new THREE.BoxGeometry(26,30,22);
const cstMat=new THREE.MeshBasicMaterial({vertexColors:true});
const colors=[];
for(let i=0; i<cstGeo.attributes.position.count;i++){
    const color=new THREE.Color().lerpColors(
        new THREE.Color(0x00ff7f),
        new THREE.Color(0x0000ff),
        i/cstGeo.attributes.position.count
    );
    colors.push(color.r,color.g,color.b);
}
cstGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
const CST=new THREE.Mesh(cstGeo,cstMat);
CST.position.set(-35,10,-45);
CST.castShadow=true;
scene.add(CST);

//814
const LAW=new THREE.Mesh(
    new THREE.BoxGeometry(35,20,18),
    new THREE.MeshPhongMaterial({color:0x007bff})
);
LAW.position.set(35,10,-25);
LAW.castShadow=true;
scene.add(LAW);

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();

window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/window.innerHeight);
});
