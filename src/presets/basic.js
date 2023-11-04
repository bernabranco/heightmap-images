export const traits = {
  core: {
    animate: false,
    particleCount: Math.pow(2, 16),
    particleSize: 5,
    particleSpeed: 1,
  },
  position: {
    offsetX: 1,
    offsetY: 1,
    offsetZ: 1,
  },
  movement: {
    noiseX: 0,
    noiseY: 0,
    noiseZ: 0,
    amplitudeX: 0,
    amplitudeY: 0,
    amplitudeZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  },
  postProcessing: {
    enableComposer: true,
    exposure: 0,
    bloomStrength: 0,
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
    soundIntensity: 1,
  },
  camera: {
    fov: 50,
    near: 1,
    far: 100000,
    zoom: 900,
  },
};
