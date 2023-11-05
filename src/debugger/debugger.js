export const debugThreejs = (
  imagesData,
  positions,
  colors,
  geometry,
  material,
  mesh,
  posenetValues
) => {
  console.log({ imagesData: imagesData });

  console.log({ vertex_positions: positions });

  console.log({ vertex_colors: colors });

  console.log({ geometry: geometry });

  console.log({ material: material });

  console.log({ mesh: mesh });

  console.log({ posenetValues: posenetValues });
};
