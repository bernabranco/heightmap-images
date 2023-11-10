import React, { useState, useEffect, useRef } from "react";
import { useImageContext } from "../../store/ImageContext";
import * as THREE from "three";

import { preset } from "../../presets/preset";
import { createGrid } from "../Image/ImageSetup";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  vertexShader as vertexShader1,
  fragmentShader as fragmentShader1,
} from "./glsl/shader1";

import * as gui from "../Gui/Gui";

import * as three_post_processing from "./utils/postprocessing";

import * as three_material from "./utils/material";

import * as three_geometry from "./utils/geometry";

import { volume } from "../Menu/components/Audio/Audio";

import { usePosenetContext } from "../../store/PosenetContext";

import {
  updateUniformsBasedOnGui,
  updateUniformsBasedOnPosenet,
  updateUniformsBasedOnVolume,
} from "./utils/updateUniforms";

import { changeImage, changeImageOnClick } from "../Image/ImageChangeOnClick";
import { changeImageOnKeyDown } from "../Image/ImageChangeOnKeyDown";

const Threejs = () => {
  const { imagesData, uploadedImages } = useImageContext();

  const canvasRef = useRef();

  const { posenetValues } = usePosenetContext();

  useEffect(() => {
    if (imagesData.length === 0) return; // Wait for the imagesData to be available

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      preset.camera.fov,
      width / height,
      preset.camera.near,
      preset.camera.far
    );
    camera.aspect = width / height;
    camera.position.z = preset.camera.zoom;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.domElement.setAttribute("id", "canvasExport");
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    const canvas = renderer.domElement;
    canvasRef.current.appendChild(canvas);

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

    const mesh = new THREE.Points(geometry, material);

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    mesh.rotation.x = preset.movement.rotationX;
    mesh.rotation.y = preset.movement.rotationY;
    mesh.rotation.z = -Math.PI / 2;

    scene.add(mesh);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, canvas);

    const afterimagePass = three_post_processing.afterImageEffect();
    const bloomPass = three_post_processing.glowEffect(gui.params);
    const composer = three_post_processing.setupPostProcessing(
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

    const render = () => {
      requestAnimationFrame(render);

      frameCount++;

      material.needsUpdate = true;
      mesh.geometry.attributes.position.needsUpdate = true;
      mesh.geometry.attributes.color.needsUpdate = true;
      mesh.geometry.attributes.size.needsUpdate = true;

      // Update uniforms based on GUI, posenet and audio volume
      updateUniformsBasedOnGui(material, gui, frameCount, volume);
      updateUniformsBasedOnVolume(material, gui, frameCount, volume);
      updateUniformsBasedOnPosenet(posenetValues, material);

      mesh.rotation.x += gui.params.rotationX;
      mesh.rotation.y += gui.params.rotationY;
      mesh.rotation.z += gui.params.rotationZ;

      bloomPass.threshold = gui.params.bloomThreshold;
      bloomPass.strength = gui.params.bloomStrength;
      afterimagePass.uniforms.damp.value = gui.params.exposure;

      if (gui.params.enableComposer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      if (!gui.params.animate) {
        frameCount = 1;
      }

      if (volume * gui.params.soundIntensity > 0.5 * 0.05) {
        changeImage(imagesData, uploadedImages.length, positions, colors, mesh);
      }
    };

    let frameCount = -1;
    render();

    gui.createGUI(gui.params, geometry, scene, bloomPass, render, renderer);

    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [imagesData]);

  return <div ref={canvasRef} />;
};

export default Threejs;
