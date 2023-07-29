import { preset } from "../../presets/choosePreset";
const traits = require(`../../presets/${preset}`);

const imgWidth = Math.pow(traits.vertex_number, 0.5);
const imgHeight = Math.pow(traits.vertex_number, 0.5);

// create 2D grid based on the color of the first image of the list
export function createGrid(imagesData, positions, colors, sizes, acc) {
  let j = 0;
  const imageData = imagesData[0];

  console.log(imagesData);

  for (let x = 0; x < imgWidth; x++) {
    for (let y = 0; y < imgHeight; y++) {
      //define particle color
      const r = imageData.data[j + 0] / 255;
      const g = imageData.data[j + 1] / 255;
      const b = imageData.data[j + 2] / 255;
      colors.push(r, g, b);

      //define particle sizes
      sizes.push(1);

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
