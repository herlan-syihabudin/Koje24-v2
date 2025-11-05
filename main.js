/* ================== DATA PRODUK ================== */
const PRODUCTS = [
  {id:"Detox",img:"https://lh3.googleusercontent.com/pw/AP1GczNE0XAeW26Ta9kYlidKKY-5q2QV4rgZd5PjqsQSWPw5VD_usHrjSS68VE0JHl6Lr9sW8BdtwixaEht5mvYao6xYNmzpiXsxsxQ2WK0mJWH9SWU8XdVs4R-uFEmqXGW4G5rSpx9eXG8laTwK2Hy8jWKE=w864-h1184-s-no-gm?authuser=0",desc:"Kunyit, jahe, jeruk nipis, lemon — detoks & pencernaan.",price:18000,best:true},
  {id:"Sunrise",img:"https://lh3.googleusercontent.com/pw/AP1GczOZwQWpT1rDVW6-L4JraqEADaGbI57Dxwj1ihp7cRIMHvHIk-Z4iaYz9DNNil-SHSzgFTf5AA315651PsGX7OhWVIUyGZSJuCWxtTSOZN_4frLtqSYVrQct-ufqI4d4VSmwou3IJteH5ZDaaU-V285O=w1038-h1280-s-no-gm?authuser=0",desc:"Kunyit, jahe, nanas, jeruk — segarkan pagi & imun.",price:18000,best:true},
  {id:"Beetroot",img:"https://lh3.googleusercontent.com/pw/AP1GczNrJAzD7W_c0_405dYBcXsT7fje8LbvmWkvlGhbCIr8VomH5UAzjO12eD8QMn3lQ_SYEa1gcBSZqWutgMs66js67Gmiv1_FTAFygRMwEHByl-T2_vPOTZp9MMLlCpg6uhV9NxsivGp9qLicdQzDVcqB=w1018-h1280-s-no-gm?authuser=0",desc:"Bit merah, apel, wortel — stamina & sirkulasi.",price:18000,best:true},
  {id:"Green Energy",img:"https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1400&auto=format&fit=crop",desc:"Sawi hijau, apel, nanas & lemon — energi & serat.",price:18000},
  {id:"Celery",img:"https://lh3.googleusercontent.com/pw/AP1GczPKlgkYAqSZk-v_NnLXN8uRdjlO7vE3HrSpelIWzMNsSXR5mAeplzXhOPySm2V8XmCrA6YvnMDNkK9Zm-8kI-3XFxP33O9u2EHTy5GIQujfm8FEiFguBjsCirzuKqpIjqe6rlrHXxrwgt2V_NNwgQt-=w747-h954-s-no-gm?authuser=0",desc:"Seledri, apel hijau, lemon — segar & ringan.",price:18000},
  {id:"Immune Boost",img:"https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1400&auto=format&fit=crop",desc:"Jeruk, jahe, madu — bantu daya tahan tubuh.",price:18000},
  {id:"Red Power",img:"https://images.unsplash.com/photo-1542442828-287225d7aa7a?q=80&w=1400&auto=format&fit=crop",desc:"Bit, apel, jeruk, jahe — stamina & vitalitas.",price:18000},
  {id:"Golden Tonic",img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1400&auto=format&fit=crop",desc:"Kunyit, serai, jahe — anti radang & imun booster.",price:18000}
];

/* ================== RENDER PRODUK ================== */
function renderProducts() {
  const wrap = document.getElementById('best-list');
  if (!wrap) return;

  wrap.innerHTML = PRODUCTS.map(p => `
    <article class="best-item">
      <div class="img-wrap">
        ${p.best ? '<div class="label-bestseller">🔥 Favorit</div>' : ''}
        <img data-src="${p.img}" alt="${p.id}" />
      </div>
      <div class="best-content">
        <h3>${p.id}</h3>
        <p>${p.desc}</p>
        <div class="best-action">
          <div class="best-price">Rp${p.price.toLocaleString('id-ID')}</div>
          <button class="btn-add" data-id="${p.id}">Tambah</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ================== LAZY IMAGE ================== */
function lazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!('IntersectionObserver' in window)) {
    imgs.forEach(img => { img.src = img.dataset.src; });
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '80px' });
  imgs.forEach(img => io.observe(img));
}

/* ================== MODAL UTILS ================== */
function openModalById(id) {
  document.querySelectorAll('.t-modal').forEach(m => { m.classList.remove('show'); m.style.display = 'none'; });
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = 'flex';
  setTimeout(() => m.classList.add('show'), 10);
  document.body.classList.add('no-scroll');
}
function closeModal(el) {
  const m = el.closest('.t-modal') || el;
  m.classList.remove('show');
  setTimeout(() => {
    m.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }, 200);
}
function bindModals() {
  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModalById(`${btn.dataset.open}-modal`);
    });
  });
  document.querySelectorAll('.t-modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('t-modal') || e.target.classList.contains('t-close')) {
        closeModal(modal);
      }
    });
  });
}

/* ================== CART & TOTAL BAR ================== */
function initCart() {
  const PRICE_FALLBACK = 18000;
  const wa = "6282213139580";
  const cart = {};
  const ensureBar = () => {
    let bar = document.querySelector('.total-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'total-bar';
      bar.innerHTML = `
        <div class="total-text">0 item</div>
        <div class="total-price">Rp0</div>
        <button class="wa-btn">Pesan via WhatsApp</button>`;
      document.body.appendChild(bar);
    }
    return bar;
  };
  const updateBar = () => {
    const items = Object.entries(cart).filter(([_, q]) => q > 0);
    const bar = ensureBar();
    if (!items.length) { bar.classList.remove('show'); return; }
    let totalQty = 0, totalHarga = 0;
    items.forEach(([id, qty]) => {
      totalQty += qty;
      const price = (PRODUCTS.find(p => p.id === id)?.price) || PRICE_FALLBACK;
      totalHarga += qty * price;
    });
    bar.querySelector('.total-text').textContent = `${totalQty} item`;
    bar.querySelector('.total-price').textContent = `Rp${totalHarga.toLocaleString('id-ID')}`;
    const text = [
      "Halo KOJE24, saya mau order:",
      ...items.map(([id, qty]) => {
        const price = (PRODUCTS.find(p => p.id === id)?.price) || PRICE_FALLBACK;
        return `• ${id} x${qty} = Rp${(qty * price).toLocaleString('id-ID')}`;
      }),
      "",
      `Total: Rp${totalHarga.toLocaleString('id-ID')}`,
      "",
      "Nama:",
      "Alamat:"
    ].join("\n");
    bar.querySelector('.wa-btn').onclick = () => {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
    };
    bar.classList.add('show');
  };

  // bind product cards
  document.querySelectorAll('.best-item').forEach(card => {
    const name = card.querySelector('h3')?.textContent.trim();
    const addBtn = card.querySelector('.btn-add');
    if (!name || !addBtn) return;

    // qty UI
    const qtyBox = document.createElement('div');
    qtyBox.className = 'qty-box';
    qtyBox.innerHTML = `<button class="qty-btn minus">−</button><span class="qty-value">1</span><button class="qty-btn plus">+</button>`;
    addBtn.insertAdjacentElement('afterend', qtyBox);

    addBtn.addEventListener('click', () => {
      cart[name] = (cart[name] || 0) + 1;
      qtyBox.classList.add('show');
      qtyBox.querySelector('.qty-value').textContent = cart[name];
      updateBar();
    });

    qtyBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('qty-btn')) return;
      const plus = e.target.classList.contains('plus');
      cart[name] = cart[name] || 0;
      cart[name] += plus ? 1 : -1;
      if (cart[name] <= 0) {
        cart[name] = 0;
        qtyBox.classList.remove('show');
      }
      qtyBox.querySelector('.qty-value').textContent = cart[name];
      updateBar();
    });
  });
}

/* ================== FAQ toggle ================== */
function bindFAQ(scope = document) {
  scope.querySelectorAll('.faq-item .faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.closest('.faq-item');
      const list = q.closest('.faq-list') || scope;
      list.querySelectorAll('.faq-item').forEach(i => { if (i !== parent) i.classList.remove('active'); });
      parent.classList.toggle('active');
    });
  });
}

/* ================== TESTIMONI ================== */
// Ganti dengan Script URL milikmu
const TESTI_LIST_URL = "https://script.google.com/macros/s/AKfycbxsduzm-K-r0Q248h2QOHzwB6_NrYIN-jkz-thvEfbS2CwMVhWeRRoivnOtsPmPcq-t/exec";
const TESTI_POST_URL = "https://script.google.com/macros/s/AKfycbxZ5DWZ0EqiRZAOz0S-IZXoKPqf514WrJReTHpcj_8OLTHuFGnY1QFUTDtIGCbCvpWPkg/exec";

async function loadTestiPreview(limit = 4) {
  const tList = document.getElementById('t-list');
  if (!tList) return;
  try {
    const res = await fetch(TESTI_LIST_URL);
    const data = await res.json();

    const showData = data.filter(d => String(d.ShowOnHome || d.showonhome || d.Showonhome).toUpperCase() === "TRUE");
    const preview = (showData.length ? showData : data).slice(0, limit);

    tList.innerHTML = preview.map(t => `
      <div class="t-card">
        <div class="t-header">
          <strong>${t.Nama || 'Anonim'}</strong> • ${t.Kota || '-'} • <em>${t.Varian || '-'}</em>
        </div>
        <div class="t-rating">${"⭐".repeat(parseInt(t.Rating || 5))}</div>
        <div class="t-msg">"${t.Pesan || ''}"</div>
      </div>
    `).join('');
  } catch (e) {
    tList.innerHTML = `<p class="muted center">Tidak dapat memuat testimoni.</p>`;
  }
}

function bindTestiModals() {
  // tombol di section
  const openBtn = document.getElementById('t-open');
  const formModal = document.getElementById('tModal');
  openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModalById('tModal');
  });

  // tombol lihat semua
  const seeBtn = document.getElementById('seeTestimoniBtn');
  const infoModal = document.getElementById('testimoni-modal');
  const listModal = document.getElementById('testimoni-list-modal');

  seeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModalById('testimoni-modal');
  });

  // tombol "Lihat Semua Testimoni" dalam info modal
  document.getElementById('openListBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(infoModal);
    openModalById('testimoni-list-modal');
  });

  // load data penuh saat list modal dibuka
  const listBox = document.getElementById('t-list-full');
  const obs = new MutationObserver(() => {
    if (listModal.classList.contains('show')) {
      loadAllTestimonials(listBox);
    }
  });
  obs.observe(listModal, { attributes: true, attributeFilter: ['class'] });

  // tombol + tulis testimoni di list
  document.getElementById('t-open-list')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(listModal);
    openModalById('tModal');
  });

  // submit form → post to Apps Script tanpa reload
  const form = document.getElementById('testiForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(TESTI_POST_URL, { method: 'POST', body: new FormData(form) });
      await res.text();
      alert('Terima kasih! Testimoni kamu sudah dikirim 💚');
      form.reset();
      closeModal(formModal);
      // optional redirect:
      // window.location.href = 'testimoni.html';
    } catch (err) {
      alert('Gagal mengirim testimoni. Coba lagi nanti ya 🙏');
    }
  });
}

async function loadAllTestimonials(container) {
  if (!container) return;
  container.innerHTML = `<p class="muted center">⏳ Memuat testimoni...</p>`;
  try {
    const res = await fetch(TESTI_LIST_URL);
    const data = await res.json();
    if (!data.length) { container.innerHTML = `<p class="muted center">Belum ada testimoni.</p>`; return; }
    container.innerHTML = data.map(t => `
      <div class="t-card">
        <div class="t-header">
          <strong>${t.Nama || 'Anonim'}</strong> • ${t.Kota || '-'} • <em>${t.Varian || '-'}</em>
        </div>
        <div class="t-rating">${"⭐".repeat(parseInt(t.Rating || 5))}</div>
        <div class="t-msg">"${t.Pesan || ''}"</div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="muted center">Gagal memuat testimoni.</p>`;
  }
}

/* ================== ANIMATE ON SCROLL ================== */
function revealOnScroll() {
  const els = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ================== INIT ================== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  lazyImages();
  bindModals();
  bindFAQ(document);
  revealOnScroll();
  loadTestiPreview(4);
  bindTestiModals();
  // cart setelah produk sudah ada di DOM
  setTimeout(initCart, 100);
});
