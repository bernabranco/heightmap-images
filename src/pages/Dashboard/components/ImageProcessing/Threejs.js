// Generative traits
import * as imageSetup from "../../pages/Dashboard/components/Image/ImageSetup";
import { imagesData } from "../../pages/StartScreen/StartScreen";
import { changeImageOnKeyDown } from "../../pages/Dashboard/components/Image/ImageChangeOnKeyDown.js";
import { changeImageOnClick } from "../../pages/Dashboard/components/Image/ImageChangeOnClick.js";
import * as traits from "../../presets/basic";

// Import custom shaders
import {
  vertexShader as vertexShader1,
  fragmentShader as fragmentShader1,
} from "./glsl/shader1";

import {
  vertexShader as vertexShader2,
  fragmentShader as fragmentShader2,
} from "./glsl/shader2";

// Threejs Stuff
import * as THREE from "three";
import * as gui from "../../pages/Dashboard/components/Gui/Gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as three_geometry from "./utils/geometry";
import * as three_material from "./utils/material";
import * as three_post_processing from "./utils/postprocessing";
import { useEffect } from "react";

// Audio Stuff
import { volume } from "../Audio/Audio";
import {
  changeParticleSizeBasedOnAudioVolume,
  switchImageBasedOnAudioVolume,
} from "../Audio/utils";
import {
  updateUniformsBasedOnGui,
  updateUniformsBasedOnGuiAndVolume,
  updateUniformsBasedOnVolume,
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

  const nrMeshes = 1;

  // setup geometry initial attributes
  const positions = [];
  const colors = [];
  const sizes = [];
  const acc = [];

  // create point grid with imageData
  imageSetup.createGrid(imagesData, positions, colors, sizes, acc);

  // setup geometry
  const geometry = three_geometry.createBufferGeometry(
    positions,
    colors,
    sizes,
    acc
  );

  //setup material
  const material = three_material.createCustomMaterial(
    vertexShader1,
    fragmentShader1
  );

  // setup mesh
  const mesh = new THREE.Points(geometry, material);

  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;

  mesh.rotation.x = traits.initial_mesh_rotation_x;
  mesh.rotation.y = traits.initial_mesh_rotation_y;
  mesh.rotation.z = traits.initial_mesh_rotation_z;

  // setup scene
  scene.add(mesh);

  // setup camera
  const camera = new THREE.PerspectiveCamera(
    traits.camera_fov,
    width / height,
    traits.camera_near,
    traits.camera_far
  );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.z = zoom;

  // setup renderer / canvas
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
  changeImageOnClick(imagesData, positions, colors, mesh);

  // change display image when key is pressed
  let imageId = 0;
  changeImageOnKeyDown(imageId, imagesData, positions, colors, mesh);

  let frameCount = -1;

  // animation / render frames
  function animate() {
    // frameCount is used to represent time
    frameCount++;

    for (let i = 0; i < nrMeshes; i++) {
      // update material and mesh
      material.needsUpdate = true;
      mesh.geometry.attributes.position.needsUpdate = true;
      mesh.geometry.attributes.color.needsUpdate = true;
      mesh.geometry.attributes.size.needsUpdate = true;

      // rotate mesh
      mesh.rotation.x += gui.params.rotationX;
      mesh.rotation.y += gui.params.rotationY;
      mesh.rotation.z += gui.params.rotationZ;

      // sound Effects
      updateUniformsBasedOnGui(material, gui, frameCount, volume);
      updateUniformsBasedOnVolume(material, gui, frameCount, volume);
    }

    // update passes
    bloomPass.threshold = gui.params.bloomThreshold;
    bloomPass.strength = gui.params.bloomStrength;
    afterimagePass.uniforms.damp.value = gui.params.exposure;

    // switchImageBasedOnAudioVolume(
    //   1.5,
    //   volume,
    //   imagesData,
    //   positions,
    //   colors,
    //   meshes
    // );

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
    //geometries,
    scene,
    composer,
    afterimagePass,
    bloomPass,
    animate,
    renderer
  );
};
