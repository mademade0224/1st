import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

function setupModal() {
  const btn = document.getElementById("openModal");
  const modal = document.getElementById("modal");
  const modal = document.getElementById("closeModal");
  
  if (!btn || !modal || !close) return;

  btn.onclick = () => {
    modal.style.display = "block";
  };
}

  // ✖で閉じる
  close.onclick = () => {
    modal.style.display = "none";
  };

  // 背景クリックでも閉じる（ちょい神機能）
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }

function setupThree() {
  const canvas = document.getElementById("canvas");

  if (!canvas) {
    console.error("canvasが見つからない");
    return;
  }

  // レンダラー
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // シーン
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // カメラ
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // ライト（ちょい豪華に）
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 2);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // キューブ
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // アニメーション
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // リサイズ対応（これ超大事）
  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

window.addEventListener("DOMContentLoaded", setupThree);
window.addEventListener("DOMContentLoaded", () => {
  setupThree();
  setupModal(); // ←復活
});
