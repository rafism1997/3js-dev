import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Get the canvas element
const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const loader = new GLTFLoader()
loader.load('assets/wraith.glb', (gltf) =>{
    console.log(gltf.scene);
    const model = gltf.scene;
    model.scale.set(0.02,0.02,0.02);
    scene.add(model);
})

const plane = new THREE.PlaneGeometry(5,5);
const floorMaterial = new THREE.MeshStandardMaterial("white");
const planeMesh = new THREE.Mesh(plane,floorMaterial);
scene.add(planeMesh);
plane.rotateX(-Math.PI / 2)

// loader.load('assets/wraith.glb',function(glb){
//     console.log(gltf)
//     console.root = glb.scene;
//     root.scale.set(0.5,0.5,0.5)
//     scene.add(root);
// },function(xhr){
//     console.log((xhr.loaded/xhr.total * 100) + "%loaded")
// },function(error){
//     console.log("An error occured")
// })
// scene.background = new THREE.Color("#000000");

const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
directionalLight.position.set(2,2,5)
scene.add(directionalLight)

// `const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: "0xffffff"
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// scene.add(boxMesh)

// console.log(boxMesh);`

// Set up sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Set up camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.01, 1000);
camera.position.set(0, 1, 5);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Set up renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

// Configure renderer
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true; // Fixed the typo here

//renderer.render(scene,camera);

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Animation loop
const animate = () => {
    // Update your animations or interactions here

    // Render the scene
    renderer.render(scene, camera);

    controls.update();

    // Call animate again on the next frame
    requestAnimationFrame(animate);
};

// Start the animation loop
animate();

