/* ============================================================
   AURORABD — A Signature of Confidence
   Site configuration + product catalog
   ============================================================ */

const AURORA = {
  /* AuroraBD's WhatsApp number — contact messages and "ask us" links
     open a chat here (country code + number). Orders are placed on the site. */
  whatsapp: "+8801911247619",
  currency: "৳", /* ৳ */
  deliveryFee: 100,
  deliveryNote: "Home delivery all over Bangladesh — flat ৳100",
  /* Short messages for the announcement bar at the very top */
  announcements: [
    "Flat ৳100 home delivery across Bangladesh",
    "Cash on delivery",
    "Easy online ordering"
  ],
  /* Skincare pre-order — products with a `preorderPrice` use it until `endsAt`
     (Bangladesh time), then go back to their regular `price` automatically.
     Set to null to switch the pre-order off. */
  preorder: {
    endsAt: "2026-10-19T23:59:59+06:00",
    note: "The pre-order discount applies to skincare only."
  },
  /* Social profile links — fill in to show icons in the footer.
     Leave "" to hide an icon. */
  social: {
    facebook: "https://www.facebook.com/share/14oEX4QvB2i/",
    instagram: "",
    tiktok: ""
  },
  sizes: [
    { ml: 10, price: 300 },
    { ml: 15, price: 400 },
    { ml: 30, price: 650 },
    { ml: 50, price: 850 },
    { ml: 100, price: 1700 }
  ]
};

/* tag: "For Him" | "For Her" | "Unisex"
   badge: "Bestseller" | "New" | null
   images: file slugs inside images/products/{thumb|full}/
   prices: optional { ml: price } overrides for AURORA.sizes

   Optional fields (all products):
   category: "perfume" (default) | "skincare"
   variants: [{ ml, price, label? }] — replaces AURORA.sizes entirely
             (use for skincare, e.g. [{ ml: 50, price: 890 }])

   Optional perfume fields:
   type: "spray" (default) | "oil" | "roll-on"
   wear: ["Daily", "Office", "Date Night", "Evening", "Special Occasion"]

   Skincare fields (category: "skincare"):
   brand:        e.g. "COSRX"
   size:         e.g. "150ml" or "100g" ("" if unknown)
   price:        regular price, or null to show "Price on request"
   preorderPrice: price while AURORA.preorder is running (optional)
   comingSoon:   true to list a product as "Coming soon" (no price, not orderable)
   skincareType: a key from SKINCARE_CATEGORIES (e.g. "serum"), or a list
   summary:      optional one-line intro under the product name
   skinTypes:    keys from SKIN_TYPES (e.g. ["oily", "combination"])
   concerns:     keys from SKIN_CONCERNS (e.g. ["hydration"])
   whatItDoes:   short paragraph
   keyIngredients: ["Niacinamide", ...]
   howToUse:     short paragraph
   suitableFor:  short sentence
   (no tag / family / notes needed for skincare) */
/* Higher price list for premium scents (set via a product's `prices`) */
const PREMIUM_PRICES = { 10: 350, 15: 450, 30: 750, 50: 1000, 100: 1800 };

const PRODUCTS = [
  {
    slug: "creed-aventus",
    name: "Creed Aventus",
    tag: "For Him",
    family: "Woody Fruity",
    badge: "Bestseller",
    desc: "Crisp pineapple and bergamot break over smoky birch and oakmoss — a fragrance for men who arrive before they speak.",
    top: ["Bergamot", "Pineapple", "Black Currant", "Lemon"],
    heart: ["Birch", "Musk", "Oakmoss"],
    base: ["Ambergris", "Citrus", "Aventus Accord"],
    prices: PREMIUM_PRICES,
    images: ["creed-aventus"]
  },
  {
    slug: "bleu-de-chanel",
    name: "Bleu De Chanel",
    tag: "For Him",
    family: "Woody Aromatic",
    badge: null,
    desc: "Cool citrus and pink pepper sharpened by incense and cedar — clean, magnetic and endlessly wearable.",
    top: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
    heart: ["Ginger", "Nutmeg", "Jasmine"],
    base: ["Incense", "Cedar", "Sandalwood", "Patchouli"],
    prices: PREMIUM_PRICES,
    images: ["bleu-de-chanel"]
  },
  {
    slug: "club-de-nuit-intense",
    name: "Club De Nuit Intense",
    tag: "For Him",
    family: "Woody Fruity",
    badge: null,
    desc: "A bold opening of lemon, pineapple and black currant over smoldering birch — dark, smoky, impossible to ignore.",
    top: ["Lemon", "Pineapple", "Black Currant", "Apple"],
    heart: ["Birch", "Jasmine", "Rose"],
    base: ["Musk", "Ambergris", "Patchouli", "Vanilla"],
    images: ["club-de-nuit-intense"]
  },
  {
    slug: "versace-eros",
    name: "Versace Eros",
    tag: "For Him",
    family: "Fresh Sweet",
    badge: null,
    desc: "Icy mint and green apple melt into warm tonka and vanilla — a duel between desire and restraint.",
    top: ["Mint", "Green Apple", "Lemon"],
    heart: ["Tonka Bean", "Geranium", "Ambroxan"],
    base: ["Vanilla", "Vetiver", "Oakmoss", "Cedar"],
    prices: PREMIUM_PRICES,
    images: ["versace-eros"]
  },
  {
    slug: "srk-signature",
    name: "SRK Signature",
    tag: "For Him",
    family: "Woody Oriental",
    badge: null,
    desc: "Crisp apple and cardamom over smoked oud, amber and vanilla — regal, romantic, king-sized charisma.",
    top: ["Apple", "Lemon", "Bergamot"],
    heart: ["Cinnamon", "Lavender", "Mint", "Cardamom"],
    base: ["Oud", "Amber", "Vanilla", "Sandalwood"],
    images: ["srk-signature"]
  },
  {
    slug: "dunhill-icon",
    name: "Dunhill Icon",
    tag: "For Him",
    family: "Woody Aromatic",
    badge: null,
    desc: "British elegance in a bottle — neroli and bergamot resting on lavender, iris, oud and leather.",
    top: ["Neroli", "Bergamot", "Citruses"],
    heart: ["Lavender", "Cardamom", "Iris"],
    base: ["Oud", "Vetiver", "Leather", "Oakmoss"],
    images: ["dunhill-icon"]
  },
  {
    slug: "dunhill-desire-blue",
    name: "Dunhill Desire Blue",
    tag: "For Him",
    family: "Fresh Fougère",
    badge: null,
    desc: "A clear blue accord of bergamot, lavender and green apple on a bed of white musk and cedar — effortless daytime polish.",
    top: ["Bergamot", "Lemon", "Petitgrain"],
    heart: ["Lavender", "Green Apple", "Jasmine"],
    base: ["White Musk", "Oakmoss", "Cedarwood", "Vanilla"],
    images: ["dunhill-desire-blue"]
  },
  {
    slug: "hugo-boss",
    name: "Hugo Boss",
    tag: "For Him",
    family: "Woody Spicy",
    badge: null,
    desc: "Juicy apple and cinnamon warmed by sandalwood and cedar — sharp tailoring translated into scent.",
    top: ["Apple", "Plum", "Bergamot"],
    heart: ["Cinnamon", "Geranium", "Carnation"],
    base: ["Sandalwood", "Cedar", "Vetiver", "Olive Wood"],
    images: ["hugo-boss"]
  },
  {
    slug: "cool-water",
    name: "Cool Water",
    tag: "For Him",
    family: "Aromatic Aquatic",
    badge: null,
    desc: "Sea breeze, mint and lavender over musk and oakmoss — the eternal classic of cool composure.",
    top: ["Sea Water", "Mint", "Lavender"],
    heart: ["Geranium", "Neroli", "Jasmine"],
    base: ["Musk", "Oakmoss", "Sandalwood", "Amber"],
    images: ["cool-water"]
  },
  {
    slug: "prada-luna-rossa-ocean",
    name: "Prada Luna Rossa Ocean",
    tag: "For Him",
    family: "Aromatic Fougère",
    badge: null,
    desc: "Sea-sprayed bergamot and lavender deepened by suede and amber — sleek as a racing yacht at full sail.",
    top: ["Bergamot", "Sea Notes"],
    heart: ["Lavender", "Clary Sage", "Iris"],
    base: ["Suede", "Vetiver", "Amber"],
    images: ["prada-luna-rossa-ocean"]
  },
  {
    slug: "imagination",
    name: "Imagination",
    tag: "For Him",
    family: "Citrus Aromatic",
    badge: null,
    desc: "Sparkling citron and neroli steeped in black tea and ginger over ambrox — freedom, distilled.",
    top: ["Citron", "Bergamot", "Orange"],
    heart: ["Black Tea", "Ginger", "Neroli"],
    base: ["Ambrox", "Guaiac Wood"],
    prices: PREMIUM_PRICES,
    images: ["imagination"]
  },
  {
    slug: "stronger-with-you-intensely",
    name: "Stronger With You Intensely",
    tag: "For Him",
    family: "Amber Spicy",
    badge: null,
    desc: "Pink pepper and juniper ignite a heart of cinnamon and sage, melting into vanilla, amber and suede — intensity you can wear.",
    top: ["Pink Pepper", "Juniper", "Violet"],
    heart: ["Cinnamon", "Lavender", "Sage"],
    base: ["Vanilla", "Tonka Bean", "Amber", "Suede"],
    prices: PREMIUM_PRICES,
    images: ["stronger-with-you-intensely"]
  },
  {
    slug: "dior-sauvage",
    name: "Dior Sauvage",
    tag: "For Him",
    family: "Aromatic Fougère",
    badge: "Bestseller",
    desc: "Peppery bergamot over lavender and a warm wash of ambroxan — raw, fresh and unmistakably masculine.",
    top: ["Bergamot", "Pepper", "Pink Pepper"],
    heart: ["Sichuan Pepper", "Lavender", "Ambroxan"],
    base: ["Amber", "Musk", "Fresh Spicy", "Aromatic"],
    prices: PREMIUM_PRICES,
    images: ["dior-sauvage"]
  },
  {
    slug: "nautica-voyage",
    name: "Nautica Voyage",
    tag: "For Him",
    family: "Aromatic Aquatic",
    badge: "New",
    desc: "Green apple and lotus carried on a sea breeze, settling into soft musk and woods — easy, clean and fresh all day.",
    top: ["Green Notes", "Apple", "Lotus"],
    heart: ["Musk", "Mimosa", "Cedar"],
    base: ["Musk", "Amber", "Moss", "Woody"],
    images: ["nautica-voyage"]
  },
  {
    slug: "9pm",
    name: "9PM",
    tag: "For Him",
    family: "Amber Vanilla",
    badge: "New",
    desc: "Apple and cinnamon melt into tonka, lavender and amber — a warm, sweet evening scent made for after dark.",
    top: ["Vanilla", "Apple", "Cinnamon"],
    heart: ["Tonka Bean", "Lavender", "Amber"],
    base: ["Vanilla", "Amber", "Warm Spicy", "Cinnamon"],
    images: ["9pm"]
  },
  {
    slug: "hawas-ice",
    name: "Hawas Ice",
    tag: "Unisex",
    family: "Aquatic Fresh",
    badge: "Bestseller",
    desc: "Green apple, plum and citrus plunged in glacial water — cool, fresh and irresistible from first spray to last.",
    top: ["Green Apple", "Lemon"],
    heart: ["Plum", "Bergamot"],
    base: ["Ambergris", "Woody Notes"],
    images: ["hawas-ice"]
  },
  {
    slug: "hawas-fire",
    name: "Hawas Fire",
    tag: "Unisex",
    family: "Amber Aquatic",
    badge: "Bestseller",
    desc: "Where the ocean meets a sunset of amber — sea water and jasmine glowing over warm mineral spice.",
    top: ["Amber", "Clary Sage", "Mineral Notes"],
    heart: ["Sea Water", "Jasmine", "Ambergris"],
    base: ["Amber", "Marine", "Soft Spicy"],
    images: ["hawas-fire"]
  },
  {
    slug: "reef-33",
    name: "Reef 33",
    tag: "Unisex",
    family: "Woody Aromatic",
    badge: null,
    desc: "Saffron and rosemary over smoked agarwood, moss and leather — an oud story told with a fresh green accent.",
    top: ["Saffron", "Rosemary", "Agarwood"],
    heart: ["Oud", "Metallic", "Fresh Spicy"],
    base: ["Oud", "Amber", "Moss", "Leather"],
    images: ["reef-33"]
  },
  {
    slug: "lattafa-khamrah",
    name: "Lattafa Khamrah",
    tag: "Unisex",
    family: "Spicy Gourmand",
    badge: null,
    desc: "Cinnamon and cardamom poured over dates, praline and vanilla — a rich, golden pour of pure warmth.",
    top: ["Cinnamon", "Bergamot", "Cardamom"],
    heart: ["Dates", "Praline", "Tuberose"],
    base: ["Vanilla", "Tonka Bean", "Benzoin", "Myrrh"],
    images: ["lattafa-khamrah"]
  },
  {
    slug: "ck-one",
    name: "CK One",
    tag: "Unisex",
    family: "Citrus Aromatic",
    badge: null,
    desc: "Bright lemon, pineapple and papaya over soft florals and musk — one scent, every body, any hour.",
    top: ["Lemon", "Bergamot", "Pineapple", "Papaya"],
    heart: ["Jasmine", "Violet", "Rose", "Nutmeg"],
    base: ["Musk", "Amber", "Oakmoss"],
    images: ["ck-one"]
  },
  {
    slug: "vampire-blood",
    name: "Vampire Blood",
    tag: "Unisex",
    family: "Fruity Amber",
    badge: null,
    desc: "Crushed red berries, plum and jasmine over amber, sandalwood and patchouli — dangerously dark, deliciously sweet.",
    top: ["Red Berries", "Plum", "Jasmine"],
    heart: ["Red Berries", "Plum", "Jasmine"],
    base: ["Amber", "Musk", "Sandalwood", "Vanilla", "Patchouli"],
    images: ["vampire-blood"]
  },
  {
    slug: "juicy-apple",
    name: "Juicy Apple",
    tag: "Unisex",
    family: "Fruity Gourmand",
    badge: "Bestseller",
    desc: "Candied red apple and forest fruits with litchi and black currant — a bite of pure temptation.",
    top: ["Red Apple", "Forest Fruits", "Sugar"],
    heart: ["Raspberry Blossom", "Litchi", "Black Currant"],
    base: ["Woody Notes", "Warm Spicy"],
    images: ["juicy-apple"]
  },
  {
    slug: "marshmallow-blush",
    name: "Marshmallow Blush",
    tag: "Unisex",
    family: "Sweet Gourmand",
    badge: null,
    desc: "Pillowy marshmallow and strawberry lifted by raspberry, lemon and a whisper of cinnamon rose — softness that lingers.",
    top: ["Marshmallow", "Strawberry", "Musk"],
    heart: ["Raspberry", "Ambroxan", "Lemon"],
    base: ["Sweet Rose", "Cinnamon", "Fresh Greens"],
    prices: PREMIUM_PRICES,
    images: ["marshmallow-blush"]
  },
  {
    slug: "pacific-chill",
    name: "Pacific Chill",
    tag: "Unisex",
    family: "Citrus Aromatic",
    badge: null,
    desc: "Juicy apricot, citron and cool mint over a soft bed of musk and amber — bright, breezy and effortlessly fresh.",
    top: ["Apricot", "Citron", "Orange", "Lemon", "Mint Basil"],
    heart: ["Citrus", "Fresh Spicy", "Aromatic", "Green"],
    base: ["Musk", "Amber", "Moss", "Woody"],
    images: ["pacific-chill"]
  },
  {
    slug: "wulong-cha",
    name: "Wulong Cha",
    tag: "Unisex",
    family: "Citrus Tea",
    badge: "New",
    desc: "Oolong tea brightened with bergamot and mandarin, softened by fig and clean musk — calm, refined and quietly addictive.",
    top: ["Bergamot", "Oolong Tea", "Orange", "Mandarin Orange"],
    heart: ["Fig", "Musk"],
    base: ["Musk", "Fresh Spicy", "Aromatic", "Citrus"],
    images: ["wulong-cha"]
  },
  {
    slug: "cloud",
    name: "Cloud",
    tag: "For Her",
    family: "Sweet Gourmand",
    badge: null,
    desc: "Whipped cream, coconut and praline floating on lavender, pear and vanilla — a daydream you can wear.",
    top: ["Cream", "Coconut", "Praline"],
    heart: ["Musk", "Lavender", "Pear"],
    base: ["Vanilla", "Musk", "Amber"],
    prices: PREMIUM_PRICES,
    images: ["cloud"]
  },
  {
    slug: "good-girl",
    name: "Good Girl",
    tag: "For Her",
    family: "Floral Oriental",
    badge: null,
    desc: "Radiant tuberose and jasmine over dark tonka and cacao — because good girls wear unforgettable perfume.",
    top: ["Neroli", "Bergamot", "Pepper"],
    heart: ["Tuberose", "Almond", "Jasmine"],
    base: ["Tonka Bean", "Cacao Pod", "Vanilla"],
    prices: PREMIUM_PRICES,
    images: ["good-girl"]
  },
  {
    slug: "ysl-libre",
    name: "YSL Libre",
    tag: "For Her",
    family: "Floral Lavender",
    badge: null,
    desc: "Burning lavender and orange blossom over vanilla and musk — the scent of freedom worn on bare skin.",
    top: ["Lavender", "Mandarin", "Black Currant"],
    heart: ["Orange Blossom", "Jasmine"],
    base: ["Vanilla", "Musk", "Cedar", "Ambergris"],
    images: ["ysl-libre"]
  },
  {
    slug: "dior-jadore",
    name: "Dior J'adore",
    tag: "For Her",
    family: "Floral Fruity",
    badge: "Bestseller",
    desc: "Pear, magnolia and peach blooming into jasmine, rose and ylang-ylang — liquid gold femininity.",
    top: ["Pear", "Melon", "Magnolia", "Peach"],
    heart: ["Jasmine", "Damask Rose", "Ylang-Ylang"],
    base: ["Musk", "Vanilla", "Cedar"],
    prices: PREMIUM_PRICES,
    images: ["dior-jadore"]
  },
  {
    slug: "gucci-flora",
    name: "Gucci Flora",
    tag: "For Her",
    family: "Floral",
    badge: null,
    desc: "Peony and citrus dancing over rose and osmanthus with a soft patchouli trail — a garden in first bloom.",
    top: ["Citrus", "Peony"],
    heart: ["Rose", "Osmanthus"],
    base: ["Patchouli", "Sandalwood", "Musk"],
    images: ["gucci-flora"]
  },
  {
    slug: "gucci-rush",
    name: "Gucci Rush",
    tag: "For Her",
    family: "Floral Chypre",
    badge: null,
    desc: "Peach and gardenia rushing into rose and freesia over patchouli and vanilla — vintage glamour, modern pulse.",
    top: ["Peach", "Gardenia", "Coriander"],
    heart: ["Rose", "Freesia", "Jasmine"],
    base: ["Patchouli", "Vanilla", "Vetiver"],
    images: ["gucci-rush"]
  },
  {
    slug: "burberry-her",
    name: "Burberry Her",
    tag: "For Her",
    family: "Fruity Gourmand",
    badge: "Bestseller",
    desc: "Strawberry, raspberry and blackberry brightened by jasmine and violet over warm musk — London energy, bottled.",
    top: ["Strawberry", "Raspberry", "Blackberry"],
    heart: ["Jasmine", "Violet"],
    base: ["Musk", "Amber", "Dry Woods"],
    images: ["burberry-her"]
  },
  {
    slug: "miss-dior",
    name: "Miss Dior",
    tag: "For Her",
    family: "Floral",
    badge: "New",
    desc: "Rose and apricot wrapped in vanilla, with powdery iris and peony on soft musk — romantic, elegant and endlessly feminine.",
    top: ["Vanilla", "Rose", "Apricot"],
    heart: ["Iris", "Peony"],
    base: ["Musk"],
    prices: PREMIUM_PRICES,
    images: ["miss-dior"]
  },

  /* ================= SKINCARE =================
     Details below come from each product's label / Aurora product image.
     price = regular price; preorderPrice = pre-order price until AURORA.preorder.endsAt.
     price: null shows "Price on request" with a WhatsApp ask button. */

  /* ----- Cleansers ----- */
  {
    slug: "cosrx-low-ph-good-morning-gel-cleanser",
    name: "COSRX Low pH Good Morning Gel Cleanser",
    brand: "COSRX",
    category: "skincare",
    skincareType: "cleanser",
    size: "150ml",
    price: 1250,
    preorderPrice: 875,
    badge: null,
    whatItDoes: "A gentle gel cleanser that removes dirt, oil and impurities while keeping your skin's natural pH balanced. It soothes and refreshes, helps keep pores clean and clear, and leaves skin soft, smooth and healthy.",
    howToUse: "Massage a small amount onto damp skin, then rinse well with lukewarm water. Use morning and evening.",
    concerns: [],
    images: ["cosrx-low-ph-good-morning-gel-cleanser"]
  },
  {
    slug: "cosrx-salicylic-acid-daily-gentle-cleanser",
    name: "COSRX Salicylic Acid Daily Gentle Cleanser",
    brand: "COSRX",
    category: "skincare",
    skincareType: "cleanser",
    size: "150ml",
    price: 1200,
    preorderPrice: 840,
    badge: null,
    whatItDoes: "A daily cleanser with salicylic acid that removes dirt, oil and impurities, helps unclog pores and prevent breakouts, and gently exfoliates — leaving skin clean, smooth and refreshed.",
    keyIngredients: ["Salicylic Acid"],
    howToUse: "Massage a small amount onto damp skin, then rinse well with lukewarm water.",
    concerns: ["acne"],
    images: ["cosrx-salicylic-acid-daily-gentle-cleanser"]
  },
  {
    slug: "the-face-shop-rice-water-bright-foaming-cleanser",
    name: "The Face Shop Rice Water Bright Foaming Cleanser",
    brand: "The Face Shop",
    category: "skincare",
    skincareType: "cleanser",
    size: "150ml",
    price: 1400,
    preorderPrice: 980,
    badge: null,
    whatItDoes: "A foaming cleanser that deeply cleans away dust, excess oil and makeup. Rice water helps keep skin bright and fresh with a natural glow, and it cleans without dryness, leaving skin soft and smooth. Suitable for everyday use.",
    keyIngredients: ["Rice Water"],
    howToUse: "Work into a lather with water, massage onto damp skin, then rinse well.",
    suitableFor: "All skin types.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: ["brightening"],
    images: ["the-face-shop-rice-water-bright-foaming-cleanser"]
  },

  /* ----- Serums, essences & ampoules ----- */
  {
    slug: "anua-niacinamide-10-txa-4-serum",
    name: "Anua Niacinamide 10 + TXA 4 Serum",
    brand: "Anua",
    category: "skincare",
    skincareType: "serum",
    size: "30ml",
    price: 2450,
    preorderPrice: 1715,
    badge: null,
    whatItDoes: "A brightening serum with 10% niacinamide and 4% tranexamic acid. It helps brighten skin, reduce the look of dark spots and even out skin tone, while keeping skin hydrated, healthy and smooth.",
    keyIngredients: ["Niacinamide 10%", "Tranexamic Acid (TXA) 4%"],
    howToUse: "After cleansing, apply a few drops to the face and pat gently until absorbed. Follow with moisturizer, and sunscreen in the daytime.",
    concerns: ["brightening", "hydration"],
    images: ["anua-niacinamide-10-txa-4-serum"]
  },
  {
    slug: "axis-y-dark-spot-correcting-glow-serum",
    name: "AXIS-Y Dark Spot Correcting Glow Serum",
    brand: "AXIS-Y",
    category: "skincare",
    skincareType: "serum",
    size: "50ml",
    price: 1750,
    preorderPrice: 1225,
    badge: null,
    whatItDoes: "A glow serum with 5% niacinamide, squalane and rice extract. It helps reduce dark spots and pigmentation, brightens and evens skin tone, keeps skin hydrated and soft, refines texture and helps protect skin from environmental damage.",
    keyIngredients: ["Niacinamide 5%", "Squalane", "Rice Extract"],
    howToUse: "After cleansing, apply a small amount to the face and pat gently until absorbed. Follow with moisturizer, and sunscreen in the daytime.",
    suitableFor: "All skin types — especially skin with dark spots, pigmentation or dullness.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: ["brightening", "hydration"],
    images: ["axis-y-dark-spot-correcting-glow-serum"]
  },
  {
    slug: "cosrx-advanced-snail-96-mucin-power-essence",
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "skincare",
    skincareType: "serum",
    size: "100ml",
    price: 1850,
    preorderPrice: 1295,
    badge: null,
    whatItDoes: "A lightweight essence made with 96% snail secretion filtrate. It deeply hydrates and locks in moisture, helps repair damaged skin, improves skin texture and elasticity, and gives a healthy, natural glow.",
    keyIngredients: ["Snail Secretion Filtrate 96%"],
    howToUse: "After cleansing, apply to the face and pat gently until absorbed, then follow with moisturizer.",
    concerns: ["hydration"],
    images: ["cosrx-advanced-snail-96-mucin-power-essence"]
  },
  {
    slug: "medicube-txa-niacinamide-15-serum",
    name: "Medicube TXA Niacinamide 15 Serum",
    brand: "Medicube",
    category: "skincare",
    skincareType: "serum",
    size: "30ml",
    price: 2300,
    preorderPrice: 1610,
    badge: null,
    whatItDoes: "A serum with 15% TXA and niacinamide. It helps reduce dark spots and marks, helps care for acne scars, improves uneven skin tone and texture, and helps keep skin hydrated.",
    keyIngredients: ["Tranexamic Acid (TXA)", "Niacinamide"],
    howToUse: "After cleansing, apply a few drops to the face and pat gently until absorbed. Follow with moisturizer, and sunscreen in the daytime.",
    suitableFor: "All skin types — normal, dry, oily, combination and sensitive.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: ["brightening", "acne", "hydration"],
    images: ["medicube-txa-niacinamide-15-serum"]
  },
  {
    slug: "skin1004-centella-tone-brightening-capsule-ampoule",
    name: "SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule",
    brand: "SKIN1004",
    category: "skincare",
    skincareType: "serum",
    variants: [
      { ml: 30, label: "30ml", price: 1100, preorderPrice: 770 },
      { ml: 100, label: "100ml", price: 2400, preorderPrice: 1680 }
    ],
    badge: null,
    whatItDoes: "A capsule ampoule made with Madagascar centella. It calms irritated and sensitive skin, brightens dull skin and evens skin tone, deeply hydrates and nourishes, and helps strengthen the skin barrier.",
    keyIngredients: ["Centella Asiatica (Madagascar)"],
    howToUse: "After cleansing, apply a small amount to the face and pat gently until absorbed, then follow with moisturizer.",
    skinTypes: ["sensitive"],
    concerns: ["brightening", "hydration"],
    images: ["skin1004-centella-tone-brightening-capsule-ampoule"]
  },
  {
    slug: "tiam-pore-minimizing-21-serum",
    name: "TIAM Pore Minimizing 21 Serum",
    brand: "TIAM",
    category: "skincare",
    skincareType: "serum",
    size: "40ml",
    price: 1800,
    preorderPrice: 1260,
    badge: null,
    whatItDoes: "A niacinamide serum for clearer pores and smoother skin. It helps minimize the look of enlarged pores, controls excess oiliness, improves skin texture and helps reduce breakouts, leaving skin smoother and clearer.",
    keyIngredients: ["Niacinamide"],
    howToUse: "After cleansing, apply a few drops to the face and pat gently until absorbed, then follow with moisturizer.",
    concerns: ["acne"],
    images: ["tiam-pore-minimizing-21-serum"]
  },

  /* ----- Moisturizers ----- */
  {
    slug: "cosrx-advanced-snail-92-all-in-one-cream",
    name: "COSRX Advanced Snail 92 All in One Cream",
    brand: "COSRX",
    category: "skincare",
    skincareType: "moisturizer",
    size: "100g",
    price: 1850,
    preorderPrice: 1295,
    badge: null,
    whatItDoes: "An all-in-one cream with 92% snail secretion filtrate. It deeply hydrates and nourishes, helps repair damaged skin, improves skin texture and elasticity, and gives a healthy, natural glow.",
    keyIngredients: ["Snail Secretion Filtrate 92%"],
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    concerns: ["hydration"],
    images: ["cosrx-advanced-snail-92-all-in-one-cream"]
  },
  {
    slug: "dr-althea-345-relief-cream",
    name: "Dr.Althea 345 Relief Cream",
    brand: "Dr.Althea",
    category: "skincare",
    skincareType: "moisturizer",
    size: "50ml",
    price: 2250,
    preorderPrice: 1575,
    badge: null,
    whatItDoes: "A relief cream that soothes irritated and sensitive skin, helps repair a damaged skin barrier, deeply hydrates and locks in moisture, and strengthens skin for a healthier, smoother look.",
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    skinTypes: ["sensitive"],
    concerns: ["hydration"],
    images: ["dr-althea-345-relief-cream"]
  },
  {
    slug: "the-face-shop-rice-ceramide-moisturizing-cream",
    name: "The Face Shop Rice & Ceramide Moisturizing Cream",
    brand: "The Face Shop",
    category: "skincare",
    skincareType: "moisturizer",
    size: "50ml",
    price: 1700,
    preorderPrice: 1190,
    badge: null,
    whatItDoes: "A moisturizing cream with rice and ceramide. It deeply moisturizes, strengthens the skin's natural barrier, helps reduce dryness and roughness, and keeps skin soft and smooth.",
    keyIngredients: ["Rice", "Ceramide"],
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    concerns: ["hydration"],
    images: ["the-face-shop-rice-ceramide-moisturizing-cream"]
  },
  {
    slug: "tiam-txa-whitening-cream",
    name: "TIAM TXA Whitening Cream",
    brand: "TIAM",
    category: "skincare",
    skincareType: "moisturizer",
    size: "50ml",
    price: 2300,
    preorderPrice: 1610,
    badge: null,
    whatItDoes: "A tranexamic acid cream for brighter, clearer, healthier-looking skin. It helps brighten skin tone, fade dark spots and uneven tone, keeps skin moisturized and supports a smoother look.",
    keyIngredients: ["Tranexamic Acid (TXA)"],
    howToUse: "Apply an even layer as the last step of your routine, morning and evening. Use sunscreen in the daytime.",
    concerns: ["brightening", "hydration"],
    images: ["tiam-txa-whitening-cream"]
  },
  {
    slug: "arencia-vitamin-c-booster-shot",
    name: "Arencia Vitamin C Booster Shot",
    brand: "Arencia",
    category: "skincare",
    skincareType: ["moisturizer", "eye-care"],
    size: "50ml",
    price: 1850,
    preorderPrice: 1295,
    badge: null,
    summary: "A face and eye moisturizer with vitamin C.",
    whatItDoes: "A face and eye moisturizer with a vitamin C complex and glutathione. It helps brighten skin and boost glow, reduces the look of dark spots and uneven tone, deeply hydrates, keeps skin smooth and soft, and gives antioxidant support to help protect skin from environmental damage.",
    keyIngredients: ["Vitamin C Complex", "Glutathione"],
    howToUse: "Apply a small amount to the face and around the eyes as the last step of your routine. Use sunscreen in the daytime.",
    suitableFor: "All skin types.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: ["brightening", "hydration"],
    images: ["arencia-vitamin-c-booster-shot"]
  },

  /* ----- Sunscreens ----- */
  {
    slug: "beauty-of-joseon-relief-sun-aqua-fresh",
    name: "Beauty of Joseon Relief Sun Aqua-Fresh Rice + B5 SPF50+ PA++++",
    brand: "Beauty of Joseon",
    category: "skincare",
    skincareType: "sunscreen",
    size: "50ml",
    price: 1800,
    preorderPrice: 1260,
    badge: null,
    whatItDoes: "A lightweight SPF50+ PA++++ sunscreen with rice extract and panthenol (vitamin B5). It gives long-lasting UVA and UVB protection, hydrates and softens, strengthens the skin barrier, and has a light, non-sticky finish that absorbs quickly.",
    keyIngredients: ["Rice Extract", "Panthenol (Vitamin B5)"],
    howToUse: "Apply generously as the last step of your morning routine, 15 minutes before going out. Reapply every 2 hours in the sun.",
    suitableFor: "Sensitive, oily / combination (especially), normal and dehydrated skin.",
    skinTypes: ["sensitive", "oily", "combination", "normal"],
    concerns: ["hydration"],
    images: ["beauty-of-joseon-relief-sun-aqua-fresh"]
  },
  {
    slug: "beauty-of-joseon-relief-sun-rice-probiotics",
    name: "Beauty of Joseon Relief Sun Rice + Probiotics SPF50+ PA++++",
    brand: "Beauty of Joseon",
    category: "skincare",
    skincareType: "sunscreen",
    size: "50ml",
    price: 1900,
    preorderPrice: 1330,
    badge: null,
    whatItDoes: "An SPF50+ PA++++ sunscreen with rice and probiotics. It gives long-lasting UVA and UVB protection, deeply hydrates and softens, calms and nourishes, and has a light, non-sticky, creamy finish suited to everyday use.",
    keyIngredients: ["Rice", "Probiotics"],
    howToUse: "Apply generously as the last step of your morning routine, 15 minutes before going out. Reapply every 2 hours in the sun.",
    suitableFor: "Sensitive, dry and dehydrated, and normal skin.",
    skinTypes: ["sensitive", "dry", "normal"],
    concerns: ["hydration"],
    images: ["beauty-of-joseon-relief-sun-rice-probiotics"]
  },
  {
    slug: "missha-soft-finish-sun-milk",
    name: "MISSHA Soft Finish Sun Milk SPF50+ PA+++",
    brand: "MISSHA",
    category: "skincare",
    skincareType: "sunscreen",
    size: "70ml",
    price: 1500,
    preorderPrice: 1050,
    badge: null,
    whatItDoes: "An SPF50+ PA+++ sun milk that protects against UVA and UVB rays, gives skin a smooth, soft finish, and has a lightweight, non-greasy formula that sits easily under makeup.",
    howToUse: "Shake well. Apply generously as the last step of your morning routine, 15 minutes before going out. Reapply every 2 hours in the sun.",
    suitableFor: "All skin types.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: [],
    images: ["missha-soft-finish-sun-milk"]
  },

  /* ----- Coming soon (comingSoon: true — shown with a "Coming Soon" badge, not orderable yet).
     To launch one: remove comingSoon, set price (and preorderPrice if needed). ----- */
  {
    slug: "dabo-rice-ferment-foam",
    name: "Dabo Rice Ferment Foam (Whitening & Shining)",
    brand: "Dabo",
    category: "skincare",
    skincareType: "cleanser",
    size: "180ml",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A rice ferment foaming cleanser that removes dirt and excess oil, keeps skin soft and smooth, helps even out skin tone and helps maintain the skin's natural balance.",
    keyIngredients: ["Fermented Rice"],
    howToUse: "Work into a lather with water, massage onto damp skin, then rinse well.",
    concerns: ["brightening"],
    images: ["dabo-rice-ferment-foam"]
  },
  {
    slug: "celimax-vita-a-retinal-shot-tightening-booster",
    name: "celimax The Vita-A Retinal Shot Tightening Booster",
    brand: "celimax",
    category: "skincare",
    skincareType: "serum",
    size: "15ml",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A retinal booster that helps firm skin, smooth skin texture, minimize the look of pores and boost radiance.",
    keyIngredients: ["Retinal"],
    howToUse: "Use in the evening after cleansing: apply a small amount to the face and pat gently until absorbed, then follow with moisturizer. Use sunscreen during the day.",
    concerns: ["anti-aging"],
    images: ["celimax-vita-a-retinal-shot-tightening-booster"]
  },
  {
    slug: "dr-althea-vitamin-c-boosting-serum",
    name: "Dr.Althea Vitamin C Boosting Serum",
    brand: "Dr.Althea",
    category: "skincare",
    skincareType: "serum",
    size: "",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A vitamin C serum made with 63% sea buckthorn water. It helps brighten skin, reduce the look of spots and uneven tone, keeps skin smooth and fresh, and adds hydration.",
    keyIngredients: ["Vitamin C", "Sea Buckthorn Water 63%"],
    howToUse: "After cleansing, apply a few drops to the face and pat gently until absorbed. Follow with moisturizer, and sunscreen in the daytime.",
    concerns: ["brightening", "hydration"],
    images: ["dr-althea-vitamin-c-boosting-serum"]
  },
  {
    slug: "tiam-vita-b3-source",
    name: "TIAM Vita B3 Source",
    brand: "TIAM",
    category: "skincare",
    skincareType: "serum",
    size: "40ml",
    price: null,
    comingSoon: true,
    badge: null,
    summary: "A niacinamide serum for clear, even-toned, healthy-looking skin.",
    whatItDoes: "A niacinamide serum that helps reduce dark spots and pigmentation, evens out skin tone, reduces dryness for smoother skin, controls excess oil to keep pores clean, and helps strengthen the skin's defences.",
    keyIngredients: ["Niacinamide"],
    howToUse: "After cleansing, apply a few drops to the face and pat gently until absorbed, then follow with moisturizer.",
    concerns: ["brightening", "hydration"],
    images: ["tiam-vita-b3-source"]
  },
  {
    slug: "beauty-of-joseon-dynasty-cream",
    name: "Beauty of Joseon Dynasty Cream",
    brand: "Beauty of Joseon",
    category: "skincare",
    skincareType: "moisturizer",
    size: "50ml",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A rich cream that deeply hydrates, soothes skin, strengthens the skin barrier and leaves skin smooth and healthy.",
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    concerns: ["hydration"],
    images: ["beauty-of-joseon-dynasty-cream"]
  },
  {
    slug: "medicube-pdrn-pink-collagen-capsule-cream",
    name: "Medicube PDRN Pink Collagen Capsule Cream",
    brand: "Medicube",
    category: "skincare",
    skincareType: "moisturizer",
    size: "55g",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A capsule cream with PDRN and 5% niacinamide. It helps reduce dryness, keeps skin moisturized, helps fade the look of spots and uneven tone, and gives skin a bright, fresh look.",
    keyIngredients: ["PDRN (Sodium DNA)", "Niacinamide 5%"],
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    concerns: ["hydration", "brightening"],
    images: ["medicube-pdrn-pink-collagen-capsule-cream"]
  },
  {
    slug: "dabo-all-in-one-black-snail-repair-cream",
    name: "Dabo All In One Black Snail Repair Cream",
    brand: "Dabo",
    category: "skincare",
    skincareType: "moisturizer",
    size: "",
    price: null,
    comingSoon: true,
    badge: null,
    summary: "One cream, complete care — anti-wrinkle and whitening.",
    whatItDoes: "An all-in-one black snail cream that deeply moisturizes, helps repair damaged skin, helps improve skin tone and helps maintain skin elasticity.",
    keyIngredients: ["Black Snail Extract"],
    howToUse: "Apply an even layer as the last step of your routine, morning and evening.",
    concerns: ["hydration", "anti-aging", "brightening"],
    images: ["dabo-all-in-one-black-snail-repair-cream"]
  },
  {
    slug: "skin1004-hyalu-cica-water-fit-sun-serum",
    name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
    brand: "SKIN1004",
    category: "skincare",
    skincareType: "sunscreen",
    size: "50ml",
    price: null,
    comingSoon: true,
    badge: null,
    whatItDoes: "A lightweight SPF50+ PA++++ sun serum with centella and hyaluronic acid. It protects against UV rays, hydrates and soothes, with a light, non-greasy finish.",
    keyIngredients: ["Centella Asiatica (Madagascar)", "Hyaluronic Acid"],
    howToUse: "Apply generously as the last step of your morning routine, 15 minutes before going out. Reapply every 2 hours in the sun.",
    concerns: ["hydration"],
    images: ["skin1004-hyalu-cica-water-fit-sun-serum"]
  },
  {
    slug: "tiam-b3-niacin-sunscreen",
    name: "TIAM B3 Niacin Sunscreen SPF50+ PA++++",
    brand: "TIAM",
    category: "skincare",
    skincareType: "sunscreen",
    size: "50ml",
    price: null,
    comingSoon: true,
    badge: null,
    summary: "Everyday sun protection for healthier, more even-looking skin.",
    whatItDoes: "An SPF50+ PA++++ sunscreen with niacinamide (vitamin B3). It gives strong protection from UVA and UVB rays, helps skin tone look more even and bright, has a light, non-greasy formula that blends in easily, and helps protect skin from sun damage.",
    keyIngredients: ["Niacinamide (Vitamin B3)"],
    howToUse: "Apply generously as the last step of your morning routine, 15 minutes before going out. Reapply every 2 hours in the sun.",
    suitableFor: "Everyday use, all skin types.",
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    concerns: ["brightening"],
    images: ["tiam-b3-niacin-sunscreen"]
  }
];

/* Curated order for "Featured" — the homepage Featured Perfumes tabs
   and the Featured collection */
const FEATURED_SLUGS = [
  "creed-aventus", "good-girl", "hawas-ice", "lattafa-khamrah",
  "cloud", "club-de-nuit-intense", "vampire-blood", "bleu-de-chanel"
];

/* Skincare shown in the Skincare menu and on the homepage, in this order */
const SKINCARE_FEATURED = [
  "anua-niacinamide-10-txa-4-serum", "cosrx-advanced-snail-96-mucin-power-essence",
  "beauty-of-joseon-relief-sun-rice-probiotics", "medicube-txa-niacinamide-15-serum",
  "skin1004-centella-tone-brightening-capsule-ampoule", "dr-althea-345-relief-cream",
  "cosrx-low-ph-good-morning-gel-cleanser", "axis-y-dark-spot-correcting-glow-serum"
];

/* ============================================================
   Taxonomy — drives menus, collections and filters.
   Categories with no products yet show as "Soon" automatically.
   ============================================================ */

/* Scent families for "Find your signature scent". A perfume belongs
   to a family when its `family` text or its notes match `match`. */
const SCENT_FAMILIES = [
  { key: "fresh",  label: "Fresh",  color: "#dfe7e4", desc: "Clean, airy and aquatic — easy to wear from morning to night.",
    match: { family: /fresh|aquatic|fougère|tea/i } },
  { key: "citrus", label: "Citrus", color: "#efe6c9", desc: "Bright bergamot, lemon and orange — an instant lift.",
    match: { family: /citrus/i } },
  { key: "woody",  label: "Woody",  color: "#ddd0c0", desc: "Cedar, sandalwood and vetiver — grounded and confident.",
    match: { family: /woody/i } },
  { key: "sweet",  label: "Sweet",  color: "#f0dfd6", desc: "Vanilla, tonka and gourmand accords — warm and addictive.",
    match: { family: /sweet|gourmand|vanilla/i } },
  { key: "floral", label: "Floral", color: "#f1e1e4", desc: "Rose, jasmine and white flowers — soft, elegant and romantic.",
    match: { family: /floral/i } },
  { key: "oud",    label: "Oud",    color: "#d6cbc0", desc: "Rich agarwood with smoke and resin — deep and memorable.",
    match: { notes: /\boud\b|agarwood/i } },
  { key: "spicy",  label: "Spicy",  color: "#ead6c6", desc: "Pepper, cinnamon and cardamom — bold, warm character.",
    match: { family: /spicy/i } }
];

const SKINCARE_CATEGORIES = [
  { key: "cleanser",    label: "Cleanser" },
  { key: "toner",       label: "Toner" },
  { key: "serum",       label: "Serum" },
  { key: "moisturizer", label: "Moisturizer" },
  { key: "sunscreen",   label: "Sunscreen" },
  { key: "eye-care",    label: "Eye Care" },
  { key: "body-care",   label: "Body Care" }
];

const SKIN_TYPES = [
  { key: "oily",        label: "Oily Skin" },
  { key: "dry",         label: "Dry Skin" },
  { key: "combination", label: "Combination Skin" },
  { key: "sensitive",   label: "Sensitive Skin" },
  { key: "normal",      label: "Normal Skin" }
];

const SKIN_CONCERNS = [
  { key: "brightening", label: "Brightening" },
  { key: "hydration",   label: "Hydration" },
  { key: "anti-aging",  label: "Anti-Aging" },
  { key: "acne",        label: "Acne & Blemishes" }
];
