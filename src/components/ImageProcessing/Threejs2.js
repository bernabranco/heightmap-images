// Threejs Stuff
import * as THREE from "three";
import { useEffect } from "react";
import { createRandomHex } from "../../../../utils/OpenFullscreen";

export default function Threejs() {
  useEffect(() => {
    three();
  }, []);

  return <></>;
}

const three = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let geometry, material, object;

  for (let i = 0; i < 10; i++) {
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: createRandomHex() });
    object = new THREE.Mesh(geometry, material);

    //object.position.x =
      //Math.random() * window.innerWidth - window.innerWidth / 2;
    // object.position.y = Math.random() * 10;
    // object.position.z = Math.random() * 10;

    scene.add(object);
  }

  function animate() {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
};
