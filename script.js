import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

function setupThree() {
  const canvas = document.getElementById("canvas");

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

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // 👇 モデル用の変数（外に置くのがポイント）
  let model = null;

  // 👇 ロード
  const loader = new GLTFLoader();
  loader.load('model.glb', (gltf) => {
    model = gltf.scene;

    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    scene.add(model);
  });

  // （デバッグ用キューブ残してもOK）
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);

    // キューブ回転
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // 👇 モデルも回転（ここが今回の核心）
    if (model) {
      model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  }

  animate();
}

window.onload = () => {
  setupThree();
};
