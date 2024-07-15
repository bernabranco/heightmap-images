export const traits = {
  core: {
    animate: true,
    particleCount: 65536,
    particleSize: 28.8,
    particleSpeed: 1,
    fps: 1,
  },
  position: {
    offsetX: 1,
    offsetY: 1,
    offsetZ: 1,
  },
  movement: {
    noiseX: 0,
    noiseY: 0,
    noiseZ: 700,
    amplitudeX: 0,
    amplitudeY: 1115.609,
    amplitudeZ: 10000,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  },
  postProcessing: {
    enableComposer: true,
    exposure: 0.5,
    bloomStrength: 0.5,
    bloomThreshold: 0,
    bloomRadius: 1,
  },
  color: {
    backgroundColor: "#000000",
    colorContrast: 1,
    vertexRed: 1,
    vertexGreen: 1,
    vertexBlue: 1,
  },
  sound: {
    soundIntensity: 0.1,
  },
  camera: {
    fov: 50,
    near: 1,
    far: 100000,
    zoom: 900,
  },
};
