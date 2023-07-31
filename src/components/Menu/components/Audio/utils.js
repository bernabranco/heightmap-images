import { changeImage } from "../../../Image/ImageChangeOnClick";

export const switchImageBasedOnAudioVolume = (
  intensity,
  volume,
  imagesData,
  positions,
  colors,
  meshes
) => {
  if (volume >= intensity) {
    changeImage(imagesData, positions, colors, meshes);
  }
};

export const changeParticleSizeBasedOnAudioVolume = (
  volume,
  particleSize,
  guiParticleSize
) => {
  particleSize = guiParticleSize * volume;
};
