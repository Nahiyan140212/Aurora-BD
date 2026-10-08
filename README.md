# AURORA — A Signature of Confidence

Official website for **AuroraBD** — long-lasting fragrances and, soon, everyday skincare.
Founder: Md. Jahirul Islam Fahim.

A **pure static site** (HTML / CSS / vanilla JS, no build step), designed mobile-first in
warm ivory, cream and charcoal with a single bronze accent.

## 🚀 Deploying on Netlify

1. In Netlify: **Add new site → Import an existing project** → pick this GitHub repo.
2. Build command: *(leave empty)* — Publish directory: `.` (already set in `netlify.toml`).
3. Deploy, then connect your domain.

`netlify.toml` also adds clean URLs: `/collections/perfume-men` → the Perfume for Men
collection, `/products/creed-aventus` → that product page.

## 🛒 How ordering works (WhatsApp — no payment gateway needed)

Everything routes to AuroraBD's WhatsApp (number set in [`js/data.js`](js/data.js)):

- **Bag → Checkout** — the customer enters name, mobile number and address, then the full
  order (items, subtotal, ৳100 delivery, total, customer details, "Cash on delivery")
  opens in WhatsApp, ready to send. A confirmation screen explains the next steps.
- **Product page → Buy now** — adds the item and jumps straight to checkout.
- **Contact form → Send via WhatsApp** — name, phone and message open in a chat.

The **newsletter** signup submits to Netlify Forms (**Netlify → Forms**).

## 🛍️ Managing products — everything is in `js/data.js`

**Settings** (`AURORA`): WhatsApp number, delivery fee, announcement-bar messages,
social links (fill in `social.facebook` / `instagram` / `tiktok` to show icons), and the
shared size/price list.

**Perfume** entries need: `slug`, `name`, `tag` (`For Him` / `For Her` / `Unisex`),
`family`, `badge` (`Bestseller` / `New` / `null`), `desc`, `top` / `heart` / `base` notes
and `images`. Optional: `prices: PREMIUM_PRICES` for premium pricing,
`type: "oil"` or `"roll-on"` for perfume oils / roll-ons, and `wear: [...]` for the
"When to wear" section.

**Skincare** entries use `category: "skincare"`, `brand`, `skincareType` (e.g. `"serum"`, or a
list like `["moisturizer", "eye-care"]`), `size` (e.g. `"150ml"`) and `price`. Leave
`price: null` to show **"Price on request"** with a WhatsApp ask button instead of Add to bag.
Optional: `skinTypes`, `concerns`, `whatItDoes`, `keyIngredients`, `howToUse`,
`suitableFor`, `summary`. `SKINCARE_FEATURED` sets the order on the homepage and menu. The full field list is in the comment above
`PRODUCTS`.

Menus, collections and filters build themselves from this data. Empty categories
(skincare, perfume oil, roll-on) show a "Soon" label and a coming-soon page until a product
is added; the homepage "Shop by skin type" section appears automatically once skincare
products list `skinTypes` / `concerns`.

**Images:** add `images/products/full/<slug>.jpg` (≈1600×1066) and
`images/products/thumb/<slug>.jpg` (720×480). Cards crop to a centred square. Skincare photos are square: full ≈1254×1254, thumb 720×720.

Default sizes: 10ml ৳300 · 15ml ৳400 · 30ml ৳650 · 50ml ৳850 · 100ml ৳1,700.
Premium: ৳350 · ৳450 · ৳750 · ৳1,000 · ৳1,800. Delivery ৳100 flat.

## 📁 Structure

```
index.html     Home — hero, categories, best sellers, featured perfumes, skincare,
               scent families, why Aurora, story
shop.html      Collection page — ?c=<collection>, with filters, sorting, size pricing
product.html   Product page — ?p=<slug> (perfume and skincare layouts)
contact.html   WhatsApp contact form, order info, FAQ
about.html     Brand story
help.html      My orders, shipping, payment, tracking, returns, privacy, terms
css/style.css  Design system + all components
js/data.js     ⚙️ Settings, catalog, scent families & skincare categories ← edit this
js/app.js      Components (header, mega menu, search, cards, filters, cart, footer)
```

## 🖥️ Preview locally

Open `index.html` in a browser, or run any static server, e.g.
`npx serve .` and open the printed address.
