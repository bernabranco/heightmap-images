import { GUI } from "dat.gui";
import * as traits from "../../../../presets/basic";

export const params = {
  animate: true, // core
  particleCount: traits.vertex_number,
  particleSize: traits.vertex_size,
  particleSpeed: traits.vertex_speed,

  offsetX: traits.vertex_offset_x, // position
  offsetY: traits.vertex_offset_y,
  offsetZ: traits.vertex_offset_z,

  noiseX: traits.vertex_noise_x, // movement
  noiseY: traits.vertex_noise_y,
  noiseZ: traits.vertex_noise_z,
  amplitudeX: traits.vertex_amplitude_x,
  amplitudeY: traits.vertex_amplitude_y,
  amplitudeZ: traits.vertex_amplitude_z,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,

  enableComposer: traits.scene_enable_composer, // post processing
  exposure: traits.vertex_drag,
  bloomStrength: traits.vertex_bloom_strength,
  bloomThreshold: traits.vertex_bloom_threshold,
  bloomRadius: traits.vertex_bloom_radius,

  backgroundColor: traits.scene_background_color, // color
  colorContrast: traits.vertex_contrast,
  vertexRed: traits.vertex_red,
  vertexGreen: traits.vertex_green,
  vertexBlue: traits.vertex_blue,

  soundIntensity: traits.vertex_sound_intensity, // sound

  // cameraX: 0, // camera
  // cameraY: 0,
  // cameraZ: 900,
  // cameraRotateX: 0,
  // cameraRotateY: 0,
  // cameraRotateZ: 0,
};

export function createGUI(
  params,
  geometry,
  scene,
  bloomPass,
  animate,
  renderer
) {
  // Create gui for particle manipulation
  const gui = new GUI({ name: "Control Station" });

  const coreProperties = gui.addFolder("Core");
  coreProperties
    .add(params, "animate")
    .onChange(() => animate(), { passive: true });

  coreProperties
    .add(params, "particleCount")
    .min(0)
    .max(traits.vertex_number)
    .step(1)
    .onChange(
      () => {
        geometry.attributes.position.needsUpdate = true;
        geometry.setDrawRange(0, params.particleCount);
      },
      { passive: true }
    );
  coreProperties.add(params, "particleSize").min(-100).max(100).step(0.01);
  coreProperties.add(params, "particleSpeed").min(-10).max(10).step(0.001);

  // const cameraProperties = gui.addFolder("Camera");
  // cameraProperties.add(params, "cameraX").min(-1000).max(1000).step(1);
  // cameraProperties.add(params, "cameraY").min(-1000).max(1000).step(1);
  // cameraProperties.add(params, "cameraZ").min(0).max(10000).step(1);
  // cameraProperties.add(params, "cameraRotateX").min(-1000).max(1000).step(1);
  // cameraProperties.add(params, "cameraRotateY").min(-1000).max(1000).step(1);
  // cameraProperties.add(params, "cameraRotateZ").min(-1000).max(1000).step(1);

  const positionProperties = gui.addFolder("Position");
  positionProperties.add(params, "offsetX").min(-1000).max(1000).step(0.01);
  positionProperties.add(params, "offsetY").min(-1000).max(1000).step(0.01);
  positionProperties.add(params, "offsetZ").min(-1000).max(1000).step(0.01);

  const movementProperties = gui.addFolder("Movement");
  movementProperties.add(params, "noiseX").min(-1000).max(1000).step(0.001);
  movementProperties.add(params, "noiseY").min(-1000).max(1000).step(0.001);
  movementProperties.add(params, "noiseZ").min(-1000).max(1000).step(0.001);
  movementProperties.add(params, "amplitudeX").min(-100).max(100).step(0.001);
  movementProperties.add(params, "amplitudeY").min(-100).max(100).step(0.001);
  movementProperties.add(params, "amplitudeZ").min(-100).max(100).step(0.001);
  movementProperties.add(params, "rotationX").min(-0.1).max(0.1).step(0.001);
  movementProperties.add(params, "rotationY").min(-0.1).max(0.1).step(0.001);
  movementProperties.add(params, "rotationZ").min(-0.1).max(0.1).step(0.001);

  const colorProperties = gui.addFolder("Color");
  colorProperties.addColor(params, "backgroundColor").onChange(
    function (value) {
      scene.background.set(value);
    },
    { passive: true }
  );
  colorProperties.add(params, "vertexRed").min(-10).max(10).step(0.001);
  colorProperties.add(params, "vertexGreen").min(-10).max(10).step(0.001);
  colorProperties.add(params, "vertexBlue").min(-10).max(10).step(0.001);
  colorProperties.add(params, "colorContrast").min(0).max(5).step(0.001);

  const soundProperties = gui.addFolder("Sound");
  soundProperties.add(params, "soundIntensity").min(-100).max(100).step(0.01);

  const postProcessing = gui.addFolder("Post Processing");
  postProcessing.add(params, "enableComposer");
  //folder6.add(afterimagePass.uniforms["damp"], "value", 0, 1).step(0.001);
  postProcessing.add(params, "exposure", 0, 1, 0.001).onChange(
    function (value) {
      renderer.toneMappingExposure = Number(value);
    },
    { passive: true }
  );

  postProcessing
    .add(params, "bloomStrength", 0.0, 10.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.strength = Number(value);
      },
      { passive: true }
    );

  postProcessing
    .add(params, "bloomThreshold", 0.0, 1.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.threshold = Number(value);
      },
      { passive: true }
    );

  postProcessing
    .add(params, "bloomRadius", 0.0, 1.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.radius = Number(value);
      },
      { passive: true }
    );
}
