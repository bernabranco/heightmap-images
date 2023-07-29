import React, { useEffect, useRef } from "react";
import { useImageContext } from "../../store/ImageContext";
import * as THREE from "three";

import * as traits from "../../presets/basic.js";
import { createGrid } from "../Image/ImageSetup";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Import custom shaders
import {
  vertexShader as vertexShader1,
  fragmentShader as fragmentShader1,
} from "./glsl/shader1";

// Import GUI and related utils
import * as gui from "../Gui/Gui";

import * as three_post_processing from "./utils/postprocessing";

import * as three_material from "./utils/material";

import * as three_geometry from "./utils/geometry";

import { volume } from "../Audio/Audio";

import { updateUniformsBasedOnGui } from "./utils/updateUniforms";

import { updateUniformsBasedOnVolume } from "./utils/updateUniforms";
import { changeImage, changeImageOnClick } from "../Image/ImageChangeOnClick";
import { changeImageOnKeyDown } from "../Image/ImageChangeOnKeyDown";

const Threejs = () => {
  const { imagesData, uploadedImages } = useImageContext();
  const canvasRef = useRef();

  useEffect(() => {
    if (imagesData.length === 0) return; // Wait for the imagesData to be available

    const zoom = 900;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      traits.camera_fov,
      width / height,
      traits.camera_near,
      traits.camera_far
    );
    camera.aspect = width / height;
    camera.position.z = zoom;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.domElement.setAttribute("id", "canvasExport");
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    const canvas = renderer.domElement;
    canvasRef.current.appendChild(canvas);

    // Setup Geometry and Material
    const positions = [];
    const colors = [];
    const sizes = [];
    const acc = [];

    createGrid(imagesData, positions, colors, sizes, acc);

    const geometry = three_geometry.createBufferGeometry(
      positions,
      colors,
      sizes,
      acc
    );

    const material = three_material.createCustomMaterial(
      vertexShader1,
      fragmentShader1
    );

    // Setup Mesh
    const mesh = new THREE.Points(geometry, material);

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    mesh.rotation.x = traits.initial_mesh_rotation_x;
    mesh.rotation.y = traits.initial_mesh_rotation_y;
    mesh.rotation.z = traits.initial_mesh_rotation_z;

    // setup scene
    scene.add(mesh);

    // Setup Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);

    // Setup Orbit Controls
    const controls = new OrbitControls(camera, canvas);

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

    let imageId = 0;
    changeImageOnKeyDown(
      imageId,
      imagesData,
      uploadedImages.length,
      positions,
      colors,
      mesh
    );

    changeImageOnClick(
      imagesData,
      uploadedImages.length,
      positions,
      colors,
      mesh
    );

    // Render Function
    const render = () => {
      requestAnimationFrame(render);

      frameCount++;

      material.needsUpdate = true;
      mesh.geometry.attributes.position.needsUpdate = true;
      mesh.geometry.attributes.color.needsUpdate = true;
      mesh.geometry.attributes.size.needsUpdate = true;

      // Update uniforms based on GUI and audio volume
      updateUniformsBasedOnGui(material, gui, frameCount, volume);
      updateUniformsBasedOnVolume(material, gui, frameCount, volume);

      if (volume > 2) {
        changeImage(imagesData, uploadedImages.length, positions, colors, mesh);
      }

      // Update passes
      bloomPass.threshold = gui.params.bloomThreshold;
      bloomPass.strength = gui.params.bloomStrength;
      afterimagePass.uniforms.damp.value = gui.params.exposure;

      // Choose between composer and renderer
      if (gui.params.enableComposer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      // Play and stop animation
      if (!gui.params.animate) {
        frameCount = 1;
      }
    };

    let frameCount = -1;
    render();

    gui.createGUI(gui.params, geometry, scene, bloomPass, render, renderer);

    // Clean up
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default Threejs;
