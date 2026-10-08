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
  SKINCARE_CATEGORIES and their own `variants`.
- **Pricing**: perfume prices must come from AURORA.sizes
  (10ml ৳300 · 15ml ৳400 · 30ml ৳650 · 50ml ৳850 · 100ml ৳1,700, delivery ৳100) or
  PREMIUM_PRICES (৳350 · ৳450 · ৳750 · ৳1,000 · ৳1,800) — flag any hardcoded price in
  HTML that doesn't match these.
- **WhatsApp checkout (js/app.js, Cart)**: the order message must list every item with
  name, size, quantity and line total, then subtotal, ৳100 delivery, total, the customer's
  name / phone / address, and "Cash on delivery".
- **Honest content**: no fabricated ratings, reviews, sales numbers, "authentic" or
  "free delivery" claims; empty categories must show as "Soon", never with fake products.
- **HTML consistency**: every page uses the shared `#site-header` / `#site-footer`
  placeholders rendered by js/app.js, and the design-system classes in css/style.css.

Flag issues with the specific file and line, and suggest a concrete fix.
