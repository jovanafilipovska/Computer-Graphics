import * as THREE from 'three';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x20232a);

    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI /2.1;
    plane.position.y = -1.4;
     plane.position.z = -0.5;
    scene.add(plane);

    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(-1, -0.5, 0);
    scene.add(cylinder);

    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.3, roughness: 0.6 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(1.75, -0.5, 2);
    scene.add(sphere);

    const coneGeometry = new THREE.ConeGeometry(1.6, 6, 32);
    const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(2, -0.4, -1);
    scene.add(cone);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    renderer.render(scene, camera);