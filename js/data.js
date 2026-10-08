/* ============================================================
   AURORABD — A Signature of Confidence
   Site configuration + product catalog
   ============================================================ */

const AURORA = {
  /* AuroraBD's WhatsApp number — all orders and contact messages
     open a chat here (country code + number) */
  whatsapp: "+8801911247619",
  currency: "৳", /* ৳ */
  deliveryFee: 100,
  deliveryNote: "Home delivery all over Bangladesh — flat ৳100",
  /* Short messages for the announcement bar at the very top */
  announcements: [
    "Flat ৳100 home delivery across Bangladesh",
    "Cash on delivery",
    "Order easily on WhatsApp"
  ],
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
   skincareType: a key from SKINCARE_CATEGORIES (e.g. "serum")
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
  }
];

/* Curated order for "Featured" — the homepage Featured Perfumes tabs
   and the Featured collection */
const FEATURED_SLUGS = [
  "creed-aventus", "good-girl", "hawas-ice", "lattafa-khamrah",
  "cloud", "club-de-nuit-intense", "vampire-blood", "bleu-de-chanel"
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
