import * as imageManipulate from "../Heightmap/components/Image/ImageManipulate";

// switch images based on volume
export const switchImageBasedOnAudioVolume = (
  frequency,
  volume,
  imagesData,
  positions,
  colors,
  mesh
) => {
  if (volume >= frequency) {
    imageManipulate.changeImageFrames(imagesData, positions, colors, mesh);
  }
};

// amplify particle size based on volume
export const changeParticleSizeBasedOnAudioVolume = (
  volume,
  particleSize,
  guiParticleSize
) => {
  particleSize = guiParticleSize * volume;
};
