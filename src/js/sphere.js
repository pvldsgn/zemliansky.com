// three
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// 3D
/**
 * Main
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();


// Light
const pointlight = new THREE.PointLight(0xffffff, 1);
pointlight.position.set(200, 200, 200);
scene.add(pointlight);

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 500);
scene.add(camera)

new RGBELoader().setPath('textures/').load('zalupa.hdr', function (hdrmap) {

    let envmap = envmaploader.fromCubemap(hdrmap);
    let texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    const ballMaterial = {
        clearcoat: 1.0,
        cleacoatRoughness: 0.1,
        metalness: 0.9,
        roughness: 0.5,
        color: 0x8418ca,
        normalMap: texture,
        normalScale: new THREE.Vector2(0.15, 0.15),
        envMap: envmap.texture
    };

    let ballGeo = new THREE.SphereGeometry(100, 64, 64);
    let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
    let ballMesh = new THREE.Mesh(ballGeo, ballMat);
    scene.add(ballMesh);

});


/**
 * Optimization
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.enableDamping = true;

/**
 * Start
 */
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const envmaploader = new THREE.PMREMGenerator(renderer)

new RGBELoader().setPath('textures/').load('zalupa.hdr', function (hdrmap) {

});

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // camera.position.x += Math.cos(elapsedTime)
    // camera.position.y += Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)

    // Update controls - Orbitcontrols - controls.enableDamping = true
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()