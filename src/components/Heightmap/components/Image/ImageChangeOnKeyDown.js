
import * as imageManipulate from "./ImageManipulate";

import { preset } from "../../../../presets/choosePreset";
const traits = require(`../../../../presets/${preset}`);

export function changeImageOnPress(
  imageId,
  imagesData,
  positions,
  colors,
  mesh
) {
  console.log("change image on press");
  let selectedImage = imagesData[imageId].data;
  imageManipulate.updateMeshGeometryProperties(
    selectedImage,
    positions,
    colors,
    mesh
  );
}

// change displayed images when key is pressed
export const changeImageOnKeyDown = (
  imageId,
  imagesData,
  positions,
  colors,
  mesh
) => {
  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowLeft":
        if (imageId > 0) {
          imageId -= 1;
          changeImageOnPress(imageId, imagesData, positions, colors, mesh);
          console.log("key left pressed...");
        }
        break;
      case "ArrowUp":
        if (imageId < traits.image_list_size - 1) {
          imageId += 1;
          changeImageOnPress(imageId, imagesData, positions, colors, mesh);
          console.log("key left pressed...");
        }
        break;
      case "ArrowRight":
        if (imageId < traits.image_list_size - 1) {
          imageId += 1;
          changeImageOnPress(imageId, imagesData, positions, colors, mesh);
          console.log("key right pressed...");
        }
        break;
      case "ArrowDown":
        if (imageId > 0) {
          imageId -= 1;
          changeImageOnPress(imageId, imagesData, positions, colors, mesh);
          console.log("key right pressed...");
        }
        break;
      default:
        imageId = 0;
        break;
    }
  };
};
