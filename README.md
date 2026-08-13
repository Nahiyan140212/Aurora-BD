# ✦ AURORA ✦ — A Signature of Confidence

Official website for **Aurora**, a premium perfume brand from Bangladesh.
Founder: Md. Jahirul Islam Fahim.

Elegant, minimalist, luxury design in white · midnight black · deep gold — built as a
**pure static site** (HTML/CSS/vanilla JS, zero build step) for maximum loading speed.

## 🚀 Deploying on Netlify

1. In Netlify: **Add new site → Import an existing project** → pick this GitHub repo.
2. Build command: *(leave empty)* — Publish directory: `.` (already set in `netlify.toml`).
3. Deploy, then connect your domain.

### Order & contact forms (work automatically on Netlify)

The site uses **Netlify Forms** — no backend needed:

- `order` — submitted from the cart's "Checkout — Cash on Delivery" flow
- `contact` — the contact page form
- `newsletter` — email signups

After the first deploy, open **Netlify → Forms** to see submissions, and turn on
**email notifications** (Forms → Notifications) so every order/message reaches your inbox.

## ⚠️ One thing to configure: the WhatsApp number

Open [`js/data.js`](js/data.js) — the very first setting:

```js
whatsapp: "8801XXXXXXXXX",  // ← replace with Aurora's real WhatsApp number
```

Replace it with the real number (country code + number, digits only, e.g. `8801712345678`).
Until it is replaced, all "Order via WhatsApp" buttons stay hidden and ordering happens
through the built-in cash-on-delivery checkout (Netlify Forms) — so the site is fully
functional either way.

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
contact.html      Contact form, order info, FAQ
thanks.html       Form success page
css/style.css     Design system (white / midnight black / deep gold)
js/data.js        ⚙️ Site config + product catalog  ← edit this one
js/app.js         Cart, checkout, rendering, animations
images/products/  Optimized product cards (thumb + full)
```

## 🖥️ Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Form submissions only work on Netlify, not in local preview.)
