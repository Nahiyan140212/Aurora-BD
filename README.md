# ✦ AURORABD ✦ — A Signature of Confidence

Official website for **AuroraBD**, a premium perfume brand from Bangladesh.
Founder: Md. Jahirul Islam Fahim.

Elegant, minimalist, luxury design in white · midnight black · deep gold — built as a
**pure static site** (HTML/CSS/vanilla JS, zero build step) for maximum loading speed.

## 🚀 Deploying on Netlify

1. In Netlify: **Add new site → Import an existing project** → pick this GitHub repo.
2. Build command: *(leave empty)* — Publish directory: `.` (already set in `netlify.toml`).
3. Deploy, then connect your domain.

## 🛒 How ordering works (WhatsApp — no payment gateway needed)

Everything routes to AuroraBD's WhatsApp (number set in [`js/data.js`](js/data.js)):

- **Product page → "Order Now on WhatsApp"** — opens a chat with the product,
  size, quantity and total pre-filled.
- **Cart → "Checkout via WhatsApp"** — customers add multiple items to their bag,
  then the full order summary (items, subtotal, ৳100 delivery, total) opens in
  WhatsApp, ready to send.
- **Contact form → "Send via WhatsApp"** — the visitor's name, phone and message
  open in a WhatsApp chat.

Payment is cash on delivery, confirmed in the WhatsApp conversation.

To change the number, edit the first setting in `js/data.js`:

```js
whatsapp: "+8801911247619",
```

The **newsletter** signup is the one exception — it submits to Netlify Forms
(visible under **Netlify → Forms** after deploy; enable email notifications there).

## 🛍️ Managing products

All products live in [`js/data.js`](js/data.js) — each entry has a name, category
(`For Him` / `For Her` / `Unisex`), fragrance family, badge (`Bestseller` / `New` / `null`),
description, top/heart/base notes and image slug(s).

To add a product:

1. Export/optimize its card image twice into
   `images/products/full/<slug>.jpg` (1600px wide) and
   `images/products/thumb/<slug>.jpg` (720px wide).
2. Add an entry to `PRODUCTS` in `js/data.js`.

Prices are uniform across the catalog and set once in `AURORA.sizes`
(10ml ৳300 · 15ml ৳400 · 30ml ৳650 · 50ml ৳850 · 100ml ৳1,700, delivery ৳100).

## 📁 Structure

```
index.html        Home — hero, collections, bestsellers, story, values, pricing
shop.html         Full catalog with filters + search
product.html      Product page (renders from ?p=<slug>)
about.html        Brand story
contact.html      Contact via WhatsApp, order info, FAQ
css/style.css     Design system (white / midnight black / deep gold)
js/data.js        ⚙️ Site config + product catalog  ← edit this one
js/app.js         Cart, WhatsApp checkout, rendering, animations
images/products/  Optimized product cards (thumb + full)
```

## 🖥️ Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
