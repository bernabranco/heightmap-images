import { preset } from "../../presets/preset";

const imgWidth = Math.pow(preset.core.particleCount, 0.5);
const imgHeight = Math.pow(preset.core.particleCount, 0.5);

// create 2D grid based on the color of the first image of the list
export function createGrid(imagesData, positions, colors, sizes, acc) {
  let j = 0;

  console.log({ imagesData: imagesData });

  const imageData = imagesData[0];

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
        (x - imgWidth * 0.5) * preset.position.offsetX,
        (y - imgHeight * 0.5) * preset.position.offsetY,
        1.0 * (r + g + b)
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
