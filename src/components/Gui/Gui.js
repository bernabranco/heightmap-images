import { GUI } from "dat.gui";
import { preset } from "../../presets/preset";

console.log({ gui_preset: preset });

export const params = {
  animate: true,
  particleCount: preset.core.particleCount,
  particleSize: preset.core.particleSize,
  particleSpeed: preset.core.particleSpeed,

  offsetX: preset.position.offsetX,
  offsetY: preset.position.offsetY,
  offsetZ: preset.position.offsetZ,

  noiseX: preset.movement.noiseX,
  noiseY: preset.movement.noiseY,
  noiseZ: preset.movement.noiseZ,
  amplitudeX: preset.movement.amplitudeX,
  amplitudeY: preset.movement.amplitudeY,
  amplitudeZ: preset.movement.amplitudeZ,
  rotationX: preset.movement.rotationX,
  rotationY: preset.movement.rotationY,
  rotationZ: preset.movement.rotationZ,

  enableComposer: preset.postProcessing.enableComposer,
  exposure: preset.postProcessing.exposure,
  bloomStrength: preset.postProcessing.bloomStrength,
  bloomThreshold: preset.postProcessing.bloomThreshold,
  bloomRadius: preset.postProcessing.bloomRadius,

  backgroundColor: preset.color.backgroundColor,
  colorContrast: preset.color.colorContrast,
  vertexRed: preset.color.vertexRed,
  vertexGreen: preset.color.vertexGreen,
  vertexBlue: preset.color.vertexBlue,

  soundIntensity: preset.sound.soundIntensity,

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
  const gui = new GUI({ name: "Control Station" });

  const coreProperties = gui.addFolder("Core");
  coreProperties
    .add(params, "animate")
    .onChange(() => animate(), { passive: true });

  coreProperties
    .add(params, "particleCount")
    .min(0)
    .max(preset.core.particleCount)
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
  movementProperties.add(params, "noiseX").min(-100000).max(100000).step(0.001);
  movementProperties.add(params, "noiseY").min(-100000).max(100000).step(0.001);
  movementProperties.add(params, "noiseZ").min(-100000).max(100000).step(0.001);
  movementProperties
    .add(params, "amplitudeX")
    .min(-10000)
    .max(10000)
    .step(0.001);
  movementProperties
    .add(params, "amplitudeY")
    .min(-10000)
    .max(10000)
    .step(0.001);
  movementProperties
    .add(params, "amplitudeZ")
    .min(-10000)
    .max(10000)
    .step(0.001);
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
