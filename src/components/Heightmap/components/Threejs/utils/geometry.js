import * as THREE from "three";

export function createBufferGeometry(positions, colors, sizes, acc) {
  console.log("create buffer geometry");

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3).setUsage(
      THREE.DynamicDrawUsage
    )
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage)
  );
  geometry.setAttribute(
    "acceleration",
    new THREE.Float32BufferAttribute(acc, 3).setUsage(THREE.DynamicDrawUsage)
  );

  return geometry;
}
