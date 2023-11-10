import * as imageManipulate from "./ImageManipulate";

export const changeImageOnKeyDown = (
  imageId,
  imagesData,
  imagesLength,
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
        if (imageId < imagesLength - 1) {
          imageId += 1;
          changeImageOnPress(imageId, imagesData, positions, colors, mesh);
          console.log("key left pressed...");
        }
        break;
      case "ArrowRight":
        if (imageId < imagesLength - 1) {
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

export function changeImageOnPress(
  imageId,
  imagesData,
  positions,
  colors,
  mesh
) {
  let selectedImage = imagesData[imageId].data;
  imageManipulate.updateMeshGeometryProperties(
    selectedImage,
    positions,
    colors,
    mesh
  );
}
