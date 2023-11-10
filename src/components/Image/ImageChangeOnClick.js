import * as imageManipulate from "./ImageManipulate";

export function changeImageWithClick(e, imagesData, positions, colors, meshes) {
  let selectedImage;
  for (let i = 0; i <= imagesData.length; i++) {
    if (e.target.id === `image${i}`) {
      selectedImage = imagesData[i].data;
    }
  }

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
