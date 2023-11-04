import * as gui from "../../../../Gui/Gui";

const getPresetProperties = () => {
  return `
To save your new preset:
- Create a file inside presets folder (ex: preset1.js)
- Copy object bellow
- Paste it in the newly created file
- Change import inside preset.js to use new preset

export const traits = {
  core: {
    animate: ${gui.params.animate},
    particleCount: ${gui.params.particleCount},
    particleSize: ${gui.params.particleSize},
    particleSpeed: ${gui.params.particleSpeed},
  },
  position: {
    offsetX:  ${gui.params.offsetX},
    offsetY:  ${gui.params.offsetY},
    offsetZ:  ${gui.params.offsetZ},
  },
  movement: {
    noiseX: ${gui.params.noiseX},
    noiseY: ${gui.params.noiseY},
    noiseZ: ${gui.params.noiseZ},
    amplitudeX: ${gui.params.amplitudeX},
    amplitudeY: ${gui.params.amplitudeY},
    amplitudeZ: ${gui.params.amplitudeZ},
    rotationX: ${gui.params.rotationX},
    rotationY: ${gui.params.rotationY},
    rotationZ: ${gui.params.rotationZ},
  },
  postProcessing: {
    enableComposer: ${gui.params.enableComposer},
    exposure: ${gui.params.exposure},
    bloomStrength: ${gui.params.bloomStrength},
    bloomThreshold: ${gui.params.bloomThreshold},
    bloomRadius: ${gui.params.bloomRadius},
  },
  color: {
    backgroundColor: ${gui.params.backgroundColor},
    colorContrast: ${gui.params.colorContrast},
    vertexRed: ${gui.params.vertexRed},
    vertexGreen: ${gui.params.vertexGreen},
    vertexBlue: ${gui.params.vertexBlue},
  },
  sound: {
    soundIntensity: ${gui.params.soundIntensity},
  },
  camera: {
    fov: 50,
    near: 1,
    far: 100000,
    zoom: 900,
  },
};
`;
};

export function exportPreset() {
  const values = getPresetProperties();
  var FileSaver = require("file-saver");
  var blob = new Blob([values], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "preset-1.js");
}
