export const updateMeshGeometryProperties = (selectedImage, positions, colors, mesh) => {
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
  let selectedImage = imagesData[counter].data;
  updateMeshGeometryProperties(selectedImage, positions, colors, mesh);
}
