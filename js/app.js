/* ============================================================
   AURORA — shared app logic (cart, rendering, page init)
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const fmt = n => AURORA.currency + n.toLocaleString("en-US");
const bySlug = slug => PRODUCTS.find(p => p.slug === slug);
const thumbSrc = slug => `images/products/thumb/${slug}.jpg`;
const fullSrc = slug => `images/products/full/${slug}.jpg`;
const sizePrice = ml => AURORA.sizes.find(s => s.ml === ml)?.price ?? 0;
const waConfigured = () => !/X/i.test(AURORA.whatsapp);
const waLink = text => `https://wa.me/${AURORA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

/* ------------------ Cart (localStorage) ------------------ */
const CART_KEY = "aurora_cart_v1";
const getCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
};
const saveCart = cart => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartItems();
};
const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);
const cartSubtotal = () => getCart().reduce((n, i) => n + sizePrice(i.size) * i.qty, 0);

function addToCart(slug, size, qty) {
  const cart = getCart();
  const hit = cart.find(i => i.slug === slug && i.size === size);
  if (hit) hit.qty += qty; else cart.push({ slug, size, qty });
  saveCart(cart);
  toast("Added to your collection ✦");
  openCart();
}
function setQty(idx, delta) {
  const cart = getCart();
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
}
function removeItem(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
}

function orderText() {
  const lines = getCart().map(i => {
    const p = bySlug(i.slug);
    return `• ${p.name} — ${i.size}ml × ${i.qty} = ${sizePrice(i.size) * i.qty} Tk`;
  });
  return [
    "Hello AuroraBD! I would like to place an order:",
    ...lines,
    `Subtotal: ${cartSubtotal()} Tk`,
    `Delivery: ${AURORA.deliveryFee} Tk`,
    `Total: ${cartSubtotal() + AURORA.deliveryFee} Tk`
  ].join("\n");
}

/* ------------------ Shared UI (drawer / modal / toast) ------------------ */
function injectSharedUI() {
  const el = document.createElement("div");
  el.innerHTML = `
  <div class="overlay" id="overlay"></div>

  <aside class="cart-drawer" id="cartDrawer" aria-label="Shopping bag">
    <div class="cart-head">
      <h3>Your Bag</h3>
      <button id="cartClose" aria-label="Close bag">×</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-foot" id="cartFoot"></div>
  </aside>

  <div class="toast" id="toast"></div>`;
  while (el.firstElementChild) document.body.appendChild(el.firstElementChild);

  $("#overlay").addEventListener("click", closeCart);
  $("#cartClose").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCart();
  });
  renderCartItems();
}

const openCart = () => { renderCartItems(); $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("show"); };
const closeCart = () => { $("#cartDrawer")?.classList.remove("open"); $("#overlay")?.classList.remove("show"); };

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function renderCartCount() {
  $$(".cart-count").forEach(b => { b.textContent = cartCount(); });
}

function renderCartItems() {
  const wrap = $("#cartItems");
  const foot = $("#cartFoot");
  if (!wrap) return;
  const cart = getCart();

  if (!cart.length) {
    wrap.innerHTML = `<p class="cart-empty">Your bag is empty —<br>your signature scent awaits.</p>`;
    foot.innerHTML = `<a class="btn btn-dark btn-block" href="shop.html">Explore The Collection</a>`;
    return;
  }

  wrap.innerHTML = cart.map((i, idx) => {
    const p = bySlug(i.slug);
    return `
    <div class="ci">
      <img src="${thumbSrc(p.images[0])}" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <div class="ci-size">${i.size}ml · ${fmt(sizePrice(i.size))}</div>
        <div class="ci-qty">
          <button data-dec="${idx}" aria-label="Decrease quantity">−</button>
          <span>${i.qty}</span>
          <button data-inc="${idx}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="ci-right">
        <div class="ci-line">${fmt(sizePrice(i.size) * i.qty)}</div>
        <button class="ci-remove" data-rm="${idx}">Remove</button>
      </div>
    </div>`;
  }).join("");

  foot.innerHTML = `
    <div class="tot-row"><span>Subtotal</span><span>${fmt(cartSubtotal())}</span></div>
    <div class="tot-row"><span>Delivery (all Bangladesh)</span><span>${fmt(AURORA.deliveryFee)}</span></div>
    <div class="tot-row grand"><span>Total</span><span>${fmt(cartSubtotal() + AURORA.deliveryFee)}</span></div>
    <a class="btn btn-gold btn-block" href="${waLink(orderText())}" target="_blank" rel="noopener">Checkout via WhatsApp ✦</a>
    <p class="cart-note">Your order opens in WhatsApp — just press send.<br>Cash on delivery, all over Bangladesh.</p>`;

  $$("[data-inc]", wrap).forEach(b => b.addEventListener("click", () => setQty(+b.dataset.inc, 1)));
  $$("[data-dec]", wrap).forEach(b => b.addEventListener("click", () => setQty(+b.dataset.dec, -1)));
  $$("[data-rm]", wrap).forEach(b => b.addEventListener("click", () => removeItem(+b.dataset.rm)));
}

/* ------------------ Contact form → WhatsApp ------------------ */
function initContact() {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#c-name").value.trim();
    const phone = $("#c-phone").value.trim();
    const email = $("#c-email").value.trim();
    const msg = $("#c-msg").value.trim();
    const text = [
      `Hello AuroraBD! I'm ${name}.`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      "",
      msg
    ].filter(Boolean).join("\n");
    window.open(waLink(text), "_blank", "noopener");
  });
}

/* ------------------ Product card renderer ------------------ */
function cardHTML(p, i = 0) {
  const badge = p.badge
    ? `<span class="badge ${p.badge.toLowerCase()}">${p.badge}</span>` : "";
  return `
  <a class="card" href="product.html?p=${p.slug}" data-reveal style="--rd:${(i % 4) * 0.08}s">
    <div class="card-media">
      <img src="${thumbSrc(p.images[0])}" alt="${p.name} — AuroraBD fragrance" loading="lazy">
      <span class="card-view">View Fragrance</span>
    </div>
    <div class="card-body">
      ${badge}
      <h3>${p.name}</h3>
      <p class="card-fam">${p.family} · ${p.tag}</p>
      <p class="card-price">From ${fmt(AURORA.sizes[0].price)}</p>
    </div>
  </a>`;
}

/* ------------------ Reveal on scroll ------------------ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$("[data-reveal]").forEach(el => io.observe(el));
}

/* ------------------ Header ------------------ */
function initHeader() {
  const header = $(".site-header");
  addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 8), { passive: true });
  $$(".cart-open").forEach(b => b.addEventListener("click", openCart));
  const mBtn = $("#menuBtn"), mNav = $("#mobileNav");
  if (mBtn && mNav) {
    mBtn.addEventListener("click", () => mNav.classList.add("open"));
    $(".close-x", mNav).addEventListener("click", () => mNav.classList.remove("open"));
    $$("a", mNav).forEach(a => a.addEventListener("click", () => mNav.classList.remove("open")));
  }
}

/* ------------------ Newsletter ------------------ */
function initNewsletter() {
  const form = $("#nlForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const email = $("input", form).value;
    const data = new URLSearchParams();
    data.append("form-name", "newsletter");
    data.append("email", email);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString()
      });
    } catch { /* static preview — ignore */ }
    form.outerHTML = `<p class="nl-done">Welcome to the AuroraBD circle ✦</p>`;
  });
}

/* ------------------ Page: Home ------------------ */
function initHome() {
  const grid = $("#featuredGrid");
  if (grid) {
    grid.innerHTML = FEATURED_SLUGS.map((s, i) => cardHTML(bySlug(s), i)).join("");
  }
  /* hero rotator */
  const faders = $$(".hero-card .fader");
  const dots = $$(".hero-dots button");
  if (faders.length) {
    let cur = 0;
    faders[0].classList.add("show");
    dots[0]?.classList.add("on");
    const go = n => {
      faders[cur].classList.remove("show");
      dots[cur]?.classList.remove("on");
      cur = n % faders.length;
      faders[cur].classList.add("show");
      dots[cur]?.classList.add("on");
    };
    let timer = setInterval(() => go(cur + 1), 4600);
    dots.forEach((d, i) => d.addEventListener("click", () => {
      clearInterval(timer);
      go(i);
      timer = setInterval(() => go(cur + 1), 4600);
    }));
  }
}

/* ------------------ Page: Shop ------------------ */
function initShop() {
  const grid = $("#shopGrid");
  if (!grid) return;
  const chips = $$(".chip");
  const search = $("#shopSearch");
  const params = new URLSearchParams(location.search);
  let cat = params.get("cat") || "all";
  let q = "";

  const matchCat = p => {
    switch (cat) {
      case "him": return p.tag === "For Him";
      case "her": return p.tag === "For Her";
      case "unisex": return p.tag === "Unisex";
      case "new": return p.badge === "New";
      case "best": return p.badge === "Bestseller";
      default: return true;
    }
  };

  const draw = () => {
    const list = PRODUCTS.filter(p =>
      matchCat(p) &&
      (p.name + " " + p.family + " " + [...p.top, ...p.heart, ...p.base].join(" "))
        .toLowerCase().includes(q)
    );
    grid.innerHTML = list.length
      ? list.map((p, i) => cardHTML(p, i)).join("")
      : `<p class="empty-msg" style="grid-column:1/-1">No fragrance matches — try another word.</p>`;
    $("#shopCount").textContent = `${list.length} fragrance${list.length === 1 ? "" : "s"}`;
    initReveal();
  };

  chips.forEach(c => c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("on"));
    c.classList.add("on");
    cat = c.dataset.cat;
    history.replaceState(null, "", cat === "all" ? "shop.html" : `shop.html?cat=${cat}`);
    draw();
  }));
  (chips.find(c => c.dataset.cat === cat) || chips[0]).classList.add("on");

  search?.addEventListener("input", () => { q = search.value.trim().toLowerCase(); draw(); });
  draw();
}

/* ------------------ Page: Product ------------------ */
function initProduct() {
  const wrap = $("#pdp");
  if (!wrap) return;
  const slug = new URLSearchParams(location.search).get("p");
  const p = bySlug(slug) || PRODUCTS[0];
  document.title = `${p.name} — AuroraBD Perfume`;

  let size = 50;
  let qty = 1;

  const noteCol = (label, notes) => `
    <div class="note-col">
      <h4>${label}</h4>
      <ul>${notes.map(n => `<li>${n}</li>`).join("")}</ul>
    </div>`;

  const thumbs = p.images.length > 1 ? `
    <div class="pdp-thumbs">
      ${p.images.map((img, i) => `
        <button class="${i === 0 ? "on" : ""}" data-img="${img}" aria-label="View image ${i + 1}">
          <img src="${thumbSrc(img)}" alt="">
        </button>`).join("")}
    </div>` : "";

  wrap.innerHTML = `
    <div class="pdp-gallery" data-reveal>
      <div class="pdp-main"><img id="pdpImg" src="${fullSrc(p.images[0])}" alt="${p.name} — AuroraBD fragrance card"></div>
      ${thumbs}
    </div>
    <div data-reveal style="--rd:.1s">
      <div class="pdp-tags">
        <span class="ptag">${p.tag}</span>
        <span class="ptag">${p.family}</span>
        ${p.badge ? `<span class="ptag">${p.badge}</span>` : ""}
      </div>
      <h1>${p.name}</h1>
      <p class="pdp-desc">${p.desc}</p>

      <div class="notes-box">
        ${noteCol("Top Notes", p.top)}
        ${noteCol("Heart Notes", p.heart)}
        ${noteCol("Base Notes", p.base)}
      </div>

      <p class="opt-label">Select Size — <b id="sizeLabel">50ml</b></p>
      <div class="size-select" id="sizeSelect">
        ${AURORA.sizes.map(s => `
          <button class="size-opt ${s.ml === size ? "on" : ""}" data-ml="${s.ml}">
            <span class="s-ml">${s.ml}ml</span>
            <span class="s-tk">${fmt(s.price)}</span>
          </button>`).join("")}
      </div>

      <p class="pdp-price"><span id="pdpPrice">${fmt(sizePrice(size))}</span> <small>+ ${fmt(AURORA.deliveryFee)} delivery</small></p>

      <div class="buy-row">
        <div class="qty">
          <button id="qDec" aria-label="Decrease quantity">−</button>
          <output id="qOut">1</output>
          <button id="qInc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-gold" id="addBtn" style="flex:1">Add to Bag ✦</button>
      </div>
      ${waConfigured() ? `<a class="btn wa-btn btn-block" id="waOrder" href="#" target="_blank" rel="noopener">Order Now on WhatsApp</a>` : ""}

      <div class="pdp-meta">
        <span><span class="d">✦</span> Long-lasting premium-grade formulation</span>
        <span><span class="d">✦</span> ${AURORA.deliveryNote}</span>
        <span><span class="d">✦</span> Cash on delivery available</span>
      </div>
    </div>`;

  const refresh = () => {
    $("#sizeLabel").textContent = `${size}ml`;
    $("#pdpPrice").textContent = fmt(sizePrice(size) * qty);
    $("#qOut").textContent = qty;
    const wa = $("#waOrder");
    if (wa) wa.href = waLink(
      `Hello AuroraBD! I would like to order:\n• ${p.name} — ${size}ml × ${qty} = ${sizePrice(size) * qty} Tk\nDelivery: ${AURORA.deliveryFee} Tk\nTotal: ${sizePrice(size) * qty + AURORA.deliveryFee} Tk`
    );
  };

  $$("#sizeSelect .size-opt").forEach(b => b.addEventListener("click", () => {
    $$("#sizeSelect .size-opt").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    size = +b.dataset.ml;
    refresh();
  }));
  $("#qInc").addEventListener("click", () => { qty++; refresh(); });
  $("#qDec").addEventListener("click", () => { if (qty > 1) qty--; refresh(); });
  $("#addBtn").addEventListener("click", () => addToCart(p.slug, size, qty));
  $$(".pdp-thumbs button").forEach(b => b.addEventListener("click", () => {
    $$(".pdp-thumbs button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    $("#pdpImg").src = fullSrc(b.dataset.img);
  }));
  refresh();

  /* related products */
  const rel = PRODUCTS.filter(x => x.slug !== p.slug && x.tag === p.tag).slice(0, 4);
  const relGrid = $("#relatedGrid");
  if (relGrid) relGrid.innerHTML = rel.map((r, i) => cardHTML(r, i)).join("");
}

/* ------------------ Boot ------------------ */
document.addEventListener("DOMContentLoaded", () => {
  injectSharedUI();
  initHeader();
  renderCartCount();
  initNewsletter();

  $$(".jsYear").forEach(el => { el.textContent = new Date().getFullYear(); });

  const cw = $("#contactWa");
  if (cw) {
    if (waConfigured()) cw.href = waLink("Hello AuroraBD! I have a question.");
    else cw.remove();
  }

  switch (document.body.dataset.page) {
    case "home": initHome(); break;
    case "shop": initShop(); break;
    case "product": initProduct(); break;
    case "contact": initContact(); break;
  }
  initReveal();
});
