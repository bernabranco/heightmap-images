export const traits = {
  core: {
    animate: true,
    particleCount: 1000000,
    particleSize: 6,
    particleSpeed: 0.05,
  },
  position: {
    offsetX: 1,
    offsetY: 1,
    offsetZ: 0,
  },
  movement: {
    noiseX: 150,
    noiseY: 150,
    noiseZ: 0,
    amplitudeX: 0.05,
    amplitudeY: 0.005,
    amplitudeZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  },
  postProcessing: {
    enableComposer: true,
    exposure: 0,
    bloomStrength: 0.7000000000000001,
    bloomThreshold: 0,
    bloomRadius: 0,
  },
  color: {
    backgroundColor: "#000000",
    colorContrast: 1,
    vertexRed: 1,
    vertexGreen: 1,
    vertexBlue: 1,
  },
  sound: {
    soundIntensity: 0,
  },
  camera: {
    fov: 50,
    near: 1,
    far: 100000,
    zoom: 900,
  },
};
