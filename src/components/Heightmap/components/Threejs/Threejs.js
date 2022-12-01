// Generative traits
import * as imageSetup from "../Image/ImageSetup";
import * as imageManipulate from "../Image/ImageManipulate";
import * as traits from "../../../../utils/Traits";

// Threejs Stuff
import * as THREE from "three";
import * as gui from "../Gui/Gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as three_geometry from "./utils/geometry";
import * as three_material from "./utils/material";
import * as three_post_processing from "./utils/postprocessing";
import { useEffect } from "react";

export default function Threejs() {
  useEffect(() => {
    three();
  }, []);

  return <></>;
}

const three = () => {
  console.log("entered mode2");
  const zoom = traits.camera_zoom;

  //export video settings
  let startFrame = 0;
  let endFrame = 360;
  let exportVideo = false;
  let frameCount = -1;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvasSize = [width, height];

  let mouseX = 1;
  let mouseY = 1;

  // Setup Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // const color = new THREE.Color(hexColors.particleColor);
  // Setup geometry initial attributes
  const positions = [];
  const colors = [];
  const sizes = [];
  const acc = [];

  const imagesData = imageSetup.analyzeImages();

  // create point grid
  imageSetup.createGrid(imagesData, positions, colors, sizes, acc);

  // Setup geometry
  const geometry = three_geometry.createBufferGeometry(
    positions,
    colors,
    sizes,
    acc
  );

  // Setup material
  const material = three_material.createCustomMaterial();

  // Setup mesh
  const mesh = new THREE.Points(geometry, material);
  mesh.rotation.x = traits.mesh_rotation_x;
  mesh.rotation.y = traits.mesh_rotation_y;
  mesh.rotation.z = traits.mesh_rotation_z;

  // Setup Scene
  scene.add(mesh);

  // Setup camera
  const camera = new THREE.PerspectiveCamera(
    traits.camera_fov,
    width / height,
    traits.camera_near,
    traits.camera_far
  );
  camera.position.z = zoom;

  // Setup renderer / canvas
  const renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true,
    alpha: false,
    antialias: false,
  });

  renderer.domElement.setAttribute("id", "canvasExport");
  renderer.setPixelRatio(1);
  renderer.setSize(canvasSize[0], canvasSize[1]);
  const container = document.getElementById("container");
  container.appendChild(renderer.domElement);
  console.log("append container");

  // Setup Post Processing
  const afterimagePass = three_post_processing.afterImageEffect();
  const bloomPass = three_post_processing.glowEffect(gui.params);
  const composer = three_post_processing.processingSetup(
    renderer,
    scene,
    camera,
    afterimagePass,
    bloomPass
  );

  // Setup lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 0, 2);

  // Setup orbit Controls for camera
  const controls = new OrbitControls(camera, renderer.domElement);

  // select image on click
  imageManipulate.changeImageOnClick(imagesData, positions, colors, mesh);

  // Animation / render frames
  function animate() {
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.attributes.color.needsUpdate = true;
    mesh.geometry.attributes.size.needsUpdate = true;

    frameCount++;

    material.uniforms.u_time.value = frameCount * 0.01;

    material.uniforms.u_size.value = gui.params.particleSize;

    material.uniforms.u_noise_x.value = gui.params.noiseX;
    material.uniforms.u_noise_y.value = gui.params.noiseY;
    material.uniforms.u_noise_z.value = gui.params.noiseZ;
    material.uniforms.u_amplitude_x.value = gui.params.amplitudeX;
    material.uniforms.u_amplitude_y.value = gui.params.amplitudeY;
    material.uniforms.u_amplitude_z.value = gui.params.amplitudeZ;
    material.uniforms.u_offset_x.value = gui.params.offsetX;
    material.uniforms.u_offset_y.value = gui.params.offsetY;
    material.uniforms.u_offset_z.value = gui.params.offsetZ;
    material.uniforms.u_contrast.value = gui.params.colorContrast;
    material.uniforms.u_vertex_red.value = gui.params.vertexRed;
    material.uniforms.u_vertex_green.value = gui.params.vertexGreen;
    material.uniforms.u_vertex_blue.value = gui.params.vertexBlue;
    material.uniforms.u_sound_intensity.value = gui.params.soundIntensity;
    bloomPass.threshold = gui.params.bloomThreshold;
    bloomPass.strength = gui.params.bloomStrength;
    afterimagePass.uniforms.damp.value = gui.params.exposure;

    // Rotate Mesh
    mesh.rotation.x += gui.params.rotationX;
    mesh.rotation.y += gui.params.rotationY;
    mesh.rotation.z += gui.params.rotationZ;

    // choose between composer and renderer
    if (gui.params.enableComposer || 8 > 0) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }

    // play and stop animation
    if (gui.params.animate) {
      requestAnimationFrame(animate);
    }
  }

  animate();

  gui.createGUI(
    gui.params,
    geometry,
    scene,
    composer,
    afterimagePass,
    bloomPass,
    animate,
    renderer
  );
};
