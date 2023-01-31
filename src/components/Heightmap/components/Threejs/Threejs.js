// Generative traits
import * as imageSetup from "../Image/ImageSetup";
import { imagesData } from "../../../../pages/LoadImages/LoadImages";
import { changeImageOnKeyDown } from "../Image/ImageChangeOnKeyDown.js";
import { changeImageOnClick } from "../Image/ImageChangeOnClick.js";
import * as traits from "../../../../presets/basic";

// Import custom shaders
import {
  vertexShader as vertexShader1,
  fragmentShader as fragmentShader1,
} from "../../components/Threejs/glsl/shader1";

import {
  vertexShader as vertexShader2,
  fragmentShader as fragmentShader2,
} from "../../components/Threejs/glsl/shader2";

// Threejs Stuff
import * as THREE from "three";
import * as gui from "../Gui/Gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as three_geometry from "./utils/geometry";
import * as three_material from "./utils/material";
import * as three_post_processing from "./utils/postprocessing";
import { useEffect } from "react";

// Audio Stuff
import { volume } from "../../../Audio/Audio";
import {
  changeParticleSizeBasedOnAudioVolume,
  switchImageBasedOnAudioVolume,
} from "../../../Audio/utils";
import {
  updateUniformsBasedOnGui,
  updateUniformsBasedOnGuiAndVolume,
} from "./utils/updateUniforms";

export default function Threejs() {
  useEffect(() => {
    three();
  }, []);

  return <></>;
}

const three = () => {
  const zoom = 900;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvasSize = [width, height];

  // setup Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // setup geometry initial attributes
  const positions = [];
  const colors = [];
  const sizes = [];
  const acc = [];

  // create point grid
  imageSetup.createGrid(imagesData, positions, colors, sizes, acc);

  // setup geometry
  const geometry = three_geometry.createBufferGeometry(
    positions,
    colors,
    sizes,
    acc
  );

  // setup material
  const material1 = three_material.createCustomMaterial(
    vertexShader1,
    fragmentShader1
  );
  const material2 = three_material.createCustomMaterial(
    vertexShader2,
    fragmentShader2
  );

  // setup mesh
  const mesh1 = new THREE.Points(geometry, material1);
  mesh1.rotation.x = traits.initial_mesh_rotation_x;
  mesh1.rotation.y = traits.initial_mesh_rotation_y;
  mesh1.rotation.z = traits.initial_mesh_rotation_z;

  // setup mesh
  const mesh2 = new THREE.Points(geometry, material2);
  mesh2.rotation.x = traits.initial_mesh_rotation_x;
  mesh2.rotation.y = traits.initial_mesh_rotation_y;
  mesh2.rotation.z = traits.initial_mesh_rotation_z;

  // setup Scene
  scene.add(mesh1, mesh2);

  // setup camera
  const camera = new THREE.PerspectiveCamera(
    traits.camera_fov,
    width / height,
    traits.camera_near,
    traits.camera_far
  );
  camera.aspect = window.innerWidth / window.innerHeight;
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

  // setup Post Processing
  const afterimagePass = three_post_processing.afterImageEffect();
  const bloomPass = three_post_processing.glowEffect(gui.params);
  const composer = three_post_processing.processingSetup(
    renderer,
    scene,
    camera,
    afterimagePass,
    bloomPass
  );

  // setup lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 0, 2);

  // Setup orbit Controls for camera
  const controls = new OrbitControls(camera, renderer.domElement);

  // change display image when images is pressed
  changeImageOnClick(imagesData, positions, colors, mesh1);
  changeImageOnClick(imagesData, positions, colors, mesh2);

  // change display image when key is pressed
  let imageId = 0;
  changeImageOnKeyDown(imageId, imagesData, positions, colors, mesh1);

  let frameCount = -1;

  // animation / render frames
  function animate() {
    // frame count is used to represent time
    frameCount++;

    // update material
    material1.needsUpdate = true;
    material2.needsUpdate = true;

    // update mesh
    mesh1.geometry.attributes.position.needsUpdate = true;
    mesh1.geometry.attributes.color.needsUpdate = true;
    mesh1.geometry.attributes.size.needsUpdate = true;

    mesh1.rotation.x += gui.params.rotationX;
    mesh1.rotation.y += gui.params.rotationY;
    mesh1.rotation.z += gui.params.rotationZ;

    // update passes
    bloomPass.threshold = gui.params.bloomThreshold;
    bloomPass.strength = gui.params.bloomStrength;
    afterimagePass.uniforms.damp.value = gui.params.exposure;

    // update uniforms
    // updateUniformsBasedOnGui(
    //   material,
    //   gui,
    //   frameCount,
    // );

    updateUniformsBasedOnGuiAndVolume(material1, gui, frameCount, volume);
    updateUniformsBasedOnGuiAndVolume(material2, gui, frameCount, volume);

    // Sound Effects
    switchImageBasedOnAudioVolume(1.5, volume, imagesData, positions, colors, mesh1);
    switchImageBasedOnAudioVolume(1.5, volume, imagesData, positions, colors, mesh2);

    // choose between composer and renderer
    if (gui.params.enableComposer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }

    // play and stop animation
    if (!gui.params.animate) {
      frameCount = 1;
    }

    requestAnimationFrame(animate);
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
