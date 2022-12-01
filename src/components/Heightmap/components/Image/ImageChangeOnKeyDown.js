import * as imageManipulate from './ImageManipulate';
import * as traits from '../../../../utils/Traits.js'

export function changeImageOnPress(imageId, imagesData, positions, colors, mesh) {
  console.log("change image on press");
  let selectedImage = imagesData[imageId].data;
  imageManipulate.updateMeshGeometryProperties(selectedImage, positions, colors, mesh);
}

// change displayed images when key is pressed
export const changeImageOnKeyDown = (imageId, imagesData, positions, colors, mesh) => {
    document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 37:
          if(imageId > 0){
            // left arrow
            imageId -= 1;
            changeImageOnPress(imageId, imagesData, positions, colors, mesh);
            console.log('key left pressed...')
          }
          break;
          case 39:
          if(imageId < traits.image_list_size - 1){
            // right arrow
            imageId += 1;
            changeImageOnPress(imageId, imagesData, positions, colors, mesh);
            console.log('key right pressed...')
          }
          break;
          default:
          imageId=0;
          break;
      }
    }
}