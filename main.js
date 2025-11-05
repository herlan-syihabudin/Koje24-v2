<script>
// ==========================================================
// KOJE24 • INTERACTIVE SCRIPT
// Author: Herlan Syihabudin & Tom | 2025
// ==========================================================

// KONFIGURASI NOMOR WA
const WA_PHONE = "6282213139580";

// ======================== PRODUK ===========================
const cart = {};
const cartBar = document.getElementById("cart-bar");
const cartInfo = document.getElementById("cart-info");
const checkoutBtn = document.getElementById("checkout-wa");
const productGrid = document.getElementById("product-grid");

// Tambahkan label Best Seller otomatis
document.querySelectorAll("#product-grid .card").forEach(card => {
  const badge = card.dataset.badge;
  if (badge) {
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = badge;
    label.style.position = "absolute";
    label.style.top = "12px";
    label.style.left = "12px";
    label.style.background = "#0B4B50";
    label.style.color = "#fff";
    label.style.fontSize = "12px";
    label.style.padding = "4px 8px";
    label.style.borderRadius = "6px";
    card.appendChild(label);
  }
});

// Tombol Tambah Produk
document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = btn.dataset.id;
    const card = btn.closest(".card");
    const name = card.querySelector("h3").textContent;
    const price = parseInt(card.querySelector(".price").textContent.replace(/\D/g, ""));
    
    // Jika belum ada qty, buat baru
    if (!cart[id]) {
      cart[id] = { name, price, qty: 1 };
      showQtyButton(btn, id);
    } else {
      cart[id].qty++;
      updateQtyDisplay(id);
    }
    updateCartBar();
  });
});

// ==================== QTY COUNTER ===========================
function showQtyButton(button, id) {
  const qtyWrapper = document.createElement("div");
  qtyWrapper.className = "qty-box";
  qtyWrapper.style.display = "flex";
  qtyWrapper.style.alignItems = "center";
  qtyWrapper.style.gap = "10px";
  qtyWrapper.style.marginTop = "10px";

  const minus = document.createElement("button");
  minus.textContent = "−";
  minus.style.padding = "6px 10px";
  minus.style.fontSize = "18px";
  minus.style.border = "1px solid #ccc";
  minus.style.borderRadius = "8px";
  minus.style.cursor = "pointer";

  const qty = document.createElement("span");
  qty.className = "qty-value";
  qty.textContent = "1";
  qty.style.fontWeight = "700";
  qty.style.minWidth = "20px";
  qty.style.textAlign = "center";

  const plus = document.createElement("button");
  plus.textContent = "+";
  plus.style.padding = "6px 10px";
  plus.style.fontSize = "18px";
  plus.style.border = "1px solid #ccc";
  plus.style.borderRadius = "8px";
  plus.style.cursor = "pointer";

  const wrapper = button.parentElement;
  wrapper.replaceChild(qtyWrapper, button);
  qtyWrapper.append(minus, qty, plus);

  plus.addEventListener("click", () => {
    cart[id].qty++;
    updateQtyDisplay(id);
    updateCartBar();
  });

  minus.addEventListener("click", () => {
    cart[id].qty--;
    if (cart[id].qty <= 0) {
      delete cart[id];
      wrapper.replaceChild(button, qtyWrapper);
    } else {
      updateQtyDisplay(id);
    }
    updateCartBar();
  });
}

function updateQtyDisplay(id) {
  const card = document.querySelector(`.add-btn[data-id='${id}']`)?.closest(".card");
  if (!card) return;
  const qtyValue = card.querySelector(".qty-value");
  if (qtyValue) qtyValue.textContent = cart[id].qty;
}

// ==================== UPDATE TOTAL ==========================
function updateCartBar() {
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalHarga = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  if (totalItems > 0) {
    cartBar.style.display = "flex";
    cartInfo.textContent = `${totalItems} item • Rp ${totalHarga.toLocaleString("id-ID")}`;
  } else {
    cartBar.style.display = "none";
  }
}

// ==================== CHECKOUT VIA WA =======================
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) return alert("Belum ada produk di keranjang.");
  let pesan = "Halo KOJE24! Saya ingin memesan:\n";
  Object.values(cart).forEach(item => {
    pesan += `- ${item.name} x${item.qty} = Rp${(item.qty * item.price).toLocaleString("id-ID")}\n`;
  });
  const totalHarga = Object.values(cart).reduce((sum, i) => sum + i.qty * i.price, 0);
  pesan += `\nTotal: Rp${totalHarga.toLocaleString("id-ID")}`;
  window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(pesan)}`, "_blank");
});

// ==================== HERO CTA ==============================
document.getElementById("cta-try").addEventListener("click", () => {
  document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("cta-learn").addEventListener("click", () => {
  document.getElementById("artikel").scrollIntoView({ behavior: "smooth" });
});

// ==================== TESTIMONI FORM ========================
const testiForm = document.getElementById("testi-form");
if (testiForm) {
  testiForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Terima kasih! Testimoni kamu sudah terkirim ❤️");
    testiForm.reset();
  });
}
</script>
