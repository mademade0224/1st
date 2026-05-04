import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// 🔒 1回しか起動させないフラグ
let isThreeRunning = false;

function setupModal() {
  const btn = document.getElementById("openModal");
  const modal = document.getElementById("modal");
  const close = document.getElementById("closeModal");

  if (!btn || !modal || !close) return;

  btn.onclick = () => modal.style.display = "block";
  close.onclick = () => modal.style.display = "none";

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}

function controlModalButton() {
  const btn = document.getElementById("openModal");
  const navbar = document.getElementById("navbar");

  if (!btn || !navbar) return;

  function updatePosition() {
    const rect = navbar.getBoundingClientRect();

    if (window.scrollY < 10) {
      btn.style.top = rect.bottom + 20 + "px";
    } else {
      btn.style.top = "20px";
    }
  }

  updatePosition();
  window.addEventListener("scroll", updatePosition);
}

function setupToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function setupThree() {
  
  fetch('model.glb')
  .then(res => console.log("status:", res.status, "type:", res.headers.get("content-type")));
  .then(res => res.text())
  .then(text => console.log(text.slice(0, 50)));
  
  if (isThreeRunning) return;
  isThreeRunning = true;

  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 2);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // 🧊 キューブ（比較用に残してOK）
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x00ffcc })
  );
  scene.add(cube);

  // 🧍 GLBモデル読み込み
  const loader = new GLTFLoader();

  loader.load(
    'model.glb', // ←パス注意

    (gltf) => {
      const model = gltf.scene;

      model.scale.set(1, 1, 1); // サイズ調整
      model.position.set(0, 0, 0);

      scene.add(model);
    },

    undefined,

    (error) => {
      console.error("GLB読み込みエラー:", error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

// 初期化
window.addEventListener("DOMContentLoaded", () => {
  setupThree();
  setupModal();
  setupToTop();
  controlModalButton();
});
