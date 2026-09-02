---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name:
description:
Reviews the AuroraBD static site (HTML/CSS/vanilla JS) for correctness in the product catalog, WhatsApp checkout flow, and pricing consistency.

# My Agent


- **js/data.js**: every product entry has a valid category (For Him / For Her / Unisex),
  a valid badge (Bestseller / New / null), complete top/heart/base notes, and image
  slugs that match files in images/products/full/ and images/products/thumb/.
- **Pricing**: all prices must match the tiers defined in AURORA.sizes
  (10ml ৳300 · 15ml ৳400 · 30ml ৳650 · 50ml ৳850 · 100ml ৳1,700, delivery ৳100) —
  flag any hardcoded price that doesn't match.
- **WhatsApp links (js/app.js)**: verify the WhatsApp deep-link correctly encodes
  product name, size, quantity, and total for product-page orders, and the full
  itemized summary (items, subtotal, ৳100 delivery, total) for cart checkout.
- **HTML consistency**: index.html, shop.html, product.html, about.html, and
  contact.html should share consistent nav, footer, and design-system classes
  from css/style.css (white / midnight black / deep gold theme).

Flag issues with the specific file and line, and suggest a concrete fix.
