import * as THREE from "three";
import * as traits from "../../../utils/Traits";

const steps_x = traits.vertex_steps_x;
const steps_y = traits.vertex_steps_y;
const steps_z = traits.vertex_steps_z;
const offset_x = traits.vertex_offset_x;
const offset_y = traits.vertex_offset_y;
const offset_z = traits.vertex_offset_z;

const r = 1.0;
const g = 1.0;
const b = 1.0;

// Create 2D grid based on manual colors
export function createGrid2d(imageData, positions, colors, sizes) {
  console.log("create grid 2d");
  let j = 0;
  const xCount = Math.pow(traits.vertex_number, 1 / 2);
  const yCount = Math.pow(traits.vertex_number, 1 / 2);
  let color = new THREE.Vector3();
  for (let x = 0; x < xCount; x += steps_x) {
    for (let y = 0; y < yCount; y += steps_y) {
      positions.push((x - xCount / 2) * offset_x);
      positions.push((y - yCount / 2) * offset_y);
      positions.push(0);

      const r = imageData.data[j + 0] / 255;
      const g = imageData.data[j + 1] / 255;
      const b = imageData.data[j + 2] / 255;
      colors.push(r, g, b);

      sizes.push(1);

      j += 4;
    }
  }
}

