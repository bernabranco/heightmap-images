import * as traits from "../../../../utils/Traits";

const LIST_SIZE = traits.image_list_size;
const imgWidth = Math.pow(traits.vertex_number, 0.5);
const imgHeight = Math.pow(traits.vertex_number, 0.5);

// create bank of images
let texture;
let images = [];
for (var i = 0; i < LIST_SIZE; i++) {
  texture = window.location.origin + `/images/${i}.jpg`;
  var imgSrc = texture;
  var img = new Image();
  img.src = imgSrc;
  images.push(img);
}

// analyze image data
export const analyzeImages = () => {
  let imagesData = [];

  for (var i = 0; i < LIST_SIZE; i++) {
    // Create canvas
    var canvas = document.createElement("canvas");
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    document.body.appendChild(canvas);

    // Draw image
    var ctx = canvas.getContext("2d");
    ctx.drawImage(images[i], 0, 0, imgWidth, imgHeight);

    // Store image pixel colors
    const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    imagesData.push(imgData);

    // Remove unnecessary canvas
    document.body.removeChild(canvas);
  }

  return imagesData;
};

// create 2D grid based on the color of the first image of the list
export function createGrid(imagesData, positions, colors, sizes, acc) {
  let j = 0;
  const imageData = imagesData[0];

  for (let x = 0; x < imgWidth; x++) {
    for (let y = 0; y < imgHeight; y++) {
      //define particle color
      const r = imageData.data[j + 0] / 255;
      const g = imageData.data[j + 1] / 255;
      const b = imageData.data[j + 2] / 255;
      colors.push(r, g, b);

      //define particle sizes
      sizes.push(traits.vertex_size);

      //define particle position
      positions.push(
        x * traits.vertex_offset_x - imgWidth * 0.5 * traits.vertex_offset_x,
        y * traits.vertex_offset_y - imgHeight * 0.5 * traits.vertex_offset_y,
        1.0 + (r + g + b)
      );

      // define particle acceleration
      acc.push(
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000
      );

      //each particle has 4 color dimensions (rgba)
      j += 4;
    }
  }
}
