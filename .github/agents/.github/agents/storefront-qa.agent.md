---
name: storefront-qa
description: Reviews the AuroraBD static site (HTML/CSS/vanilla JS) for correctness in the product catalog, WhatsApp checkout flow, and pricing consistency.
---

# Storefront QA

This is a static site with no build step. Review changes for:

- **js/data.js**: every perfume has a valid category (For Him / For Her / Unisex),
  a valid badge (Bestseller / New / null), complete top/heart/base notes, and image
  slugs that match files in images/products/full/ and images/products/thumb/.
  Skincare entries use `category: "skincare"`, a `skincareType` key from
  SKINCARE_CATEGORIES (or a list of them), a `brand`, a `size`, and a numeric `price` or
  `null` (shown as "Price on request" — never sold through the cart).
- **Pricing**: perfume prices must come from AURORA.sizes
  (10ml ৳300 · 15ml ৳400 · 30ml ৳650 · 50ml ৳850 · 100ml ৳1,700, delivery ৳100) or
  PREMIUM_PRICES (৳350 · ৳450 · ৳750 · ৳1,000 · ৳1,800) — flag any hardcoded price in
  HTML that doesn't match these.
- **Checkout (js/app.js, Cart.placeOrder)**: orders POST to Netlify Forms as form `order`; the
  fields must match the hidden `order` form in index.html (order_id, channel, name, phone, address,
  note, items, subtotal, delivery, total, payment, preorder, placed_at). Items list name, size,
  quantity and line total; totals include the ৳100 delivery. The bag empties only after a
  successful submission, and a failed submission shows an error instead of a confirmation.
- **Honest content**: no fabricated ratings, reviews, sales numbers, "authentic" or
  "free delivery" claims; empty categories must show as "Soon", never with fake products.
- **HTML consistency**: every page uses the shared `#site-header` / `#site-footer`
  placeholders rendered by js/app.js, and the design-system classes in css/style.css.

Flag issues with the specific file and line, and suggest a concrete fix.
