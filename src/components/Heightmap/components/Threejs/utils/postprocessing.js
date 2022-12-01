import * as THREE from "three";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

export function processingSetup(
  renderer,
  scene,
  camera,
  afterimagePass,
  bloomPass,
) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(afterimagePass);
  composer.addPass(bloomPass);
  return composer;
}

export function glowEffect(params) {
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  return bloomPass;
}

export function afterImageEffect() {
  const afterimagePass = new AfterimagePass();
  afterimagePass.uniforms["damp"].value = 0.8;
  return afterimagePass;
}
