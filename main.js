document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".order");
  btn.addEventListener("click", () => {
    const message = encodeURIComponent("Halo KOJE24 🍹 Saya ingin pesan Green Detox!");
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  });
});
