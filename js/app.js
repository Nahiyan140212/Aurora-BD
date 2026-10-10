/* ============================================================
   AURORA — storefront logic
   Components: Header · MegaMenu · MobileMenu · Search · ProductCard
   ProductGrid · CategoryCard · CollectionHeader · Filters · QuickView
   CartDrawer (+ WhatsApp checkout) · Footer
   Pages: home · collection (shop.html) · product · contact · static
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const fmt = n => AURORA.currency + n.toLocaleString("en-US");
const bySlug = slug => PRODUCTS.find(p => p.slug === slug);
const thumbSrc = slug => `images/products/thumb/${slug}.jpg`;
const fullSrc = slug => `images/products/full/${slug}.jpg`;
const waConfigured = () => !/X/i.test(AURORA.whatsapp);
const waLink = text => `https://wa.me/${AURORA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
const collUrl = slug => slug === "all" ? "shop.html" : `shop.html?c=${slug}`;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};

/* ------------------ Icons ------------------ */
const ICONS = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>',
  bag: '<path d="M5 8h14l-1 12.5H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  truck: '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  cash: '<rect x="2.5" y="6" width="19" height="12" rx="1"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
  chat: '<path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1 1 20.5 12z"/>',
  bottle: '<path d="M9 3.5h6M10 3.5v3.2M14 3.5v3.2"/><rect x="6.5" y="6.7" width="11" height="14" rx="2"/><path d="M6.5 11.5h11"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  filter: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  whatsapp: '<path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1 1 20.5 12z"/><path d="M9 8.6c0 3.2 2.9 6.4 6.4 6.4l1-1.6-2-1-1 .8c-1-.4-2.3-1.6-2.7-2.7l.8-1-1-2L9 8.6z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".5"/>',
  facebook: '<path class="f" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/>',
  tiktok: '<path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3a7 7 0 0 1-3.9-1.2v6.1a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.9 2.6V3h3z"/>'
};
const FILLED = new Set(["facebook", "tiktok"]);
const icon = name => `<svg class="icon${FILLED.has(name) ? " fill" : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;

/* ============================================================
   Catalog helpers
   ============================================================ */
const GENDER = { "For Him": "Men", "For Her": "Women", "Unisex": "Unisex" };
const PERFUME_TYPES = { spray: "Perfume", oil: "Perfume Oil", "roll-on": "Roll-On Oil" };
const isPerfume = p => (p.category || "perfume") === "perfume";
const isSkincare = p => p.category === "skincare";
const perfumeType = p => p.type || "spray";
const notesOf = p => [...(p.top || []), ...(p.heart || []), ...(p.base || [])];
const labelOf = (list, key) => list.find(x => x.key === key)?.label || key;

/* Pre-order: while AURORA.preorder is running, a size's `preorderPrice` replaces its price */
const preorderActive = () => {
  const po = AURORA.preorder;
  return !!po && Date.now() <= new Date(po.endsAt).getTime();
};
const withPreorder = s => {
  const on = preorderActive() && typeof s.preorderPrice === "number";
  return { ml: s.ml, label: s.label, regular: s.price, price: on ? s.preorderPrice : s.price, preorder: on };
};
/* Sizes: product `variants` replace the shared list; `prices` override it.
   `price` is what the customer pays now; `regular` is the price outside the pre-order. */
const productSizes = p => (p?.variants
  ? p.variants.map(v => ({ ml: v.ml, price: v.price ?? null, preorderPrice: v.preorderPrice, label: v.label ?? `${v.ml}ml` }))
  : p && isSkincare(p) ? [{ ml: 1, price: p.price ?? null, preorderPrice: p.preorderPrice, label: p.size || "" }]
  : AURORA.sizes.map(s => ({ ml: s.ml, price: p?.prices?.[s.ml] ?? s.price, label: `${s.ml}ml` }))
).map(withPreorder);
const isPreorder = p => productSizes(p).some(s => s.preorder);
const discountPct = s => s.preorder && s.regular ? Math.round((1 - s.price / s.regular) * 100) : 0;
/* Price with the regular price struck through while a pre-order discount applies */
const priceHTML = (s, prefix = "") => s.preorder
  ? `${prefix}${fmt(s.price)} <s class="was">${fmt(s.regular)}</s> <span class="off">−${discountPct(s)}%</span>`
  : `${prefix}${fmt(s.price)}`;
const preorderEnds = () => new Date(AURORA.preorder.endsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "Asia/Dhaka" });
const maxPreorderPct = () => Math.max(0, ...PRODUCTS.flatMap(productSizes).map(discountPct));
/* "30%" when every pre-order discount is the same, otherwise "up to 30%" */
const preorderOff = () => {
  const pcts = new Set(PRODUCTS.flatMap(productSizes).filter(s => s.preorder).map(discountPct));
  return `${pcts.size > 1 ? "up to " : ""}${maxPreorderPct()}%`;
};
const sizePrice = (slug, ml) => productSizes(bySlug(slug)).find(s => s.ml === ml)?.price ?? 0;
const sizeLabel = (slug, ml) => productSizes(bySlug(slug)).find(s => s.ml === ml)?.label ?? `${ml}ml`;
/* A product without a price yet ("price: null") is shown as "Price on request" and ordered via WhatsApp */
/* `comingSoon: true` — listed with a "Coming soon" badge, no price, not orderable yet */
const isComingSoon = p => !!p?.comingSoon;
const hasPrice = p => !isComingSoon(p) && productSizes(p).every(s => typeof s.price === "number");
const fromPrice = p => hasPrice(p) ? Math.min(...productSizes(p).map(s => s.price)) : null;
const priceText = p => {
  if (isComingSoon(p)) return "Coming soon";
  if (!hasPrice(p)) return "Price on request";
  const sizes = productSizes(p);
  const low = sizes.reduce((a, b) => (b.price < a.price ? b : a));
  return priceHTML(low, sizes.length > 1 ? "From " : "");
};
const askLink = p => isComingSoon(p)
  ? waLink(`Hello AuroraBD! Please let me know when ${p.name} is available.`)
  : waLink(`Hello AuroraBD! I'd like to order ${p.name}. What is the price?`);
const askButton = p => waConfigured()
  ? `<a class="btn btn-block" href="${askLink(p)}" target="_blank" rel="noopener">${icon("whatsapp")} ${isComingSoon(p) ? "Notify me on WhatsApp" : "Ask for price on WhatsApp"}</a>`
  : `<a class="btn btn-block" href="contact.html">${isComingSoon(p) ? "Contact us" : "Contact us for the price"}</a>`;

const scentKeys = p => !isPerfume(p) ? [] : SCENT_FAMILIES.filter(f =>
  (f.match.family && f.match.family.test(p.family || "")) ||
  (f.match.notes && f.match.notes.test(notesOf(p).join(" ")))
).map(f => f.key);

/* skincareType may be one key or a list (e.g. ["moisturizer", "eye-care"]) */
const skinCats = p => [].concat(p.skincareType || []);

const productMeta = p => isSkincare(p)
  ? [p.brand, labelOf(SKINCARE_CATEGORIES, skinCats(p)[0]) || "Skincare"].filter(Boolean).join(" · ")
  : [GENDER[p.tag], perfumeType(p) === "spray" ? p.family : PERFUME_TYPES[perfumeType(p)]].filter(Boolean).join(" · ");

const searchText = p => [p.name, p.brand, p.tag, GENDER[p.tag], p.family, productMeta(p), ...notesOf(p),
  ...(p.keyIngredients || []), ...skinCats(p).map(k => labelOf(SKINCARE_CATEGORIES, k)), ...scentKeys(p),
  isSkincare(p) ? "skincare skin care" : "perfume fragrance"].join(" ").toLowerCase();

/* ============================================================
   Collections
   ============================================================ */
const COLLECTIONS = (() => {
  const c = {};
  const add = (slug, o) => { c[slug] = { slug, group: "shop", ...o }; };
  const perf = fn => p => isPerfume(p) && fn(p);
  const skin = fn => p => isSkincare(p) && fn(p);

  add("all", { title: "All Products", nav: "All Products", filter: () => true,
    desc: "Every Aurora fragrance in one place — browse by gender, scent family and size." });
  add("best-sellers", { title: "Best Sellers", filter: p => p.badge === "Bestseller",
    desc: "The scents our customers come back for again and again." });
  add("new-arrivals", { title: "New Arrivals", filter: p => p.badge === "New",
    desc: "The latest additions to the Aurora collection." });
  add("featured", { title: "Featured", nav: "Featured Products", filter: p => FEATURED_SLUGS.includes(p.slug), order: FEATURED_SLUGS,
    desc: "A curated edit of signature Aurora fragrances." });

  add("perfume", { group: "perfume", title: "Perfume", nav: "All Perfume", filter: isPerfume,
    desc: "Long-lasting fragrances for men, women and everyone — in sizes from 10ml to 100ml." });
  add("perfume-men", { group: "perfume", title: "Perfume for Men", nav: "For Men", filter: perf(p => p.tag === "For Him"),
    desc: "Fresh, woody and warm scents made for everyday confidence and evenings out." });
  add("perfume-women", { group: "perfume", title: "Perfume for Women", nav: "For Women", filter: perf(p => p.tag === "For Her"),
    desc: "Floral, sweet and elegant fragrances — from soft daytime scents to rich evening wear." });
  add("perfume-unisex", { group: "perfume", title: "Unisex Perfume", nav: "Unisex", filter: perf(p => p.tag === "Unisex"),
    desc: "Scents without rules — made to be shared and worn by anyone." });
  add("perfume-oil", { group: "perfume", title: "Perfume Oil", filter: perf(p => perfumeType(p) === "oil"),
    desc: "Concentrated, alcohol-free fragrance oils that sit close to the skin." });
  add("roll-on", { group: "perfume", title: "Roll-On Oil", filter: perf(p => perfumeType(p) === "roll-on"),
    desc: "Pocket-size roll-on fragrance oils — easy to carry, easy to reapply." });
  add("perfume-best-sellers", { group: "perfume", title: "Best Selling Perfume", nav: "Best Sellers", filter: perf(p => p.badge === "Bestseller"),
    desc: "Our most-loved fragrances." });
  add("perfume-new-arrivals", { group: "perfume", title: "New Perfume Arrivals", nav: "New Arrivals", filter: perf(p => p.badge === "New"),
    desc: "Fresh additions to the Aurora fragrance wardrobe." });
  SCENT_FAMILIES.forEach(f => add(`scent-${f.key}`, { group: "perfume", title: `${f.label} Fragrances`, nav: f.label,
    filter: p => scentKeys(p).includes(f.key), desc: f.desc }));

  add("skincare", { group: "skincare", title: "Skincare", nav: "All Skincare", filter: isSkincare,
    desc: "Korean skincare essentials — cleansers, serums, moisturizers and sunscreens, with what each one does and how to use it." });
  SKINCARE_CATEGORIES.forEach(k => add(`skincare-${k.key}`, { group: "skincare", title: k.label,
    filter: skin(p => skinCats(p).includes(k.key)), desc: `${k.label} — with what each product does, its key ingredients and how to use it.` }));
  add("preorder", { group: "skincare", title: "Skincare Pre-order", nav: "Pre-order", filter: p => isSkincare(p) && isPreorder(p),
    desc: AURORA.preorder ? `Pre-order Korean skincare at a discount — offer ends ${preorderEnds()}. Applies to skincare only.` : "" });
  add("coming-soon", { group: "skincare", title: "Coming Soon", nav: "Coming Soon", filter: p => isComingSoon(p),
    desc: "New skincare arriving at Aurora soon. Tap Notify me to hear first on WhatsApp when a product is available." });
  add("skincare-best-sellers", { group: "skincare", title: "Skincare Best Sellers", nav: "Best Sellers", filter: skin(p => p.badge === "Bestseller"),
    desc: "Our most-loved skincare." });
  add("skincare-new-arrivals", { group: "skincare", title: "New in Skincare", nav: "New Arrivals", filter: skin(p => p.badge === "New"),
    desc: "The newest additions to Aurora skincare." });
  SKIN_TYPES.forEach(t => add(`skin-${t.key}`, { group: "skincare", title: `For ${t.label}`, nav: t.label,
    filter: skin(p => (p.skinTypes || []).includes(t.key)), desc: `Skincare suited to ${t.label.toLowerCase()}.` }));
  SKIN_CONCERNS.forEach(t => add(`concern-${t.key}`, { group: "skincare", title: t.label, nav: t.label,
    filter: skin(p => (p.concerns || []).includes(t.key)), desc: `Skincare focused on ${t.label.toLowerCase()}.` }));
  return c;
})();

const collectionProducts = slug => {
  const col = COLLECTIONS[slug];
  if (!col) return [];
  const list = PRODUCTS.filter(col.filter);
  if (col.order) list.sort((a, b) => col.order.indexOf(a.slug) - col.order.indexOf(b.slug));
  return list;
};
const countOf = slug => collectionProducts(slug).length;
const hasSkincare = () => PRODUCTS.some(isSkincare);

/* Legacy links: shop.html?cat=him|her|unisex|new|best */
const LEGACY_CAT = { him: "perfume-men", her: "perfume-women", unisex: "perfume-unisex", new: "new-arrivals", best: "best-sellers" };

const SUB_NAV = {
  shop: ["all", "best-sellers", "new-arrivals", "featured", "perfume", "skincare"],
  perfume: ["perfume", "perfume-men", "perfume-women", "perfume-unisex", "perfume-oil", "roll-on"],
  skincare: ["skincare", ...(preorderActive() ? ["preorder"] : []), ...(PRODUCTS.some(isComingSoon) ? ["coming-soon"] : []), ...SKINCARE_CATEGORIES.map(k => `skincare-${k.key}`)]
};
const GROUP_ROOT = { shop: "all", perfume: "perfume", skincare: "skincare" };

/* ============================================================
   Navigation model
   ============================================================ */
const navLink = slug => ({ slug, label: COLLECTIONS[slug].nav || COLLECTIONS[slug].title, href: collUrl(slug) });
const NAV = [
  { key: "shop", label: "Shop", href: collUrl("all"), columns: [
      { title: "Shop", links: ["all", "best-sellers", "new-arrivals", "featured"].map(navLink) },
      { title: "Categories", links: ["perfume", "skincare"].map(navLink) },
      { title: "Help", links: [
        { label: "Delivery & Payment", href: "help.html#shipping" },
        { label: "Order Tracking", href: "help.html#tracking" },
        { label: "Contact Us", href: "contact.html" }] }
    ], feature: ["creed-aventus", "good-girl"] },
  { key: "perfume", label: "Perfume", href: collUrl("perfume"), columns: [
      { title: "Shop by", links: ["perfume-men", "perfume-women", "perfume-unisex", "perfume-best-sellers", "perfume-new-arrivals"].map(navLink) },
      { title: "Type", links: [{ ...navLink("perfume"), label: "All Perfume" }, navLink("perfume-oil"), navLink("roll-on")] },
      { title: "Scent family", links: SCENT_FAMILIES.map(f => navLink(`scent-${f.key}`)) }
    ], feature: ["dior-sauvage", "miss-dior"] },
  { key: "skincare", label: "Skincare", href: collUrl("skincare"), columns: [
      { title: "Category", links: ["skincare", ...SKINCARE_CATEGORIES.slice(0, 3).map(k => `skincare-${k.key}`)].map(navLink) },
      { title: "More", links: SKINCARE_CATEGORIES.slice(3).map(k => navLink(`skincare-${k.key}`)) },
      { title: "Discover", links: [...(preorderActive() ? ["preorder"] : []), ...(PRODUCTS.some(isComingSoon) ? ["coming-soon"] : []), "skincare-best-sellers", "skincare-new-arrivals"].map(navLink) }
    ], feature: "skincare-note" },
  { key: "contact", label: "Contact", href: "contact.html" }
];

const soonTag = l => l.slug && countOf(l.slug) === 0 ? `<span class="tag-soon">Soon</span>` : "";

/* ============================================================
   Component: Header (announcement + bar + mega menus)
   ============================================================ */
function megaFeature(item) {
  if (item.feature === "skincare-note") {
    if (hasSkincare()) return megaFeature({ feature: (typeof SKINCARE_FEATURED !== "undefined" ? SKINCARE_FEATURED : PRODUCTS.filter(isSkincare).map(p => p.slug)).slice(0, 2) });
    return `
      <div class="mega-note">
        <div>
          <span class="eyebrow">Coming soon</span>
          <p>Aurora is growing beyond fragrance. Our first skincare essentials are on their way.</p>
        </div>
        <a class="link" href="${waConfigured() ? waLink("Hello AuroraBD! Please let me know when your skincare launches.") : "contact.html"}" ${waConfigured() ? 'target="_blank" rel="noopener"' : ""}>Notify me on WhatsApp ${icon("arrow")}</a>
      </div>`;
  }
  const items = (item.feature || []).map(bySlug).filter(Boolean);
  return `<div class="mega-feature${items.length === 1 ? " single" : ""}">${items.map(p => `
      <a class="mega-card" href="product.html?p=${p.slug}">
        <div class="media"><img src="${thumbSrc(p.images[0])}" alt="${esc(p.name)}" loading="lazy" width="720" height="480"></div>
        <p>${esc(p.name)}<span>${esc(productMeta(p))}</span></p>
      </a>`).join("")}</div>`;
}

function renderHeader() {
  const page = document.body.dataset.page;
  const group = document.body.dataset.group;
  const preMsg = preorderActive() && countOf("preorder") ? [`Skincare pre-order: ${preorderOff()} off until ${preorderEnds()}`] : [];
  const ann = [...preMsg, ...(AURORA.announcements || [])].map((m, i) => `<li${i === 0 ? ' class="is-on"' : ""}>${esc(m)}</li>`).join("");
  const navItems = NAV.map(item => {
    const current = (group && group === item.key) || (page === item.key) ? " is-current" : "";
    if (!item.columns) return `<li><a class="nav-link${current}" href="${item.href}">${item.label}</a></li>`;
    return `
      <li data-mega>
        <a class="nav-link${current}" href="${item.href}" aria-expanded="false" aria-controls="mega-${item.key}">${item.label} ${icon("down")}</a>
        <div class="mega" id="mega-${item.key}">
          <div class="container mega-inner">
            ${item.columns.map(col => `
              <div class="mega-col">
                <h3>${col.title}</h3>
                <ul>${col.links.map(l => `<li><a href="${l.href}">${esc(l.label)}</a>${soonTag(l)}</li>`).join("")}</ul>
              </div>`).join("")}
            ${megaFeature(item)}
          </div>
        </div>
      </li>`;
  }).join("");

  const host = $("#site-header");
  host.outerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    ${ann ? `<div class="announce" role="region" aria-label="Store information"><ul>${ann}</ul></div>` : ""}
    <header class="site-header">
      <div class="container header-bar">
        <div class="header-left">
          <button class="icon-btn" data-open-menu aria-label="Open menu">${icon("menu")}</button>
          <button class="icon-btn" data-open-search aria-label="Search">${icon("search")}</button>
        </div>
        <a class="logo" href="index.html" aria-label="Aurora — home">
          <span class="logo-word">AURORA</span>
          <span class="logo-tag">A Signature of Confidence</span>
        </a>
        <nav class="primary-nav" aria-label="Main"><ul>${navItems}</ul></nav>
        <div class="header-right">
          <button class="icon-btn hide-mobile" data-open-search aria-label="Search">${icon("search")}</button>
          <a class="icon-btn hide-mobile" href="help.html#orders" aria-label="My orders and help" title="My orders & help">${icon("user")}</a>
          <button class="icon-btn" data-open-cart aria-label="Open shopping bag">${icon("bag")}<span class="cart-count" data-n="0"></span></button>
        </div>
      </div>
    </header>`;
}

function initHeader() {
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Announcement rotation (mobile shows one message at a time) */
  const msgs = $$(".announce li");
  if (msgs.length > 1) {
    let i = 0;
    setInterval(() => {
      msgs[i].classList.remove("is-on");
      i = (i + 1) % msgs.length;
      msgs[i].classList.add("is-on");
    }, 4200);
  }

  /* Mega menus: hover with intent delay, keyboard via focus */
  $$("[data-mega]").forEach(li => {
    const link = $(".nav-link", li), panel = $(".mega", li);
    let t;
    const open = () => {
      clearTimeout(t);
      $$("[data-mega]").forEach(o => { if (o !== li) close(o, true); });
      panel.classList.add("is-open"); link.setAttribute("aria-expanded", "true");
    };
    const close = (el = li, now = false) => {
      const doClose = () => { $(".mega", el).classList.remove("is-open"); $(".nav-link", el).setAttribute("aria-expanded", "false"); };
      if (now) doClose(); else { clearTimeout(t); t = setTimeout(doClose, 160); }
    };
    li.addEventListener("mouseenter", () => { clearTimeout(t); t = setTimeout(open, 90); });
    li.addEventListener("mouseleave", () => close());
    li.addEventListener("focusin", open);
    li.addEventListener("focusout", e => { if (!li.contains(e.relatedTarget)) close(li, true); });
    li.addEventListener("keydown", e => { if (e.key === "Escape") { close(li, true); link.focus(); } });
  });

  $$("[data-open-cart]").forEach(b => b.addEventListener("click", () => Cart.open()));
  $$("[data-open-search]").forEach(b => b.addEventListener("click", () => Search.open()));
  $$("[data-open-menu]").forEach(b => b.addEventListener("click", () => MobileMenu.open()));
}

/* ============================================================
   Overlay helpers (scrim + drawers + focus return)
   ============================================================ */
const Layer = {
  stack: [],
  open(el, onClose) {
    this.stack.push({ el, onClose, returnTo: document.activeElement });
    $("#scrim").classList.add("is-on");
    document.body.classList.add("locked");
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    setTimeout(() => (el.querySelector("[data-autofocus]") || el.querySelector("button, a, input"))?.focus({ preventScroll: true }), 60);
  },
  close(el) {
    const i = this.stack.findIndex(s => s.el === el);
    if (i < 0) return;
    const [layer] = this.stack.splice(i, 1);
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    layer.onClose?.();
    if (!this.stack.length) {
      $("#scrim").classList.remove("is-on");
      document.body.classList.remove("locked");
    }
    layer.returnTo?.focus?.({ preventScroll: true });
  },
  closeTop() { const top = this.stack[this.stack.length - 1]; if (top) this.close(top.el); }
};

/* ============================================================
   Component: Mobile menu
   ============================================================ */
const MobileMenu = {
  render() {
    const items = NAV.map((item, i) => {
      if (!item.columns) return `<li><a href="${item.href}">${item.label}</a></li>`;
      return `
        <li>
          <button class="m-acc-btn" aria-expanded="false" aria-controls="macc-${i}">${item.label} ${icon("plus")}</button>
          <div class="m-acc-panel" id="macc-${i}"><div>
            <a href="${item.href}" style="font-weight:500;color:var(--ink)">Shop all ${item.label.toLowerCase()}</a>
            ${item.columns.map(col => `
              <h3>${col.title}</h3>
              <ul>${col.links.map(l => `<li><a href="${l.href}">${esc(l.label)}${soonTag(l)}</a></li>`).join("")}</ul>`).join("")}
          </div></div>
        </li>`;
    }).join("");
    return `
      <aside class="drawer left" id="mobileMenu" aria-label="Menu" aria-hidden="true">
        <div class="drawer-head">
          <h2>Menu</h2>
          <button class="icon-btn" data-close aria-label="Close menu">${icon("close")}</button>
        </div>
        <div class="drawer-body">
          <ul class="m-nav">${items}</ul>
          <div class="m-extra">
            <a href="about.html">Our Story</a>
            <a href="help.html#orders">${icon("user")} My orders &amp; help</a>
            ${waConfigured() ? `<a href="${waLink("Hello AuroraBD! I have a question.")}" target="_blank" rel="noopener">${icon("whatsapp")} Chat on WhatsApp</a>` : ""}
          </div>
        </div>
      </aside>`;
  },
  init() {
    const el = $("#mobileMenu");
    $("[data-close]", el).addEventListener("click", () => Layer.close(el));
    $$(".m-acc-btn", el).forEach(b => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!open));
      $("#" + b.getAttribute("aria-controls")).classList.toggle("is-open", !open);
    }));
    $$("a", el).forEach(a => a.addEventListener("click", () => Layer.close(el)));
  },
  open() { Layer.open($("#mobileMenu")); }
};

/* ============================================================
   Component: Search
   ============================================================ */
const Search = {
  render() {
    const chips = [["Best Sellers", "best-sellers"], ["New Arrivals", "new-arrivals"], ["For Men", "perfume-men"],
      ["For Women", "perfume-women"], ["Unisex", "perfume-unisex"], ["Fresh", "scent-fresh"], ["Oud", "scent-oud"]]
      .filter(([, s]) => countOf(s) > 0);
    return `
      <div class="search-panel" id="searchPanel" role="dialog" aria-modal="true" aria-label="Search" aria-hidden="true">
        <div class="container search-top">
          ${icon("search")}
          <label class="sr-only" for="searchInput">Search products</label>
          <input id="searchInput" type="search" placeholder="Search perfume, notes or skincare…" autocomplete="off" data-autofocus>
          <button class="icon-btn" data-close aria-label="Close search">${icon("close")}</button>
        </div>
        <div class="search-body">
          <div class="container">
            <div class="search-suggest">
              <h3>Popular</h3>
              <div class="chips">${chips.map(([l, s]) => `<a class="pill" href="${collUrl(s)}">${l}</a>`).join("")}</div>
            </div>
            <div class="search-results" id="searchResults"></div>
          </div>
        </div>
      </div>`;
  },
  init() {
    const el = $("#searchPanel"), input = $("#searchInput"), out = $("#searchResults");
    $("[data-close]", el).addEventListener("click", () => Layer.close(el));
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { out.innerHTML = this.list("Best sellers", collectionProducts("best-sellers").slice(0, 6)); return; }
      const terms = q.split(/\s+/);
      const hits = PRODUCTS.filter(p => { const t = searchText(p); return terms.every(w => t.includes(w)); });
      out.innerHTML = hits.length
        ? this.list(`${hits.length} result${hits.length === 1 ? "" : "s"}`, hits.slice(0, 12))
        : `<p class="search-empty">No products match “${esc(input.value.trim())}”. Try a note like “vanilla” or “oud”.</p>`;
    };
    input.addEventListener("input", draw);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { const first = $(".search-item", out); if (first) location.href = first.href; }
    });
    draw();
  },
  list(title, items) {
    return `<h3>${title}</h3><div class="search-list">${items.map(p => `
      <a class="search-item" href="product.html?p=${p.slug}">
        <img src="${thumbSrc(p.images[0])}" alt="" loading="lazy" width="64" height="64">
        <div><strong>${esc(p.name)}</strong><span>${esc(productMeta(p))}</span></div>
        <span class="price">${hasPrice(p) ? fmt(fromPrice(p)) : isComingSoon(p) ? "Soon" : "Ask"}</span>
      </a>`).join("")}</div>`;
  },
  open() { Layer.open($("#searchPanel")); }
};

/* ============================================================
   Component: Product card + grid + slider
   ============================================================ */
function productCard(p, opts = {}) {
  const sizes = productSizes(p);
  const priced = hasPrice(p);
  const shown = opts.size && priced ? sizes.find(s => s.ml === opts.size) : null;
  const price = shown ? `${priceHTML(shown)} <small>· ${shown.label}</small>` : priceText(p);
  const badge = isComingSoon(p) ? ["Coming Soon", " soon"] : isPreorder(p) ? ["Pre-order", " pre"] : p.badge ? [p.badge === "Bestseller" ? "Best Seller" : p.badge, p.badge === "New" ? " new" : ""] : null;
  const addTool = priced
    ? `<button class="tool" data-quickadd="${p.slug}" aria-label="Quick add ${esc(p.name)}" aria-expanded="false">${icon("plus")}<span>Quick add</span></button>`
    : waConfigured() ? `<a class="tool" href="${askLink(p)}" target="_blank" rel="noopener" aria-label="${isComingSoon(p) ? `Get notified when ${esc(p.name)} is available` : `Ask the price of ${esc(p.name)}`} on WhatsApp">${icon("whatsapp")}<span>${isComingSoon(p) ? "Notify me" : "Ask price"}</span></a>` : "";
  const alt = p.images[1] ? `<img class="alt" src="${thumbSrc(p.images[1])}" alt="" loading="lazy" width="720" height="480">` : "";
  return `
    <article class="pcard" data-slug="${p.slug}" ${opts.reveal === false ? "" : "data-reveal"}>
      <div class="pcard-figure">
      <a class="pcard-media" href="product.html?p=${p.slug}" tabindex="-1" aria-hidden="true">
        <img src="${thumbSrc(p.images[0])}" alt="" loading="lazy" decoding="async" width="720" height="480">
        ${alt}
        ${badge ? `<span class="pcard-badge${badge[1]}">${esc(badge[0])}</span>` : ""}
      </a>
      <div class="pcard-tools">
        <button class="tool qv" data-quickview="${p.slug}" aria-label="Quick view ${esc(p.name)}">${icon("eye")}<span>Quick view</span></button>
        ${addTool}
      </div>
      ${priced ? `<div class="pcard-sizes" aria-hidden="true">
        <p>Choose size <button data-sizes-close aria-label="Close">${icon("close")}</button></p>
        <div class="sizes">${sizes.map(s => `<button data-add="${p.slug}" data-ml="${s.ml}">${s.label}<small>${fmt(s.price)}</small></button>`).join("")}</div>
      </div>` : ""}
      </div>
      <div class="pcard-body">
        <h3><a href="product.html?p=${p.slug}">${esc(p.name)}</a></h3>
        <p class="pcard-meta">${esc(productMeta(p))}</p>
        <p class="pcard-price${priced ? "" : " ask"}">${price}</p>
        ${sizes.length > 1 ? `<p class="pcard-size-list">${sizes.map(s => s.label.replace("ml", "")).join(" · ")} ml</p>`
          : sizes[0]?.label && sizes[0].ml ? `<p class="pcard-size-list">${esc(sizes[0].label)}</p>` : ""}
      </div>
    </article>`;
}
const productGrid = (list, opts = {}) => list.map(p => productCard(p, opts)).join("");

/* One delegated handler for every card on the page */
function initCardActions() {
  document.addEventListener("click", e => {
    const qv = e.target.closest("[data-quickview]");
    if (qv) { QuickView.open(qv.dataset.quickview); return; }
    const qa = e.target.closest("[data-quickadd]");
    if (qa) {
      const card = qa.closest(".pcard"), panel = $(".pcard-sizes", card);
      const open = !panel.classList.contains("is-open");
      $$(".pcard-sizes.is-open").forEach(x => x.classList.remove("is-open"));
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      qa.setAttribute("aria-expanded", String(open));
      if (open) $("button[data-add]", panel)?.focus({ preventScroll: true });
      return;
    }
    const cl = e.target.closest("[data-sizes-close]");
    if (cl) { const panel = cl.closest(".pcard-sizes"); panel.classList.remove("is-open"); panel.setAttribute("aria-hidden", "true"); return; }
    const add = e.target.closest(".pcard-sizes [data-add]");
    if (add) {
      Cart.add(add.dataset.add, +add.dataset.ml, 1);
      const panel = add.closest(".pcard-sizes"); panel.classList.remove("is-open"); panel.setAttribute("aria-hidden", "true");
      return;
    }
    if (!e.target.closest(".pcard-sizes")) $$(".pcard-sizes.is-open").forEach(x => { x.classList.remove("is-open"); x.setAttribute("aria-hidden", "true"); });
  });
}

function initSlider(wrap) {
  const track = $(".slider", wrap), prev = $("[data-prev]", wrap), next = $("[data-next]", wrap);
  if (!track || !prev) return;
  const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 20;
  const update = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step() * 2, behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step() * 2, behavior: "smooth" }));
  track.addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}
const sliderNav = () => `
  <div class="slider-nav">
    <button data-prev aria-label="Previous">${icon("left")}</button>
    <button data-next aria-label="Next">${icon("right")}</button>
  </div>`;

/* ============================================================
   Component: World card (Fragrance / Skincare panel)
   ============================================================ */
function worldCard({ title, slug, image, focus, desc, links }) {
  const n = countOf(slug);
  const subs = links.filter(s => countOf(s) > 0);
  return `
    <article class="world" data-reveal>
      <a class="world-media" href="${collUrl(slug)}" tabindex="-1" aria-hidden="true">
        <img src="${fullSrc(image)}" alt="" loading="lazy" style="object-position:${focus || "50% 50%"}">
      </a>
      <div class="world-body">
        <div class="world-head"><h3 class="h2"><a href="${collUrl(slug)}">${title}</a></h3><span class="count">${n} product${n === 1 ? "" : "s"}</span></div>
        <p>${desc}</p>
        ${subs.length ? `<nav class="world-links" aria-label="${title} categories">${subs.map(s => `<a href="${collUrl(s)}">${COLLECTIONS[s].nav || COLLECTIONS[s].title}<span>${countOf(s)}</span></a>`).join("")}</nav>` : ""}
        <a class="btn" href="${collUrl(slug)}">Shop ${title.toLowerCase()}</a>
      </div>
    </article>`;
}

/* ============================================================
   Component: Quick view
   ============================================================ */
const QuickView = {
  render() {
    return `
      <div class="modal" id="quickView" role="dialog" aria-modal="true" aria-label="Quick view" aria-hidden="true">
        <div class="modal-scrim" data-close></div>
        <div class="modal-box" id="quickViewBox"></div>
      </div>`;
  },
  init() {
    const el = $("#quickView");
    el.addEventListener("click", e => { if (e.target.closest("[data-close]")) this.close(); });
  },
  open(slug) {
    const p = bySlug(slug);
    if (!p) return;
    const sizes = productSizes(p);
    let size = sizes[0].ml, qty = 1;
    const box = $("#quickViewBox");
    box.innerHTML = `
      <button class="icon-btn modal-close" data-close aria-label="Close">${icon("close")}</button>
      <div class="media${isSkincare(p) ? " square" : ""}"><img src="${fullSrc(p.images[0])}" alt="${esc(p.name)}" width="1600" height="1066"></div>
      <div class="body buybox">
        <p class="meta-line">${esc(productMeta(p))}</p>
        <h1>${esc(p.name)}</h1>
        <p class="summary">${esc(p.desc || p.whatItDoes || "")}</p>
        <p class="price" id="qvPrice"></p>
        <p class="price-note">+ ${fmt(AURORA.deliveryFee)} delivery anywhere in Bangladesh</p>
        ${variantPicker(sizes, size, "qvSizes")}
        ${hasPrice(p) ? `<div class="buy-row">
          ${qtyControl("qv")}
          <button class="btn" id="qvAdd">Add to bag</button>
        </div>` : askButton(p)}
        <a class="link full-link" href="product.html?p=${p.slug}">View full details ${icon("arrow")}</a>
      </div>`;
    const refresh = () => {
      $("#qvPrice").innerHTML = hasPrice(p) ? priceHTML(productSizes(p).find(s => s.ml === size)) : priceText(p);
      $("#qvSizesLabel").textContent = sizeLabel(p.slug, size);
      if ($("#qvQty")) $("#qvQty").textContent = qty;
    };
    bindVariantPicker($("#qvSizes"), ml => { size = ml; refresh(); });
    refresh();
    Layer.open($("#quickView"));
    if (!hasPrice(p)) return;
    $("#qvDec").addEventListener("click", () => { if (qty > 1) qty--; refresh(); });
    $("#qvInc").addEventListener("click", () => { qty++; refresh(); });
    $("#qvAdd").addEventListener("click", () => { this.close(); Cart.add(p.slug, size, qty); });
  },
  close() { Layer.close($("#quickView")); }
};

function variantPicker(sizes, current, id) {
  if (sizes.length === 1) return `<div class="opt-head"${sizes[0].label ? "" : " hidden"}>Size <span id="${id}Label">${esc(sizes[0].label)}</span></div><div id="${id}" hidden></div>`;
  return `
    <div class="opt-head">Size <span id="${id}Label">${sizes.find(s => s.ml === current)?.label || ""}</span></div>
    <div class="variant-grid" id="${id}" role="radiogroup" aria-label="Size">
      ${sizes.map(s => `
        <button class="variant" role="radio" aria-checked="${s.ml === current}" data-ml="${s.ml}">
          ${s.label}${typeof s.price === "number" ? `<small>${fmt(s.price)}</small>` : ""}
        </button>`).join("")}
    </div>`;
}
function bindVariantPicker(group, onChange) {
  const btns = $$(".variant", group);
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => x.setAttribute("aria-checked", "false"));
    b.setAttribute("aria-checked", "true");
    onChange(+b.dataset.ml);
  }));
}
const qtyControl = id => `
  <div class="qty" aria-label="Quantity">
    <button id="${id}Dec" aria-label="Decrease quantity">${icon("minus")}</button>
    <span id="${id}Qty" aria-live="polite">1</span>
    <button id="${id}Inc" aria-label="Increase quantity">${icon("plus")}</button>
  </div>`;

/* ============================================================
   Component: Cart drawer + WhatsApp checkout
   ============================================================ */
const CART_KEY = "aurora_cart_v1";
const CUSTOMER_KEY = "aurora_customer_v1";

const Cart = {
  view: "bag",     /* bag | checkout | done */
  lastOrder: null,
  items() {
    /* drop anything no longer orderable, including sizes that have since changed */
    return store.get(CART_KEY, []).filter(i => { const p = bySlug(i.slug); return p && hasPrice(p) && productSizes(p).some(s => s.ml === i.size); });
  },
  save(items) { store.set(CART_KEY, items); this.update(); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  subtotal() { return this.items().reduce((n, i) => n + sizePrice(i.slug, i.size) * i.qty, 0); },
  add(slug, size, qty) {
    const items = this.items();
    const hit = items.find(i => i.slug === slug && i.size === size);
    if (hit) hit.qty += qty; else items.push({ slug, size, qty });
    this.view = "bag";
    this.save(items);
    this.open();
  },
  setQty(idx, delta) {
    const items = this.items();
    if (!items[idx]) return;
    items[idx].qty += delta;
    if (items[idx].qty <= 0) items.splice(idx, 1);
    this.save(items);
  },
  remove(idx) { const items = this.items(); items.splice(idx, 1); this.save(items); },
  clear() { this.save([]); },

  orderText(c, id) {
    const items = this.items();
    const lines = items.map(i => `• ${bySlug(i.slug).name}${sizeLabel(i.slug, i.size) ? ` — ${sizeLabel(i.slug, i.size)}` : ""} × ${i.qty} = ${sizePrice(i.slug, i.size) * i.qty} Tk${isPreorder(bySlug(i.slug)) ? " (pre-order)" : ""}`);
    const pre = items.some(i => isPreorder(bySlug(i.slug)));
    return [
      "Hello AuroraBD! I would like to place an order:",
      ...(id ? [`Order number: ${id}`] : []),
      ...lines,
      `Subtotal: ${this.subtotal()} Tk`,
      `Delivery: ${AURORA.deliveryFee} Tk`,
      `Total: ${this.subtotal() + AURORA.deliveryFee} Tk`,
      ...(pre ? [`Pre-order skincare at the pre-order price (orders by ${preorderEnds()})`] : []),
      "",
      `Name: ${c.name}`,
      `Phone: ${c.phone}`,
      `Address: ${c.address}`,
      ...(c.note ? [`Note: ${c.note}`] : []),
      "Payment: Cash on delivery"
    ].join("\n");
  },

  render() {
    return `
      <aside class="drawer right" id="cartDrawer" aria-label="Shopping bag" aria-hidden="true">
        <div class="drawer-head">
          <h2 id="cartTitle">Your bag</h2>
          <button class="icon-btn" data-close aria-label="Close bag">${icon("close")}</button>
        </div>
        <div class="drawer-body" id="cartBody"></div>
        <div class="drawer-foot" id="cartFoot"></div>
      </aside>`;
  },
  init() {
    const el = $("#cartDrawer");
    $("[data-close]", el).addEventListener("click", () => Layer.close(el));
    el.addEventListener("click", e => {
      const t = e.target.closest("button, a");
      if (!t) return;
      if (t.dataset.inc) this.setQty(+t.dataset.inc, 1);
      else if (t.dataset.dec) this.setQty(+t.dataset.dec, -1);
      else if (t.dataset.rm) this.remove(+t.dataset.rm);
      else if (t.dataset.go) { this.view = t.dataset.go; this.update(); $("#cartBody").scrollTop = 0; }
      else if (t.dataset.finish !== undefined) { this.view = "bag"; this.lastOrder = null; Layer.close(el); }
    });
    el.addEventListener("submit", e => {
      if (e.target.id !== "checkoutForm") return;
      e.preventDefault();
      if (this.busy) return;
      const f = e.target;
      const c = {
        name: f.name.value.trim(), phone: f.phone.value.trim(),
        address: f.address.value.trim(), note: f.note.value.trim()
      };
      let ok = true;
      const check = (name, valid) => {
        f[name].closest(".field").classList.toggle("has-error", !valid);
        f[name].setAttribute("aria-invalid", String(!valid));
        if (!valid && ok) { f[name].focus(); ok = false; }
      };
      check("name", c.name.length > 1);
      check("phone", /^(\+?88)?01[3-9]\d{8}$/.test(c.phone.replace(/[\s-]/g, "")));
      check("address", c.address.length > 5);
      if (!ok) return;
      store.set(CUSTOMER_KEY, { name: c.name, phone: c.phone, address: c.address });

      const id = "AUR-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      const viaWhatsApp = e.submitter?.value === "whatsapp" && waConfigured();
      /* Open WhatsApp right away, inside the click, so browsers don't block it as a pop-up */
      const waUrl = waConfigured() ? waLink(this.orderText(c, id)) : "";
      if (viaWhatsApp) window.open(waUrl, "_blank", "noopener");
      this.placeOrder(c, id, viaWhatsApp, waUrl);
    });
    this.update();
  },
  /* Save the order to Netlify Forms (form "order"). The customer stays on the site;
     with "Place order on WhatsApp" the same order (same number) also opens in WhatsApp. */
  async placeOrder(c, id, viaWhatsApp, waUrl) {
    this.busy = true;
    const btns = $$("#placeOrderBtn, #placeOrderWa"), err = $("#orderError");
    btns.forEach(b => { b.disabled = true; });
    $("#placeOrderBtn").textContent = "Placing your order…";
    err.hidden = true;

    const items = this.items();
    const subtotal = this.subtotal(), total = subtotal + AURORA.deliveryFee;
    const lines = items.map(i => {
      const name = bySlug(i.slug).name, size = sizeLabel(i.slug, i.size);
      return `${name}${size ? ` (${size})` : ""} × ${i.qty} = ${sizePrice(i.slug, i.size) * i.qty} Tk${isPreorder(bySlug(i.slug)) ? " [pre-order]" : ""}`;
    });
    const fields = {
      "form-name": "order",
      "bot-field": "",
      order_id: id,
      channel: viaWhatsApp ? "Website + WhatsApp" : "Website",
      name: c.name,
      phone: c.phone,
      address: c.address,
      note: c.note,
      items: lines.join("\n"),
      subtotal: `${subtotal} Tk`,
      delivery: `${AURORA.deliveryFee} Tk`,
      total: `${total} Tk`,
      payment: "Cash on delivery",
      preorder: items.some(i => isPreorder(bySlug(i.slug))) ? `Yes — contains pre-order skincare (orders by ${preorderEnds()})` : "No",
      placed_at: new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })
    };

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields).toString()
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.lastOrder = { ...c, id, total, viaWhatsApp, waUrl,
        lines: items.map((i, n) => ({ text: lines[n], amount: sizePrice(i.slug, i.size) * i.qty })) };
      this.busy = false;
      this.view = "done";
      this.save([]);                        /* order placed — empty the bag */
      $("#cartBody").scrollTop = 0;
    } catch {
      this.busy = false;
      btns.forEach(b => { b.disabled = false; });
      $("#placeOrderBtn").textContent = "Place order";
      err.hidden = false;
      err.innerHTML = viaWhatsApp
        ? `We couldn't save your order on the website, but WhatsApp has opened with your full order — just tap <strong>Send</strong> there. <a href="${waUrl}" target="_blank" rel="noopener">Open WhatsApp again</a>.`
        : `We couldn't place your order — please check your internet connection and try again.${waUrl ? ` If it keeps failing, <a href="${waUrl}" target="_blank" rel="noopener">send your order to us on WhatsApp</a>.` : ""}`;
    }
  },
  open() { this.update(); Layer.open($("#cartDrawer")); },

  update() {
    $$(".cart-count").forEach(b => { const n = this.count(); b.textContent = n || ""; b.dataset.n = n; });
    const body = $("#cartBody"), foot = $("#cartFoot");
    if (!body) return;
    const items = this.items();
    const total = this.subtotal() + AURORA.deliveryFee;
    $("#cartTitle").textContent = { bag: "Your bag", checkout: "Delivery details", done: "Order placed" }[this.view];

    if (this.view === "done" && this.lastOrder) {
      const o = this.lastOrder;
      body.innerHTML = `
        <div class="confirm" role="status">
          <div class="tick">${icon("check")}</div>
          <h3>Thank you for your order!</h3>
          <p>Your order has been successfully placed and confirmed. We appreciate your trust in us and look forward to serving you.</p>
          <div class="order-sum" style="text-align:left">
            <div><span>Order number</span><strong>${esc(o.id)}</strong></div>
            ${o.lines.map(l => `<div><span>${esc(l.text.replace(/ = \d+ Tk/, "").replace(" [pre-order]", " · Pre-order"))}</span><span>${fmt(l.amount)}</span></div>`).join("")}
            <div><span>Delivery</span><span>${fmt(AURORA.deliveryFee)}</span></div>
            <div class="grand"><span>Total · Cash on delivery</span><span>${fmt(o.total)}</span></div>
          </div>
          <p class="small" style="margin-top:16px">Delivering to ${esc(o.name)}, ${esc(o.address)}. We'll contact you at ${esc(o.phone)} about your delivery.</p>
          ${o.waUrl ? (o.viaWhatsApp
            ? `<p class="small">We've also opened WhatsApp with your order &mdash; tap <strong>Send</strong> there. <a href="${o.waUrl}" target="_blank" rel="noopener" style="text-decoration:underline">Open WhatsApp again</a></p>`
            : `<p class="small"><a href="${o.waUrl}" target="_blank" rel="noopener" style="text-decoration:underline">Also send your order details on WhatsApp</a> (optional)</p>`) : ""}
        </div>`;
      foot.innerHTML = `<button class="btn btn-block" data-finish>Continue shopping</button>`;
      return;
    }

    if (!items.length) {
      this.view = "bag";
      body.innerHTML = `
        <div class="cart-empty">
          ${icon("bag")}
          <p>Your bag is empty.</p>
          <a class="btn btn-outline" href="${collUrl("perfume")}">Shop perfume</a>
        </div>`;
      foot.innerHTML = `<div class="ship-note">${icon("truck")} Flat ${fmt(AURORA.deliveryFee)} delivery anywhere in Bangladesh · Cash on delivery</div>`;
      return;
    }

    const totals = `
      <div class="totals">
        <div><span>Subtotal</span><span>${fmt(this.subtotal())}</span></div>
        <div class="muted-row"><span>Delivery (all Bangladesh)</span><span>${fmt(AURORA.deliveryFee)}</span></div>
        <div class="grand"><span>Total</span><span>${fmt(total)}</span></div>
      </div>`;

    if (this.view === "checkout") {
      const c = store.get(CUSTOMER_KEY, {});
      body.innerHTML = `
        <form id="checkoutForm" class="form-grid" novalidate>
          <div class="field">
            <label for="co-name">Full name</label>
            <input id="co-name" name="name" autocomplete="name" required value="${esc(c.name || "")}">
            <p class="err">Please enter your name.</p>
          </div>
          <div class="field">
            <label for="co-phone">Mobile number</label>
            <input id="co-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="01XXXXXXXXX" required value="${esc(c.phone || "")}">
            <p class="err">Please enter a valid Bangladeshi mobile number (01XXXXXXXXX).</p>
          </div>
          <div class="field">
            <label for="co-address">Delivery address</label>
            <textarea id="co-address" name="address" autocomplete="street-address" placeholder="House, road, area, thana, district" required>${esc(c.address || "")}</textarea>
            <p class="err">Please enter your full delivery address.</p>
          </div>
          <div class="field">
            <label for="co-note">Order note <span>(optional)</span></label>
            <input id="co-note" name="note" placeholder="e.g. preferred delivery time">
          </div>
        </form>
        <div class="order-sum">
          ${items.map(i => `<div><span>${esc(bySlug(i.slug).name)}${sizeLabel(i.slug, i.size) ? ` · ${sizeLabel(i.slug, i.size)}` : ""} × ${i.qty}</span><span>${fmt(sizePrice(i.slug, i.size) * i.qty)}</span></div>`).join("")}
          <div><span>Delivery</span><span>${fmt(AURORA.deliveryFee)}</span></div>
          <div class="grand"><span>Total · Cash on delivery</span><span>${fmt(total)}</span></div>
        </div>
        <button class="back-btn" data-go="bag">${icon("left")} Back to bag</button>`;
      foot.innerHTML = `
        <p class="order-error" id="orderError" role="alert" hidden></p>
        <button class="btn btn-block" type="submit" form="checkoutForm" id="placeOrderBtn">Place order</button>
        ${waConfigured() ? `<button class="btn btn-outline btn-block" type="submit" form="checkoutForm" name="via" value="whatsapp" id="placeOrderWa" style="margin-top:10px">${icon("whatsapp")} Place order on WhatsApp</button>` : ""}
        <p class="cart-note">Pay ${fmt(total)} in cash when your order arrives.</p>`;
      return;
    }

    body.innerHTML = items.map((i, idx) => {
      const p = bySlug(i.slug);
      return `
        <div class="cart-line">
          <a href="product.html?p=${p.slug}"><img src="${thumbSrc(p.images[0])}" alt="${esc(p.name)}" width="76" height="76" loading="lazy"></a>
          <div>
            <h3><a href="product.html?p=${p.slug}">${esc(p.name)}</a></h3>
            <p class="v">${[sizeLabel(i.slug, i.size), fmt(sizePrice(i.slug, i.size)), isPreorder(p) ? "Pre-order" : ""].filter(Boolean).join(" · ")}</p>
            <div class="qty">
              <button data-dec="${idx}" aria-label="Decrease quantity of ${esc(p.name)}">${icon("minus")}</button>
              <span>${i.qty}</span>
              <button data-inc="${idx}" aria-label="Increase quantity of ${esc(p.name)}">${icon("plus")}</button>
            </div>
          </div>
          <div class="right">
            <span>${fmt(sizePrice(i.slug, i.size) * i.qty)}</span>
            <button class="rm" data-rm="${idx}">Remove</button>
          </div>
        </div>`;
    }).join("") + `<div class="ship-note">${icon("truck")} Flat ${fmt(AURORA.deliveryFee)} delivery anywhere in Bangladesh · Cash on delivery</div>`;
    foot.innerHTML = `${totals}<button class="btn btn-block" data-go="checkout">Checkout</button>`;
  }
};

/* ============================================================
   Component: Footer
   ============================================================ */
function renderFooter() {
  const social = Object.entries(AURORA.social || {}).filter(([, url]) => url)
    .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="Aurora on ${k[0].toUpperCase() + k.slice(1)}">${icon(k)}</a>`);
  if (waConfigured()) social.push(`<a href="${waLink("Hello AuroraBD!")}" target="_blank" rel="noopener" aria-label="Chat with Aurora on WhatsApp">${icon("whatsapp")}</a>`);
  const col = (title, links) => `
    <div>
      <h2>${title}</h2>
      <ul>${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
    </div>`;
  $("#site-footer").outerHTML = `
    <section class="newsletter" aria-label="Newsletter">
      <div class="container inner">
        <div>
          <h2 class="h3">New arrivals, first.</h2>
          <p>Be the first to hear about new scents, skincare and offers. No spam — just Aurora news.</p>
        </div>
        <form class="nl-form" id="nlForm">
          <label class="sr-only" for="nlEmail">Email address</label>
          <input id="nlEmail" type="email" name="email" placeholder="Your email address" required autocomplete="email">
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="logo" href="index.html" aria-label="Aurora — home"><span class="logo-word">AURORA</span><span class="logo-tag">A Signature of Confidence</span></a>
          <p>Long-lasting fragrances at honest prices, and a growing range of everyday skincare — delivered to your door anywhere in Bangladesh.</p>
          ${social.length ? `<div class="socials" style="margin-top:20px">${social.join("")}</div>` : ""}
          <p class="footer-contact">WhatsApp: ${esc(AURORA.whatsapp)}</p>
        </div>
        ${col("Shop", [["All Products", collUrl("all")], ["Perfume", collUrl("perfume")], ["Skincare", collUrl("skincare")], ["Best Sellers", collUrl("best-sellers")], ["New Arrivals", collUrl("new-arrivals")]])}
        ${col("Perfume", [["Men", collUrl("perfume-men")], ["Women", collUrl("perfume-women")], ["Unisex", collUrl("perfume-unisex")], ["Perfume Oil", collUrl("perfume-oil")], ["Roll-On", collUrl("roll-on")]])}
        ${col("Support", [["Contact Us", "contact.html"], ["FAQ", "contact.html#faq"], ["Shipping", "help.html#shipping"], ["Returns", "help.html#returns"], ["Order Tracking", "help.html#tracking"]])}
        ${col("Aurora", [["Our Story", "about.html"], ["Find Your Scent", "index.html#scents"]])}
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} AuroraBD. All rights reserved.</span>
        <ul><li><a href="help.html#privacy">Privacy Policy</a></li><li><a href="help.html#terms">Terms &amp; Conditions</a></li></ul>
      </div>
    </footer>`;
}

function initNewsletter() {
  const form = $("#nlForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new URLSearchParams({ "form-name": "newsletter", email: $("input", form).value });
    try {
      await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() });
    } catch { /* local preview — ignore */ }
    form.outerHTML = `<p class="nl-done">Thank you — you're on the list.</p>`;
  });
}

/* ------------------ Shared shell ------------------ */
function renderShell() {
  renderHeader();
  renderFooter();
  const el = document.createElement("div");
  el.innerHTML = `<div class="scrim" id="scrim"></div>${MobileMenu.render()}${Search.render()}${Cart.render()}${QuickView.render()}`;
  while (el.firstElementChild) document.body.appendChild(el.firstElementChild);
  $("#scrim").addEventListener("click", () => Layer.closeTop());
  document.addEventListener("keydown", e => { if (e.key === "Escape") Layer.closeTop(); });
  MobileMenu.init(); Search.init(); Cart.init(); QuickView.init();
  initHeader(); initNewsletter(); initCardActions();
}

/* ------------------ Reveal on scroll ------------------ */
const revealIO = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
}, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }) : null;
function initReveal(root = document) {
  $$("[data-reveal]:not(.in)", root).forEach((el, i) => {
    if (!revealIO) { el.classList.add("in"); return; }
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    revealIO.observe(el);
  });
}

/* ============================================================
   Page: Home
   ============================================================ */
function initHome() {
  initHeroSlideshow();

  /* Fragrance & Skincare — two equal panels */
  const worlds = $("#worlds");
  if (worlds) worlds.innerHTML = [
    { title: "Fragrance", slug: "perfume", image: "lattafa-khamrah", focus: "50% 50%",
      desc: "Long-lasting perfumes for men, women and everyone — from fresh and citrus to woody, sweet and oud. Sizes from 10ml.",
      links: ["perfume-men", "perfume-women", "perfume-unisex", "perfume-best-sellers"] },
    { title: "Skincare", slug: "skincare", image: "the-face-shop-rice-ceramide-moisturizing-cream", focus: "32% 50%",
      desc: "Korean skincare from COSRX, Anua, Beauty of Joseon, SKIN1004 and more — cleansers, serums, moisturizers and sunscreens.",
      links: SKINCARE_CATEGORIES.map(k => `skincare-${k.key}`) }
  ].map(worldCard).join("");

  /* The Aurora Edit — best-selling perfume and featured skincare, alternating */
  const edit = $("#auroraEdit");
  if (edit) {
    const best = collectionProducts("best-sellers");
    const scents = [...best, ...FEATURED_SLUGS.map(bySlug).filter(p => p && !best.includes(p))];
    const skin = skincarePicks();
    const n = Math.min(8, Math.max(scents.length, skin.length));
    const mixed = [];
    for (let i = 0; i < n; i++) {
      if (scents[i]) mixed.push(scents[i]);
      if (skin[i]) mixed.push(skin[i]);
    }
    edit.innerHTML = productGrid(mixed);
    initSlider(edit.closest(".slider-wrap"));
  }

  /* New arrivals */
  const fresh = $("#newArrivals");
  if (fresh) {
    const list = collectionProducts("new-arrivals");
    if (list.length) fresh.innerHTML = productGrid(list.slice(0, 8));
    else fresh.closest("section").hidden = true;
  }

  initSizePicker();
  initFeaturedTabs();
  initScentFinder();
  initRoutine();
  initPreorderBand();
}

/* Skincare pre-order band with countdown — hidden once the offer ends */
function initPreorderBand() {
  const band = $("#preorderBand");
  if (!band || !preorderActive() || !countOf("preorder")) return;
  const off = preorderOff();
  $("#po-title").textContent = `${off[0].toUpperCase()}${off.slice(1)} off Korean skincare`;
  $("#poText").textContent = `Pre-order before ${preorderEnds()} and get the pre-order price on cleansers, serums, moisturizers and sunscreens. The pre-order discount applies to skincare only.`;
  $("#poProducts").innerHTML = skincarePicks().filter(isPreorder).slice(0, 3).map(p => {
    const s = productSizes(p).reduce((a, b) => (b.price < a.price ? b : a));
    return `
      <a class="po-item" href="product.html?p=${p.slug}">
        <img src="${thumbSrc(p.images[0])}" alt="" loading="lazy" width="720" height="720">
        <div><strong>${esc(p.name)}</strong><span class="p">${priceHTML(s)}</span></div>
      </a>`;
  }).join("");
  const end = new Date(AURORA.preorder.endsAt).getTime();
  const count = $("#poCount");
  const tick = () => {
    const left = Math.max(0, end - Date.now());
    if (!left) { band.hidden = true; clearInterval(timer); return; }
    const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
    count.innerHTML = [[d, "Days"], [h, "Hours"], [m, "Mins"], [s, "Secs"]]
      .map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`).join("");
  };
  const timer = setInterval(tick, 1000);
  tick();
  band.hidden = false;
}

/* Skincare in the curated SKINCARE_FEATURED order, then the rest */
function skincarePicks() {
  const featured = (typeof SKINCARE_FEATURED !== "undefined" ? SKINCARE_FEATURED : []).map(bySlug).filter(p => p && isSkincare(p));
  return [...featured, ...PRODUCTS.filter(p => isSkincare(p) && !featured.includes(p))];
}

/* Hero: autoplay with progress bars, arrows, swipe, pause on hover / hidden tab */
function initHeroSlideshow() {
  const hero = $(".hero");
  const slides = hero ? $$(".hero-slide", hero) : [];
  if (slides.length < 2) return;
  const bars = $$(".hero-bars button", hero), count = $(".hero-count", hero);
  const ms = 6000, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  hero.style.setProperty("--hero-ms", `${ms}ms`);
  let cur = 0, timer = null, paused = false;

  const schedule = () => {
    clearTimeout(timer);
    if (!paused && !reduce) timer = setTimeout(() => show(cur + 1), ms);
  };
  const show = n => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("is-on", i === cur);
      s.setAttribute("aria-hidden", String(i !== cur));
      $$("a, button", s).forEach(el => { el.tabIndex = i === cur ? 0 : -1; });
    });
    bars.forEach((b, i) => {
      b.classList.toggle("is-done", i < cur);
      b.classList.remove("is-on");
      b.setAttribute("aria-current", String(i === cur));
    });
    void bars[cur]?.offsetWidth;          /* restart the progress animation */
    bars[cur]?.classList.add("is-on");
    if (count) count.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    schedule();
  };
  const pause = on => { paused = on; hero.classList.toggle("is-paused", on); if (on) clearTimeout(timer); else schedule(); };

  $("[data-hero-prev]", hero)?.addEventListener("click", () => show(cur - 1));
  $("[data-hero-next]", hero)?.addEventListener("click", () => show(cur + 1));
  bars.forEach((b, i) => b.addEventListener("click", () => show(i)));
  hero.addEventListener("mouseenter", () => pause(true));
  hero.addEventListener("mouseleave", () => pause(false));
  hero.addEventListener("focusin", () => pause(true));
  hero.addEventListener("focusout", e => { if (!hero.contains(e.relatedTarget)) pause(false); });
  document.addEventListener("visibilitychange", () => pause(document.hidden));
  hero.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let x0 = null;
  hero.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  show(0);
}

/* Size & price picker — prices come straight from AURORA.sizes / PREMIUM_PRICES */
function initSizePicker() {
  const wrap = $("#sizePicker");
  if (!wrap) return;
  const premium = typeof PREMIUM_PRICES === "object" ? PREMIUM_PRICES : null;
  const notes = {
    10: "A travel-friendly size — the easiest way to try a new scent.",
    15: "A little more, to live with a scent for a few weeks.",
    30: "A comfortable everyday size.",
    50: "A generous size for your signature scent.",
    100: "The lowest price per ml."
  };
  wrap.innerHTML = AURORA.sizes.map((s, i) =>
    `<button role="radio" aria-checked="${i === 0}" data-ml="${s.ml}">${s.ml}<small>ml</small></button>`).join("");
  const draw = ml => {
    const reg = AURORA.sizes.find(s => s.ml === ml).price;
    $("#sizeRegular").textContent = fmt(reg);
    $("#sizeRegularPer").textContent = `${fmt(Math.round(reg / ml))} per ml`;
    if (premium?.[ml]) {
      $("#sizePremium").textContent = fmt(premium[ml]);
      $("#sizePremiumPer").textContent = `${fmt(Math.round(premium[ml] / ml))} per ml`;
    }
    $("#sizeNote").textContent = notes[ml] || "";
    const cta = $("#sizeCta");
    cta.href = `shop.html?c=perfume&size=${ml}`;
    cta.textContent = `Shop ${ml}ml perfumes`;
  };
  const btns = $$("button", wrap);
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => x.setAttribute("aria-checked", "false"));
    b.setAttribute("aria-checked", "true");
    draw(+b.dataset.ml);
  }));
  if (!premium) $("#sizePremiumBox")?.remove();
  draw(AURORA.sizes[0].ml);
}

/* Featured — Fragrance | Skincare tabs */
function initFeaturedTabs() {
  const tabs = $$("#featuredTabs .tab"), fgrid = $("#featuredGrid"), fmore = $("#featuredMore");
  if (!fgrid) return;
  const rank = p => { const i = FEATURED_SLUGS.indexOf(p.slug); return i < 0 ? (p.badge === "Bestseller" ? 50 : p.badge === "New" ? 60 : 70) : i; };
  const lists = {
    perfume: () => [...collectionProducts("perfume")].sort((a, b) => rank(a) - rank(b)),
    skincare: skincarePicks
  };
  const pick = slug => {
    const list = (lists[slug] || (() => collectionProducts(slug)))();
    fgrid.innerHTML = productGrid(list.slice(0, 8), { reveal: false });
    replay(fgrid, "fade-swap");
    fmore.href = collUrl(slug);
    fmore.innerHTML = `View all ${COLLECTIONS[slug].title.toLowerCase()} (${countOf(slug)}) ${icon("arrow")}`;
  };
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => { x.setAttribute("aria-selected", "false"); x.tabIndex = -1; });
    t.setAttribute("aria-selected", "true"); t.tabIndex = 0;
    pick(t.dataset.coll);
  }));
  arrowKeys($("#featuredTabs"), tabs);
  tabs.forEach(t => { if (!countOf(t.dataset.coll)) t.hidden = true; });
  pick(tabs.find(t => !t.hidden)?.dataset.coll || "perfume");
}

/* Build your skincare routine — pick a step, see its products in place */
const ROUTINE = [
  { key: "cleanser", step: "Cleanse", when: "Morning & night",
    desc: "Start with clean skin. A gentle cleanser removes oil, dirt and sunscreen without stripping your skin." },
  { key: "toner", step: "Tone", when: "Morning & night",
    desc: "Rebalances skin after cleansing and helps it take in what comes next." },
  { key: "serum", step: "Treat", when: "Morning & night",
    desc: "Serums, essences and ampoules target what matters to you — glow, dark spots, hydration or pores." },
  { key: "moisturizer", step: "Moisturize", when: "Morning & night",
    desc: "Locks in hydration and supports your skin barrier so skin stays soft and comfortable." },
  { key: "sunscreen", step: "Protect", when: "Every morning",
    desc: "Finish every morning with SPF to protect your skin from UVA and UVB rays." }
];
function initRoutine() {
  const stepsEl = $("#routineSteps");
  if (!stepsEl) return;
  const steps = ROUTINE.map(s => ({ ...s, slug: `skincare-${s.key}`, list: collectionProducts(`skincare-${s.key}`) })).filter(s => s.list.length);
  if (!steps.length) { stepsEl.closest("section").hidden = true; return; }
  stepsEl.innerHTML = steps.map((s, i) => `
    <button role="tab" aria-selected="${i === 0}" data-i="${i}" tabindex="${i === 0 ? 0 : -1}">
      <span class="num" aria-hidden="true">${i + 1}</span>
      <span><strong>${s.step}</strong><small>${labelOf(SKINCARE_CATEGORIES, s.key)} · ${s.list.length}</small></span>
    </button>`).join("");
  const info = $("#routineInfo"), track = $("#routineTrack");
  const pick = i => {
    const s = steps[i];
    info.innerHTML = `
      <span class="step-no">Step ${i + 1} · ${s.when}</span>
      <h3 class="h3">${s.step}</h3>
      <p>${s.desc}</p>
      <span class="count">${s.list.length} ${labelOf(SKINCARE_CATEGORIES, s.key).toLowerCase()}${s.list.length === 1 ? "" : "s"}</span>
      <a class="btn" href="${collUrl(s.slug)}">Shop ${labelOf(SKINCARE_CATEGORIES, s.key).toLowerCase()}s</a>`;
    track.innerHTML = productGrid(s.list, { reveal: false });
    track.scrollLeft = 0;
    replay(info, "fade-swap"); replay(track, "fade-swap");
    track.dispatchEvent(new Event("scroll"));
  };
  const btns = $$("button", stepsEl);
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => { x.setAttribute("aria-selected", "false"); x.tabIndex = -1; });
    b.setAttribute("aria-selected", "true"); b.tabIndex = 0;
    pick(+b.dataset.i);
  }));
  arrowKeys(stepsEl, btns);
  initSlider(track.closest(".slider-wrap"));
  pick(0);

  /* Skin type & concern shortcuts — only those with products */
  const chips = $("#skinChips");
  const links = [...SKIN_TYPES.map(t => [`skin-${t.key}`, t.label]), ...SKIN_CONCERNS.map(t => [`concern-${t.key}`, t.label])]
    .filter(([slug]) => countOf(slug) > 0);
  if (chips && links.length) {
    chips.insertAdjacentHTML("beforeend", links.map(([slug, label]) => `<a class="pill" href="${collUrl(slug)}">${label}</a>`).join(""));
    chips.hidden = false;
  }
}

/* Find your signature scent — pick a family, see its perfumes in place */
function initScentFinder() {
  const chipsEl = $("#finderChips");
  if (!chipsEl) return;
  const fams = SCENT_FAMILIES.map(f => ({ f, list: collectionProducts(`scent-${f.key}`) })).filter(x => x.list.length);
  if (!fams.length) { chipsEl.closest("section").hidden = true; return; }
  chipsEl.innerHTML = fams.map(({ f }, i) => `
    <button role="tab" aria-selected="${i === 0}" data-key="${f.key}" tabindex="${i === 0 ? 0 : -1}">
      <span class="sw" style="background:${f.color}" aria-hidden="true"></span>${f.label}
    </button>`).join("");
  const info = $("#finderInfo"), track = $("#finderTrack");
  const pick = key => {
    const { f, list } = fams.find(x => x.f.key === key);
    info.style.backgroundColor = f.color;
    info.innerHTML = `
      <h3 class="h3">${f.label}</h3>
      <p>${f.desc}</p>
      <span class="count">${list.length} perfume${list.length === 1 ? "" : "s"} in this family</span>
      <a class="btn" href="${collUrl(`scent-${f.key}`)}">Shop ${f.label.toLowerCase()}</a>`;
    track.innerHTML = productGrid(list, { reveal: false });
    track.scrollLeft = 0;
    replay(info, "fade-swap"); replay(track, "fade-swap");
    track.dispatchEvent(new Event("scroll"));
  };
  const btns = $$("button", chipsEl);
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => { x.setAttribute("aria-selected", "false"); x.tabIndex = -1; });
    b.setAttribute("aria-selected", "true"); b.tabIndex = 0;
    pick(b.dataset.key);
  }));
  arrowKeys(chipsEl, btns);
  initSlider(track.closest(".slider-wrap"));
  pick(fams[0].f.key);
}

/* Restart a one-shot CSS animation */
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
/* Left / right arrow keys move between tabs */
function arrowKeys(list, items) {
  list?.addEventListener("keydown", e => {
    const i = items.findIndex(t => t.getAttribute("aria-selected") === "true");
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const t = items[(n + items.length) % items.length]; t.click(); t.focus();
  });
}

/* ============================================================
   Page: Collection (shop.html?c=<slug>)
   ============================================================ */
function initCollection() {
  const params = new URLSearchParams(location.search);
  let slug = params.get("c") || LEGACY_CAT[params.get("cat")] || "all";
  if (!COLLECTIONS[slug]) slug = "all";
  const col = COLLECTIONS[slug];
  const base = collectionProducts(slug);
  document.body.dataset.group = col.group;
  $$(".nav-link").forEach(a => a.classList.toggle("is-current", a.getAttribute("href") === collUrl(GROUP_ROOT[col.group])));

  document.title = `${col.title} — AuroraBD`;
  $('meta[name="description"]')?.setAttribute("content", `${col.desc} Shop ${col.title.toLowerCase()} at AuroraBD with flat ৳${AURORA.deliveryFee} delivery across Bangladesh and cash on delivery.`);

  /* Collection header */
  const rootSlug = GROUP_ROOT[col.group];
  const crumbs = [["Home", "index.html"]];
  if (slug !== rootSlug) crumbs.push([COLLECTIONS[rootSlug].title === "All Products" ? "Shop" : COLLECTIONS[rootSlug].title, collUrl(rootSlug)]);
  crumbs.push([col.title, null]);
  const sub = (SUB_NAV[col.group] || []).filter(s => s === slug || countOf(s) > 0 || col.group !== "shop");
  $("#collectionHead").innerHTML = `
    <nav aria-label="Breadcrumb"><ol class="crumbs">${crumbs.map(([l, h]) => `<li>${h ? `<a href="${h}">${l}</a>` : `<span aria-current="page">${l}</span>`}</li>`).join("")}</ol></nav>
    <div class="page-head">
      <span class="eyebrow">${col.group === "shop" ? "Shop" : col.group === "perfume" ? "Perfume" : "Skincare"}</span>
      <h1 class="h1">${col.title}</h1>
      <p class="lede">${col.desc}</p>
      <p class="meta">${base.length ? `${base.length} product${base.length === 1 ? "" : "s"}` : "Coming soon"}</p>
      ${sub.length > 1 ? `<div class="sub-nav">${sub.map(s => `<a class="pill${s === slug ? " is-active" : ""}" href="${collUrl(s)}"${s === slug ? ' aria-current="page"' : ""}>${COLLECTIONS[s].nav || COLLECTIONS[s].title}${countOf(s) || s === slug ? "" : '<span class="tag-soon" style="margin-left:4px">Soon</span>'}</a>`).join("")}</div>` : ""}
    </div>`;

  const grid = $("#collectionGrid"), main = $("#collectionMain");
  if (!base.length) {
    main.classList.add("no-filters");
    main.innerHTML = emptyCollection(col);
    return;
  }

  /* Price filter: exact "From" prices when there are only a few, otherwise ranges */
  const useRanges = new Set(base.filter(hasPrice).map(fromPrice)).size > 4;
  const RANGES = [[0, 999], [1000, 1499], [1500, 1999], [2000, Infinity]];
  const priceKey = v => String(useRanges ? RANGES.find(([lo, hi]) => v >= lo && v <= hi)[0] : v);
  const priceLabel = k => !useRanges ? `From ${fmt(+k)}` : (([lo, hi]) => hi === Infinity ? `${fmt(lo)} and above` : lo === 0 ? `Under ${fmt(hi + 1)}` : `${fmt(lo)} – ${fmt(hi)}`)(RANGES.find(([lo]) => String(lo) === k));

  /* Facets — only the ones that actually split this collection */
  const facetDefs = [
    { key: "category", title: "Category", of: p => [isSkincare(p) ? "skincare" : "perfume"], label: k => ({ perfume: "Perfume", skincare: "Skincare" })[k] },
    { key: "gender", title: "Gender", of: p => isPerfume(p) && p.tag ? [p.tag] : [], label: k => GENDER[k], order: ["For Him", "For Her", "Unisex"] },
    { key: "type", title: "Type", of: p => isPerfume(p) ? [perfumeType(p)] : [], label: k => PERFUME_TYPES[k] },
    { key: "scent", title: "Scent family", of: scentKeys, label: k => labelOf(SCENT_FAMILIES, k), order: SCENT_FAMILIES.map(f => f.key) },
    { key: "skincareType", title: "Product type", of: p => isSkincare(p) ? skinCats(p) : [], label: k => labelOf(SKINCARE_CATEGORIES, k), order: SKINCARE_CATEGORIES.map(k => k.key) },
    { key: "brand", title: "Brand", of: p => isSkincare(p) && p.brand ? [p.brand] : [], label: k => k, sortAlpha: true },
    { key: "skin", title: "Skin type", of: p => p.skinTypes || [], label: k => labelOf(SKIN_TYPES, k) },
    { key: "concern", title: "Concern", of: p => p.concerns || [], label: k => labelOf(SKIN_CONCERNS, k) },
    { key: "price", title: "Price", of: p => hasPrice(p) ? [priceKey(fromPrice(p))] : [], label: priceLabel, order: null, sortNum: true }
  ].map(f => {
    const counts = new Map();
    base.forEach(p => f.of(p).forEach(v => counts.set(v, (counts.get(v) || 0) + 1)));
    let keys = [...counts.keys()];
    if (f.order) keys.sort((a, b) => f.order.indexOf(a) - f.order.indexOf(b));
    if (f.sortNum) keys.sort((a, b) => a - b);
    if (f.sortAlpha) keys.sort((a, b) => a.localeCompare(b));
    return { ...f, keys, counts };
  }).filter(f => f.keys.length > 1 || (f.key === "scent" && f.keys.length > 0 && !slug.startsWith("scent-") && base.length > 3));

  /* The size picker only makes sense where every product shares the perfume size list */
  const allSizes = !base.every(isPerfume) ? [] : [...new Map(base.flatMap(productSizes).map(s => [s.ml, s])).values()].sort((a, b) => a.ml - b.ml);
  const state = { sel: Object.fromEntries(facetDefs.map(f => [f.key, new Set()])), size: null, sort: params.get("sort") || "featured" };
  const presetSize = +params.get("size");
  if (allSizes.some(s => s.ml === presetSize)) state.size = presetSize;

  const facetsHTML = idp => facetDefs.map(f => `
    <fieldset class="facet">
      <legend>${f.title}</legend>
      ${f.keys.map(k => `<label><input type="checkbox" data-facet="${f.key}" value="${esc(k)}"> ${esc(f.label(k))} <span class="n">${f.counts.get(k)}</span></label>`).join("")}
    </fieldset>`).join("") + (allSizes.length > 1 ? `
    <fieldset class="facet">
      <legend>Size</legend>
      <label><input type="radio" name="${idp}-size" data-size="" checked> Any size</label>
      ${allSizes.map(s => `<label><input type="radio" name="${idp}-size" data-size="${s.ml}"> ${s.label}</label>`).join("")}
      <p class="hint">Shows prices for the size you pick.</p>
    </fieldset>` : "");

  $("#filtersSide").innerHTML = `<h2 class="sr-only">Filters</h2>${facetsHTML("fs")}`;
  $("#filterDrawerBody").innerHTML = facetsHTML("fd");
  if (!facetDefs.length && allSizes.length <= 1) { $("#filtersSide").remove(); $("#openFilters").remove(); main.classList.add("no-filters"); }

  const sortSel = $("#sortSelect");
  sortSel.value = state.sort;

  const apply = () => {
    let list = base.filter(p => facetDefs.every(f => {
      const s = state.sel[f.key];
      return !s.size || f.of(p).some(v => s.has(v));
    }));
    if (state.size) list = list.filter(p => productSizes(p).some(s => s.ml === state.size));
    const priceOf = p => (state.size ? productSizes(p).find(s => s.ml === state.size).price : fromPrice(p)) ?? Infinity;
    const newRank = p => p.badge === "New" ? 0 : 1;
    switch (state.sort) {
      case "price-asc": list.sort((a, b) => priceOf(a) - priceOf(b)); break;
      case "price-desc": list.sort((a, b) => priceOf(b) - priceOf(a)); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "new": list.sort((a, b) => newRank(a) - newRank(b)); break;
      case "best": list.sort((a, b) => (a.badge === "Bestseller" ? 0 : 1) - (b.badge === "Bestseller" ? 0 : 1)); break;
    }
    $("#resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length ? productGrid(list, { size: state.size }) : `
      <div class="empty-state" style="grid-column:1/-1">
        <h2>No matches</h2>
        <p>No products match these filters. Try removing one.</p>
        <div class="actions"><button class="btn btn-outline" data-clear-filters>Clear all filters</button></div>
      </div>`;
    initReveal(grid);

    /* Active filter chips */
    const chips = [];
    facetDefs.forEach(f => state.sel[f.key].forEach(k => chips.push(`<button data-remove="${f.key}" data-value="${esc(k)}">${esc(f.label(k))} ${icon("close")}</button>`)));
    if (state.size) chips.push(`<button data-remove="size">${sizeLabelFor(state.size)} ${icon("close")}</button>`);
    if (chips.length) chips.push(`<button class="clear" data-clear-filters>Clear all</button>`);
    $("#activeFilters").innerHTML = chips.join("");
    const n = facetDefs.reduce((t, f) => t + state.sel[f.key].size, 0) + (state.size ? 1 : 0);
    const fb = $("#openFilters .n"); if (fb) fb.textContent = n ? `(${n})` : "";

    /* Keep both filter UIs in sync */
    $$("[data-facet]").forEach(i => { i.checked = state.sel[i.dataset.facet].has(i.value); });
    $$("[data-size]").forEach(i => { i.checked = String(state.size || "") === i.dataset.size; });
  };
  const sizeLabelFor = ml => allSizes.find(s => s.ml === ml)?.label || `${ml}ml`;

  document.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.facet) { const s = state.sel[t.dataset.facet]; t.checked ? s.add(t.value) : s.delete(t.value); apply(); }
    else if (t.dataset.size !== undefined && t.type === "radio") { state.size = t.dataset.size ? +t.dataset.size : null; apply(); }
    else if (t.id === "sortSelect") {
      state.sort = t.value; apply();
      const u = new URL(location.href); state.sort === "featured" ? u.searchParams.delete("sort") : u.searchParams.set("sort", state.sort);
      history.replaceState(null, "", u);
    }
  });
  document.addEventListener("click", e => {
    const rm = e.target.closest("[data-remove]");
    if (rm) { rm.dataset.remove === "size" ? state.size = null : state.sel[rm.dataset.remove].delete(rm.dataset.value); apply(); return; }
    if (e.target.closest("[data-clear-filters]")) { facetDefs.forEach(f => state.sel[f.key].clear()); state.size = null; apply(); }
  });

  const fd = $("#filterDrawer");
  $("#openFilters")?.addEventListener("click", () => Layer.open(fd));
  $$("[data-close]", fd).forEach(b => b.addEventListener("click", () => Layer.close(fd)));
  apply();
}

function emptyCollection(col) {
  const isSkin = col.group === "skincare" && !hasSkincare();
  return `
    <div class="empty-state">
      <div class="mono" aria-hidden="true">${isSkin ? "Skin" : "Soon"}</div>
      <h2>${isSkin ? "Aurora skincare is on its way" : `${col.title} is coming soon`}</h2>
      <p>${isSkin
        ? "We're preparing our first skincare essentials. Leave your email below or message us on WhatsApp to hear first when they launch."
        : `We're adding this to the Aurora range soon. In the meantime, explore our ${col.group === "skincare" ? "skincare" : "perfume"} collection.`}</p>
      <div class="actions">
        <a class="btn" href="${collUrl(col.group === "skincare" ? "skincare" : "perfume")}">Shop ${col.group === "skincare" ? "skincare" : "perfume"}</a>
        ${waConfigured() ? `<a class="btn btn-outline" href="${waLink(`Hello AuroraBD! Please let me know when ${col.title} is available.`)}" target="_blank" rel="noopener">${icon("whatsapp")} Notify me</a>` : ""}
      </div>
    </div>`;
}

/* ============================================================
   Page: Product
   ============================================================ */
function initProduct() {
  const wrap = $("#pdp");
  if (!wrap) return;
  const slug = new URLSearchParams(location.search).get("p");
  const p = bySlug(slug);
  if (!p) {
    wrap.outerHTML = `<div class="empty-state"><h2>Product not found</h2><p>This product may have moved or is no longer available.</p><div class="actions"><a class="btn" href="shop.html">Shop all products</a></div></div>`;
    return;
  }
  const skinProduct = isSkincare(p);
  const groupSlug = skinProduct ? "skincare" : "perfume";
  document.body.dataset.group = groupSlug;
  $$(".nav-link").forEach(a => a.classList.toggle("is-current", a.getAttribute("href") === collUrl(groupSlug)));

  const metaDesc = `${p.name} at AuroraBD — ${(p.desc || p.whatItDoes || "").replace(/\s+—\s+/g, ", ")} ${hasPrice(p) ? `From ${fmt(fromPrice(p))}, d` : "D"}elivered anywhere in Bangladesh. Cash on delivery.`;
  document.title = `${p.name} — ${skinProduct ? "Skincare" : "Perfume"} | AuroraBD`;
  $('meta[name="description"]')?.setAttribute("content", metaDesc);
  $('meta[property="og:title"]')?.setAttribute("content", `${p.name} — AuroraBD`);
  $('meta[property="og:image"]')?.setAttribute("content", fullSrc(p.images[0]));

  const sizes = productSizes(p);
  let size = sizes.find(s => s.ml === 50)?.ml ?? sizes[0].ml;
  let qty = 1;

  const genderColl = { "For Him": "perfume-men", "For Her": "perfume-women", "Unisex": "perfume-unisex" }[p.tag];
  const crumbColl = skinProduct ? (skinCats(p)[0] ? `skincare-${skinCats(p)[0]}` : "skincare") : (genderColl || "perfume");
  $("#pdpCrumbs").innerHTML = `
    <li><a href="index.html">Home</a></li>
    <li><a href="${collUrl(groupSlug)}">${skinProduct ? "Skincare" : "Perfume"}</a></li>
    ${crumbColl !== groupSlug ? `<li><a href="${collUrl(crumbColl)}">${COLLECTIONS[crumbColl].nav || COLLECTIONS[crumbColl].title}</a></li>` : ""}
    <li><span aria-current="page">${esc(p.name)}</span></li>`;

  const thumbs = p.images.length > 1 ? `
    <div class="gallery-thumbs">${p.images.map((img, i) => `
      <button class="${i === 0 ? "is-on" : ""}" data-img="${img}" aria-label="Show image ${i + 1}"><img src="${thumbSrc(img)}" alt="" width="84" height="84"></button>`).join("")}
    </div>` : "";
  const summary = skinProduct
    ? (p.summary || p.suitableFor || "")
    : [p.family && `${p.family} fragrance`, GENDER[p.tag] && `for ${GENDER[p.tag] === "Unisex" ? "everyone" : GENDER[p.tag].toLowerCase()}`].filter(Boolean).join(" ") +
      (p.top?.length ? `. Opens with ${p.top.slice(0, 2).join(" and ").toLowerCase()}.` : ".");

  wrap.innerHTML = `
    <div class="gallery">
      <div class="gallery-main${skinProduct ? " square" : ""}"><img id="pdpImg" src="${fullSrc(p.images[0])}" alt="${esc(p.name)}${skinProduct ? "" : " by Aurora"}" width="1600" height="1066" fetchpriority="high"></div>
      ${thumbs}
    </div>
    <div class="buybox">
      <p class="meta-line">${skinProduct ? esc(productMeta(p)) : `${esc(GENDER[p.tag] || "")}${p.badge ? ` · ${p.badge === "Bestseller" ? "Best Seller" : esc(p.badge)}` : ""}`}</p>
      <h1>${esc(p.name)}</h1>
      <p class="summary">${esc(summary)}</p>
      <p class="price" id="pdpPrice"></p>
      <p class="price-note">Cash on delivery · + ${fmt(AURORA.deliveryFee)} delivery anywhere in Bangladesh</p>
      <p class="preorder-note" id="pdpPreorder"></p>
      ${variantPicker(sizes, size, "pdpSizes")}
      ${hasPrice(p) ? `<div class="opt-head">Quantity</div>
      <div class="buy-row">
        ${qtyControl("pdp")}
        <button class="btn" id="addBtn">Add to bag</button>
      </div>
      <button class="btn btn-outline btn-block" id="buyNow">Buy now</button>` : `<div id="addBtn">${askButton(p)}</div>`}
      <ul class="assurance">
        <li>${icon("truck")}<span><strong>Delivery across Bangladesh</strong>Flat ${fmt(AURORA.deliveryFee)}, delivered to your door.</span></li>
        <li>${icon("cash")}<span><strong>Cash on delivery</strong>Pay when your order arrives. We confirm every order by phone first.</span></li>
        ${waConfigured() ? `<li>${icon("chat")}<span><strong>Questions?</strong><a href="${waLink(`Hello AuroraBD! I have a question about ${p.name}.`)}" target="_blank" rel="noopener" style="text-decoration:underline;text-underline-offset:3px">Ask us on WhatsApp</a> — we're happy to help you choose.</span></li>` : ""}
      </ul>
    </div>`;

  /* Details: separate structures for perfume and skincare; only real data is shown */
  const row = (title, content) => content ? `<div class="detail-row" data-reveal><h2>${title}</h2><div>${content}</div></div>` : "";
  const chipList = arr => arr?.length ? `<ul class="chip-list">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  let details;
  if (skinProduct) {
    details = [
      row("What it does", p.whatItDoes && `<p class="prose">${esc(p.whatItDoes)}</p>`),
      row("Key ingredients", chipList(p.keyIngredients)),
      row("How to use", p.howToUse && `<p class="prose" style="font-size:1.15rem">${esc(p.howToUse)}</p>`),
      row("Suitable for", p.suitableFor && `<p>${esc(p.suitableFor)}</p>`),
      row("Skin type", chipList((p.skinTypes || []).map(k => labelOf(SKIN_TYPES, k)))),
      row("Helps with", chipList((p.concerns || []).map(k => labelOf(SKIN_CONCERNS, k))))
    ].join("");
  } else {
    const notes = [["Top notes", "First impression", p.top], ["Heart notes", "After 15–30 minutes", p.heart], ["Base notes", "The lasting dry-down", p.base]]
      .filter(([, , n]) => n?.length);
    const families = scentKeys(p).map(k => SCENT_FAMILIES.find(f => f.key === k));
    details = [
      row("How it smells", p.desc && `<p class="prose">${esc(p.desc)}</p>${families.length ? `<p>Scent family: ${families.map(f => `<a href="${collUrl(`scent-${f.key}`)}" style="text-decoration:underline;text-underline-offset:3px">${f.label}</a>`).join(", ")}${p.family ? ` · ${esc(p.family)}` : ""}</p>` : ""}`),
      row("Fragrance notes", notes.length && `<div class="notes-pyramid">${notes.map(([t, w, n]) => `<div><h3>${t}</h3><span class="when">${w}</span><ul>${n.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`),
      row("When to wear", chipList(p.wear))
    ].join("");
  }
  $("#pdpDetails").innerHTML = details;

  const priced = hasPrice(p);
  const refresh = () => {
    $("#pdpSizesLabel").textContent = sizeLabel(p.slug, size);
    if (!priced) { $("#pdpPrice").textContent = priceText(p); $("#barPrice").textContent = priceText(p); return; }
    const each = sizePrice(p.slug, size);
    const cur = productSizes(p).find(s => s.ml === size);
    $("#pdpPrice").innerHTML = qty > 1 ? `${fmt(each * qty)} <small class="muted" style="font-size:13px">(${qty} × ${fmt(each)})</small>` : priceHTML(cur);
    const note = $("#pdpPreorder");
    if (note) note.innerHTML = cur.preorder ? `<strong>Pre-order price — ${discountPct(cur)}% off</strong> until ${preorderEnds()}. Regular price ${fmt(cur.regular)}. ${esc(AURORA.preorder.note || "")}` : "";
    $("#pdpQty").textContent = qty;
    $("#barPrice").textContent = [sizeLabel(p.slug, size), fmt(each)].filter(Boolean).join(" · ");
  };
  bindVariantPicker($("#pdpSizes"), ml => { size = ml; refresh(); });
  if (priced) {
  $("#pdpInc").addEventListener("click", () => { qty++; refresh(); });
  $("#pdpDec").addEventListener("click", () => { if (qty > 1) qty--; refresh(); });
  $("#addBtn").addEventListener("click", () => Cart.add(p.slug, size, qty));
  $("#buyNow").addEventListener("click", () => {
    Cart.add(p.slug, size, qty);
    Cart.view = "checkout"; Cart.update();
  });
  }
  $$(".gallery-thumbs button").forEach(b => b.addEventListener("click", () => {
    $$(".gallery-thumbs button").forEach(x => x.classList.remove("is-on"));
    b.classList.add("is-on");
    $("#pdpImg").src = fullSrc(b.dataset.img);
  }));

  /* Sticky mobile buy bar appears once the main button scrolls away */
  const bar = $("#buyBar");
  $("#barName").textContent = p.name;
  if (priced) $("#barAdd").addEventListener("click", () => Cart.add(p.slug, size, qty));
  else if (waConfigured()) $("#barAdd").outerHTML = `<a class="btn" id="barAdd" href="${askLink(p)}" target="_blank" rel="noopener">${isComingSoon(p) ? "Notify me" : "Ask price"}</a>`;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => bar.classList.toggle("is-on", !en.isIntersecting && en.boundingClientRect.top < 0))
      .observe($("#addBtn"));
  }
  refresh();

  /* Related */
  const related = PRODUCTS.filter(x => x.slug !== p.slug && (skinProduct ? isSkincare(x) : x.tag === p.tag))
    .sort((a, b) => scentKeys(b).filter(k => scentKeys(p).includes(k)).length - scentKeys(a).filter(k => scentKeys(p).includes(k)).length)
    .slice(0, 4);
  $("#relatedGrid").innerHTML = productGrid(related);
  $("#relatedMore").href = collUrl(crumbColl);

  /* Structured data for search engines */
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: p.desc || p.whatItDoes || "", image: new URL(fullSrc(p.images[0]), location.href).href,
    brand: { "@type": "Brand", name: p.brand || "Aurora" },
    ...(priced ? { offers: { "@type": "AggregateOffer", priceCurrency: "BDT", lowPrice: fromPrice(p), highPrice: Math.max(...sizes.map(s => s.price)), offerCount: sizes.length } } : {})
  });
  document.head.appendChild(ld);
}

/* ============================================================
   Page: Contact
   ============================================================ */
function initContact() {
  const form = $("#contactForm");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    const v = n => form[n].value.trim();
    const text = [`Hello AuroraBD! I'm ${v("name")}.`, `Phone: ${v("phone")}`, v("email") ? `Email: ${v("email")}` : "", "", v("message")]
      .filter((l, i) => l || i === 3).join("\n");
    window.open(waLink(text), "_blank", "noopener");
  });
  $$("[data-wa]").forEach(a => {
    if (waConfigured()) { a.href = waLink(a.dataset.wa || "Hello AuroraBD! I have a question."); a.target = "_blank"; a.rel = "noopener"; }
    else a.remove();
  });
  $$("[data-delivery-fee]").forEach(el => { el.textContent = fmt(AURORA.deliveryFee); });
  $$("[data-whatsapp-number]").forEach(el => { el.textContent = AURORA.whatsapp; });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  switch (document.body.dataset.page) {
    case "home": initHome(); break;
    case "collection": initCollection(); break;
    case "product": initProduct(); break;
  }
  initContact();
  initReveal();
});
