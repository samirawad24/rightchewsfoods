// ─────────────────────────────────────────────────────────
//  Shopify Storefront API Wrapper — Right Chews Foods
//  Works with mock data now, connects to real Shopify when
//  SHOPIFY_CONFIG.useMockData is set to false in config.js
// ─────────────────────────────────────────────────────────

const MOCK_PRODUCTS = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'chocolate-protein-brownie',
    title: 'Chocolate Protein Brownie',
    description: 'Powerful, rich, and functional. Our Chocolate Protein Brownie delivers deep cocoa flavor with a soft, satisfying texture. High in protein and low in sugar, made with premium ingredients to support performance and an active lifestyle.',
    price: '3.99',
    image: 'images/3.0/chocolate-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 150,
      totalFat: { amount: '5g', dv: '8%' }, satFat: { amount: '3g', dv: '13%' },
      transFat: '0g', cholesterol: { amount: '2mg', dv: '4%' },
      sodium: { amount: '171mg', dv: '7%' }, totalCarb: { amount: '12g', dv: '5%' },
      fiber: { amount: '4g', dv: '14%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Cocoa Powder, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, Dark Choco, Choco Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'Bestseller',
    macros: { protein: '19g', calories: '150', sugar: '2.5g', fat: '5g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/101', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/102', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'red-velvet-protein-brownie',
    title: 'Red Velvet Protein Brownie',
    description: 'Sophistication with purpose. The Red Velvet Protein Brownie offers a delicate texture and balanced flavor profile, high in protein and low in carbohydrates. Designed for those who want premium nutrition without giving up indulgence.',
    price: '3.99',
    image: 'images/3.0/red-velvet-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 170,
      totalFat: { amount: '3g', dv: '5%' }, satFat: { amount: '1.5g', dv: '8%' },
      transFat: '0g', cholesterol: { amount: '21mg', dv: '7%' },
      sodium: { amount: '190mg', dv: '8%' }, totalCarb: { amount: '10g', dv: '4%' },
      fiber: { amount: '3g', dv: '12%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Cocoa Powder, Beetroot Powder, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, White Choco, White Choco Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'Customer Fav',
    macros: { protein: '19g', calories: '170', sugar: '2.5g', fat: '3g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/201', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/202', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'blondie-protein-brownie',
    title: 'Blondie Protein Brownie',
    description: 'Soft, golden, and functional. The Blondie Protein Brownie is a refined alternative to chocolate, high in protein and low in sugar. Ideal as a smart snack to stay fueled, satisfied, and in control.',
    price: '3.99',
    image: 'images/3.0/blondie-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 180,
      totalFat: { amount: '6g', dv: '9%' }, satFat: { amount: '3g', dv: '16%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, Milk Choc, Choc Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '180', sugar: '3g', fat: '6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/301', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/302', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'pistachio-protein-brownie',
    title: 'Pistachio Chocolate Protein Brownie',
    description: 'Real pistachio pieces and milk chocolate chips in a soft, nutty protein brownie.',
    price: '3.99',
    image: 'images/3.0/pistachio-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 190,
      totalFat: { amount: '7g', dv: '9.5%' }, satFat: { amount: '3g', dv: '17%' },
      transFat: '0g', cholesterol: { amount: '8mg', dv: '13%' },
      sodium: { amount: '170mg', dv: '6%' }, totalCarb: { amount: '17g', dv: '6%' },
      fiber: { amount: '4.5g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Pistachio Flour, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafer, Milk Chocolate Wafers, CMC, Baking Powder, Baking Soda, Salt, Corn Starch, Potassium Sorbate, Vanilla Extract, Pistachio Pieces, Water, Pistachio Extract, Milk Chocolate Chips, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk, Tree Nuts (Pistachio).'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '190', sugar: '3g', fat: '7g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/701', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/702', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'orange-royal-cream-protein-brownie',
    title: 'Orange Royal Cream Protein Brownie',
    description: 'Real orange peel and creamy white chocolate chips in a soft protein brownie.',
    price: '3.99',
    image: 'images/3.0/orange-creamsicle-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 180,
      totalFat: { amount: '6g', dv: '9%' }, satFat: { amount: '3g', dv: '16%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafers, White Chocolate Chips, CMC, Baking Powder, Baking Soda, Corn Starch, Salt, Potassium Sorbate, Vanilla Extract, Orange Extract, Powdered Orange Peel and Water, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '180', sugar: '3g', fat: '6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/801', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/802', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/9',
    handle: 'snickerdoodle-protein-brownie',
    title: 'Snickerdoodle Protein Brownie',
    description: 'Warm cinnamon sugar on top of a soft, buttery protein brownie.',
    price: '3.99',
    image: 'images/3.0/snickerdoodle-brownie-single.webp',
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 pack (70g)', calories: 165,
      totalFat: { amount: '5g', dv: '8.5%' }, satFat: { amount: '2.5g', dv: '15%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafer, CMC, Baking Powder, Baking Soda, Corn Starch, Salt, Potassium Sorbate, Cinnamon Extract, Butter Extract, Vanilla Extract, Ground Cinnamon and Water, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '165', sugar: '2.5g', fat: '5g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/901', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/902', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'chocolate-protein-brownie-12-pack',
    title: 'Chocolate 12-Pack',
    description: 'A full dozen of our bestselling Chocolate Protein Brownies. Stock up and save — 19g protein in every brownie.',
    price: '39.99',
    image: 'images/3.0/chocolate-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 150,
      totalFat: { amount: '5g', dv: '8%' }, satFat: { amount: '3g', dv: '13%' },
      transFat: '0g', cholesterol: { amount: '2mg', dv: '4%' },
      sodium: { amount: '171mg', dv: '7%' }, totalCarb: { amount: '12g', dv: '5%' },
      fiber: { amount: '4g', dv: '14%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Cocoa Powder, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, Dark Choco, Choco Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'Best Value',
    macros: { protein: '19g', calories: '150', sugar: '2.5g', fat: '5g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/401', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'red-velvet-protein-brownie-12-pack',
    title: 'Red Velvet 12-Pack',
    description: 'A full dozen of our Red Velvet Protein Brownies. Silky, rich, and 19g of protein every single time.',
    price: '39.99',
    image: 'images/3.0/red-velvet-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 170,
      totalFat: { amount: '3g', dv: '5%' }, satFat: { amount: '1.5g', dv: '8%' },
      transFat: '0g', cholesterol: { amount: '21mg', dv: '7%' },
      sodium: { amount: '190mg', dv: '8%' }, totalCarb: { amount: '10g', dv: '4%' },
      fiber: { amount: '3g', dv: '12%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Cocoa Powder, Beetroot Powder, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, White Choco, White Choco Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'Best Value',
    macros: { protein: '19g', calories: '170', sugar: '2.5g', fat: '3g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/501', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'blondie-protein-brownie-12-pack',
    title: 'Blondie 12-Pack',
    description: 'A full dozen of our Blondie Protein Brownies. Buttery caramel flavor with 19g of protein per brownie.',
    price: '39.99',
    image: 'images/3.0/blondie-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 180,
      totalFat: { amount: '6g', dv: '9%' }, satFat: { amount: '3g', dv: '16%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Erythritol, Sugarcane, Dried Egg Whites, Whey Protein Powder, Eggs, Coconut Oil, Milk Choc, Choc Chips, CMC, Baking Soda, Vinegar, Water, Vanilla Extract, Salt, Potassium Sorbate, Vitamin E Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'Best Value',
    macros: { protein: '19g', calories: '180', sugar: '3g', fat: '6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/601', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/12',
    handle: 'pistachio-protein-brownie-12-pack',
    title: 'Pistachio 12-Pack',
    description: 'A full dozen of our Pistachio Chocolate Protein Brownies. Real pistachio pieces and milk chocolate chips in a soft, nutty protein brownie.',
    price: '39.99',
    image: 'images/3.0/pistachio-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 190,
      totalFat: { amount: '7g', dv: '9.5%' }, satFat: { amount: '3g', dv: '17%' },
      transFat: '0g', cholesterol: { amount: '8mg', dv: '13%' },
      sodium: { amount: '170mg', dv: '6%' }, totalCarb: { amount: '17g', dv: '6%' },
      fiber: { amount: '4.5g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Pistachio Flour, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafer, Milk Chocolate Wafers, CMC, Baking Powder, Baking Soda, Salt, Corn Starch, Potassium Sorbate, Vanilla Extract, Pistachio Pieces, Water, Pistachio Extract, Milk Chocolate Chips, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk, Tree Nuts (Pistachio).'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '190', sugar: '3g', fat: '7g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1201', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/13',
    handle: 'orange-royal-cream-protein-brownie-12-pack',
    title: 'Orange Royal Cream 12-Pack',
    description: 'A full dozen of our Orange Royal Cream Protein Brownies. Real orange peel and creamy white chocolate chips in a soft protein brownie.',
    price: '39.99',
    image: 'images/3.0/orange-creamsicle-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 180,
      totalFat: { amount: '6g', dv: '9%' }, satFat: { amount: '3g', dv: '16%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '3g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafers, White Chocolate Chips, CMC, Baking Powder, Baking Soda, Corn Starch, Salt, Potassium Sorbate, Vanilla Extract, Orange Extract, Powdered Orange Peel and Water, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '180', sugar: '3g', fat: '6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1301', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/14',
    handle: 'snickerdoodle-protein-brownie-12-pack',
    title: 'Snickerdoodle 12-Pack',
    description: 'A full dozen of our Snickerdoodle Protein Brownies. Warm cinnamon sugar on top of a soft, buttery protein brownie.',
    price: '39.99',
    image: 'images/3.0/snickerdoodle-12pack.webp',
    sticker: { num: '12', word: 'pack' },
    imgPosition: 'center 50%',
    nutrition: {
      servingSize: '1 brownie (70g)', servingsPerContainer: 12, calories: 165,
      totalFat: { amount: '5g', dv: '8.5%' }, satFat: { amount: '2.5g', dv: '15%' },
      transFat: '0g', cholesterol: { amount: '6mg', dv: '12%' },
      sodium: { amount: '160mg', dv: '6%' }, totalCarb: { amount: '15g', dv: '5%' },
      fiber: { amount: '4g', dv: '16%' }, sugars: '2.5g', protein: '19g',
      ingredients: 'Whole Wheat Flour, Dried Egg Whites, Whey Protein, Coconut Oil, Erythritol, Brown Sugar, Eggs, White Chocolate Wafer, CMC, Baking Powder, Baking Soda, Corn Starch, Salt, Potassium Sorbate, Cinnamon Extract, Butter Extract, Vanilla Extract, Ground Cinnamon and Water, Cornstarch, Baking Powder.',
      allergens: 'Wheat, Egg, Milk.'
    },
    badge: 'New',
    macros: { protein: '19g', calories: '165', sugar: '2.5g', fat: '5g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1401', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/11',
    handle: 'variety-brownie-12-pack',
    title: 'Variety Brownie 12-Pack',
    description: 'Can\'t pick a favorite? Get 4 of each — Chocolate, Red Velvet & Blondie — in one box. The best way to try everything Right Chews has to offer.',
    price: '39.99',
    image: 'images/3.0/trio-brownie-fan.webp',
    imgPosition: 'center 50%',
    nutritionVaries: true,
    badge: 'Try All 3',
    macros: { protein: '19g', calories: '150–180', sugar: '2.5–3g', fat: '3–6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1101', title: '12-Pack', price: '39.99' }
    ]
  }
];

// ── Base Shopify fetch ──────────────────────────────────
async function storefrontFetch(query, variables = {}) {
  const res = await fetch(
    `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken
      },
      body: JSON.stringify({ query, variables })
    }
  );
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Products ────────────────────────────────────────────
async function getProducts() {
  if (SHOPIFY_CONFIG.useMockData) return MOCK_PRODUCTS;

  const data = await storefrontFetch(`
    query {
      products(first: 20) {
        edges { node {
          id handle title description tags
          images(first: 1) { edges { node { url } } }
          variants(first: 5) { edges { node {
            id title
            price { amount }
          }}}
        }}
      }
    }
  `);

  return data.products.edges.map(({ node: p }) => ({
    id:       p.id,
    handle:   p.handle,
    title:    p.title,
    description: p.description,
    tags:     p.tags,
    image:    p.images.edges[0]?.node.url || '',
    price:    p.variants.edges[0]?.node.price.amount || '0',
    macros:   {},
    variants: p.variants.edges.map(({ node: v }) => ({
      id: v.id, title: v.title, price: v.price.amount
    }))
  }));
}

// ── Checkout ────────────────────────────────────────────
async function createCheckout(lineItems) {
  if (!SHOPIFY_CONFIG.checkoutLive) {
    return { mock: true };
  }

  // Merge lines that map to the same Shopify variant (single "case of 12" + 12-pack)
  const merged = {};
  for (const i of lineItems) {
    const id = SHOPIFY_CONFIG.variantMap[i.variantId] || i.variantId;
    merged[id] = (merged[id] || 0) + i.quantity;
  }

  const data = await storefrontFetch(`
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { message }
      }
    }
  `, {
    input: {
      lines: Object.entries(merged).map(([merchandiseId, quantity]) => ({ merchandiseId, quantity })),
      attributes: (typeof window.rcSourceAttributes === 'function') ? window.rcSourceAttributes() : []
    }
  });

  const result = data.cartCreate;
  if (result.userErrors.length > 0) throw new Error(result.userErrors[0].message);
  let webUrl = result.cart.checkoutUrl;
  const utm = (typeof window.rcSourceUtm === 'function') ? window.rcSourceUtm() : '';
  if (utm) webUrl += (webUrl.indexOf('?') === -1 ? '?' : '&') + utm;
  return { id: result.cart.id, webUrl };
}

// ── Customer accounts ───────────────────────────────────
// Customers sign in on Shopify's hosted account page (SHOPIFY_CONFIG.accountUrl).
// Wholesale pricing is applied by Shopify at checkout for approved accounts,
// so the site always shows retail prices. These stubs keep shop.html working.
async function loginCustomer() { throw new Error('Sign in on the account page.'); }
async function getCustomer()   { throw new Error('Not signed in.'); }
function calcWholesalePrice()  { return null; }
function getWholesaleTierName() { return ''; }
function isWholesaleCustomer() { return false; }
