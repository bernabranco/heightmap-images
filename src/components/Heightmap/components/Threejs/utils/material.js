import * as THREE from "three";
import { vertexShader } from "../glsl/vertex.js";
import { fragmentShader } from "../glsl/fragment.js";
import texture from "../../../../../texture/2d-shape/circle.png";

// load vertex texture
var textureForm = new THREE.TextureLoader().load(texture);

export const uniforms = {
  pointTexture: { value: textureForm },
  u_resolution: {
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  u_time: { value: 1.0 },
  u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
  u_size: { value: Math.random() * 100 },
  u_sound: { value: 1.0 },
  u_speed: { value: 1.0 },
  u_offset_x: { value: 1.0 },
  u_offset_y: { value: 1.0 },
  u_offset_z: { value: 1.0 },
  u_noise_x: { value: 0.0 },
  u_noise_y: { value: 0.0 },
  u_noise_z: { value: 0.0 },
  u_amplitude_x: { value: 1.0 },
  u_amplitude_y: { value: 1.0 },
  u_amplitude_z: { value: 1.0 },
  u_contrast: { value: 1.0 },
  u_vertex_red: { value: 1.0 },
  u_vertex_green: { value: 1.0 },
  u_vertex_blue: { value: 1.0 },
  u_sound_intensity: { value: 1.0 },
};

export function createCustomMaterial() {
  console.log("create custom material");
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: false,
    vertexColors: true,
  });
  return material;
}
