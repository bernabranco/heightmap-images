import * as imageManipulate from "./ImageManipulate";

import { preset } from "../../presets/choosePreset";
const traits = require(`../../presets/${preset}`);

const LIST_SIZE = traits.image_list_size;

export function changeImageWithClick(e, imagesData, positions, colors, meshes) {
  console.log("change image with click");
  let selectedImage;
  for (let i = 0; i <= imagesData.length; i++) {
    if (e.target.id === `image${i}`) {
      selectedImage = imagesData[i].data;
    }
  }

  console.log("enter update mesh geometry properties");
  imageManipulate.updateMeshGeometryProperties(
    selectedImage,
    positions,
    colors,
    meshes
  );
}

export function changeImage(
  imagesData,
  imagesLength,
  positions,
  colors,
  meshes
) {
  let imageIndex = parseInt(Math.random() * imagesLength);
  let selectedImage = imagesData[imageIndex].data;
  imageManipulate.updateMeshGeometryProperties(
    selectedImage,
    positions,
    colors,
    meshes
  );
}

// change image by clicking on it
export function changeImageOnClick(
  imagesData,
  imagesLength,
  positions,
  colors,
  meshes
) {
  for (let i = 0; i < imagesLength; i++) {
    const image = document.getElementById(`image${i}`);
    image.onclick = (e) =>
      changeImageWithClick(e, imagesData, positions, colors, meshes);
  }
}
