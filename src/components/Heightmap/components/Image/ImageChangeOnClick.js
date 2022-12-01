import * as imageManipulate from './ImageManipulate';
import * as traits from "../../../../utils/Traits";

const LIST_SIZE = traits.image_list_size;

export function changeImage(e, imagesData, positions, colors, mesh) {
  console.log("change image");
  let selectedImage;
  console.log(imagesData);
  for (let i = 0; i <= imagesData.length; i++) {
    if (e.target.id === `image${i}`) {
      selectedImage = imagesData[i].data;
    }
  }
  imageManipulate.updateMeshGeometryProperties(selectedImage, positions, colors, mesh);
}

// change image by clicking on it
export function changeImageOnClick(imagesData, positions, colors, mesh) {
  for (let i = 0; i < LIST_SIZE; i++) {
    const image = document.getElementById(`image${i}`);
    image.onclick = (e) => changeImage(e, imagesData, positions, colors, mesh);
  }
}
