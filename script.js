import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

function setupThree() {
  const canvas = document.getElementById("canvas");

  // 🛑 ここチェック
  if (!canvas) {
    console.error("canvasが見つからない");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x111111);

  const camera = new THREE.PerspectiveCamera(75, 400/300, 0.1, 1000);
  camera.position.z = 5;

  renderer.setSize(400, 300);

  // 🌞 ライト（OK）
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // 🧊 オブジェクト（OK）
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}

// 🔥 ここ重要（起動）
window.onload = () => {
  setupThree();
};
