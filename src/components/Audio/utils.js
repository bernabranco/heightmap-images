import { preset } from "../../presets/choosePreset";
import { changeImage } from "../Image/ImageChangeOnClick";
const traits = require(`../../presets/${preset}`);

const LIST_SIZE = traits.image_list_size;

// switch images based on volume
export const switchImageBasedOnAudioVolume = (
  frequency,
  volume,
  imagesData,
  positions,
  colors,
  meshes
) => {
  if (volume >= frequency) {
    changeImage(imagesData, positions, colors, meshes);
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
