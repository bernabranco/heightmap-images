import * as traits from "../../../../utils/Traits";

const LIST_SIZE = traits.image_list_size;

// change image by clicking on it
export function changeImageOnClick(imagesData, positions, colors, mesh) {
  for (let i = 0; i < LIST_SIZE; i++) {
    const image = document.getElementById(`image${i}`);
    image.onclick = (e) => changeImage(e, imagesData, positions, colors, mesh);
  }
}

export function changeImage(e, imagesData, positions, colors, mesh) {
  console.log("change image");
  let selectedImage;
  console.log(imagesData);
  for (let i = 0; i <= imagesData.length; i++) {
    if (e.target.id === `image${i}`) {
      selectedImage = imagesData[i].data;
    }
  }

  let colorIndex = 0;
  let positionIndex = 0;
  for (let i = 0; i < colors.length; i++) {
    const r = selectedImage[colorIndex + 0] / 255;
    const g = selectedImage[colorIndex + 1] / 255;
    const b = selectedImage[colorIndex + 2] / 255;
    mesh.geometry.attributes.color.setXYZ(i, r, g, b);
    const x = positions[positionIndex + 0];
    const y = positions[positionIndex + 1];
    const z = 1.0 + r + g + b;
    mesh.geometry.attributes.position.setXYZ(i, x, y, z);
    colorIndex += 4;
    positionIndex += 3;
  }
}

export function changeVideoFrames(
  imagesData,
  positions,
  colors,
  mesh,
  counter
) {
  let colorIndex = 0;
  let positionIndex = 0;
  let selectedImage = imagesData[counter].data;
  for (let i = 0; i < colors.length; i++) {
    const r = selectedImage[colorIndex + 0] / 255;
    const g = selectedImage[colorIndex + 1] / 255;
    const b = selectedImage[colorIndex + 2] / 255;
    const x = positions[positionIndex + 0];
    const y = positions[positionIndex + 1];
    const z = 1.0 + r + g + b;
    mesh.geometry.attributes.position.setXYZ(i, x, y, z);
    positionIndex += 3;
    mesh.geometry.attributes.color.setXYZ(i, r, g, b);
    colorIndex += 4;
  }
}
