import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 🔒 1回しか起動させないフラグ
let isThreeRunning = false;

function setupModal() {
  const btn = document.getElementById("openModal");
  const modal = document.getElementById("modal");
  const close = document.getElementById("closeModal");

  if (!btn || !modal || !close) return;

  btn.onclick = () => {
    modal.style.display = "block";
  };

  close.onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

function controlModalButton() {
  const btn = document.getElementById("openModal");
  const navbar = document.getElementById("navbar");

  if (!btn || !navbar) return;

  function updatePosition() {
    const navHeight = navbar.offsetHeight;

    if (window.scrollY < 10) { // ←ゆるく判定
      btn.style.top = navHeight + 10 + "px";
    } else {
      btn.style.top = "20px";
    }
  }

  // 初期位置もちゃんと設定
  updatePosition();

  // スクロールで更新
  window.addEventListener("scroll", updatePosition);
}

function setupToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  btn.onclick = () => {
    console.log("クリックされた！");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
}

function setupThree() {

  // 🛑 2回目以降は止める
  if (isThreeRunning) return;
  isThreeRunning = true;

  const canvas = document.getElementById("canvas");

  if (!canvas) {
    console.error("canvasが見つからない");
    return;
  }

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

  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

// ✅ ここは1個だけ
window.addEventListener("DOMContentLoaded", () => {
  setupThree();
  setupModal();
  setupToTop();
  controlModalButton();
});
