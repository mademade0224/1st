   const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");

    openBtn.onclick = () => modal.style.display = "block";
    closeBtn.onclick = () => modal.style.display = "none";

    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };

let progress = 0;
const bar = document.getElementById("progress");

const interval = setInterval(() => {
  progress += Math.random() * 10; // ちょっとずつ進む
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);

    // 完了したら消す
    document.getElementById("loader").style.display = "none";
  }
  bar.style.width = progress + "%";
}, 200);
