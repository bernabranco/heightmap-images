import { GUI } from "dat.gui";
import * as traits from "../../../../utils/Traits";

export const params = {
  enableComposer: false,
  animate: true,
  particleCount: traits.vertex_number,
  particleSize: traits.vertex_size,
  soundWave: 1.0,
  particleSpeed: 1,
  colorContrast: 1.0,
  offsetX: 1,
  offsetY: 1,
  offsetZ: 1,
  noiseX: 0,
  noiseY: 0,
  noiseZ: 0,
  amplitudeX: 0,
  amplitudeY: 0,
  amplitudeZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  exposure: 0,
  bloomStrength: 0,
  bloomThreshold: 0,
  bloomRadius: Math.random() * 1,
  backgroundColor: "#000000",
  vertexRed: 1,
  vertexGreen: 1,
  vertexBlue: 1,
  soundIntensity: 1,
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

  const folder1 = gui.addFolder("Core Properties");
  folder1
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
  folder1.add(params, "particleSize").min(-100).max(100).step(0.01);
  folder1.add(params, "particleSpeed").min(-10).max(10).step(0.01);

  const folder2 = gui.addFolder("Position");
  folder2.add(params, "offsetX").min(-100).max(100).step(0.01);
  folder2.add(params, "offsetY").min(-100).max(100).step(0.01);
  folder2.add(params, "offsetZ").min(-100).max(100).step(0.01);

  const folder3 = gui.addFolder("Movement");
  folder3.add(params, "noiseX").min(-1).max(1).step(0.001);
  folder3.add(params, "noiseY").min(-1).max(1).step(0.001);
  folder3.add(params, "noiseZ").min(-1).max(1).step(0.001);
  folder3.add(params, "amplitudeX").min(-100).max(100).step(0.001);
  folder3.add(params, "amplitudeY").min(-100).max(100).step(0.001);
  folder3.add(params, "amplitudeZ").min(-100).max(100).step(0.001);
  folder3.add(params, "rotationX").min(-0.1).max(0.1).step(0.001);
  folder3.add(params, "rotationY").min(-0.1).max(0.1).step(0.001);
  folder3.add(params, "rotationZ").min(-0.1).max(0.1).step(0.001);

  const folder4 = gui.addFolder("Color");
  folder4.addColor(params, "backgroundColor").onChange(
    function (value) {
      scene.background.set(value);
    },
    { passive: true }
  );
  folder4.add(params, "vertexRed").min(-10).max(10).step(0.001);
  folder4.add(params, "vertexGreen").min(-10).max(10).step(0.001);
  folder4.add(params, "vertexBlue").min(-10).max(10).step(0.001);
  folder4.add(params, "colorContrast").min(0).max(5).step(0.001);

  const folder5 = gui.addFolder("Sound");
  folder5.add(params, "soundIntensity").min(-100).max(100).step(0.01);

  const folder6 = gui.addFolder("Post Processing");
  folder6.add(params, "enableComposer");
  //folder6.add(afterimagePass.uniforms["damp"], "value", 0, 1).step(0.001);
  folder6.add(params, "exposure", 0, 1, 0.001).onChange(
    function (value) {
      renderer.toneMappingExposure = Number(value);
    },
    { passive: true }
  );

  folder6
    .add(params, "bloomStrength", 0.0, 10.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.strength = Number(value);
      },
      { passive: true }
    );

  folder6
    .add(params, "bloomThreshold", 0.0, 1.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.threshold = Number(value);
      },
      { passive: true }
    );

  folder6
    .add(params, "bloomRadius", 0.0, 1.0)
    .step(0.001)
    .onChange(
      function (value) {
        bloomPass.radius = Number(value);
      },
      { passive: true }
    );

  folder6.add(params, "animate").onChange(() => animate(), { passive: true });
}
