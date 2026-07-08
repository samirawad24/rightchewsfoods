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
    image: 'images/2.0/chocolate-brownie-08.jpg',
    imgPosition: 'center 55%',
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
    image: 'images/2.0/red-velvet-brownie-04.jpg',
    imgPosition: 'center 55%',
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
    image: 'images/2.0/blondie-brownie-09.jpg',
    imgPosition: 'center 55%',
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
    id: 'gid://shopify/Product/4',
    handle: 'chocolate-protein-brownie-12-pack',
    title: 'Chocolate 12-Pack',
    description: 'A full dozen of our bestselling Chocolate Protein Brownies. Stock up and save — 19g protein in every brownie.',
    price: '39.99',
    image: 'images/brownie-dozen.png',
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
    image: 'images/red-velvet-dozen.png',
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
    image: 'images/blondie-dozen.png',
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
    id: 'gid://shopify/Product/11',
    handle: 'variety-brownie-12-pack',
    title: 'Variety Brownie 12-Pack',
    description: 'Can\'t pick a favorite? Get 4 of each — Chocolate, Red Velvet & Blondie — in one box. The best way to try everything Right Chews has to offer.',
    price: '39.99',
    image: 'images/2.0/trio-04.jpg',
    imgPosition: 'center 50%',
    nutritionVaries: true,
    badge: 'Try All 3',
    macros: { protein: '19g', calories: '150–180', sugar: '2.5–3g', fat: '3–6g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1101', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'chocolate-chip-protein-cookie',
    title: 'Chocolate Chip Protein Cookie',
    imgPosition: 'center 50%',
    description: 'Classic chocolate chip with clean protein. A whole new way to hit your macros.',
    price: '3.99',
    image: 'images/2.0/choc-chip-cookie-01.jpg',
    comingSoon: true, nutritionTba: true,
    macros: { protein: 'TBA', calories: 'TBA', sugar: 'TBA', fat: 'TBA' },
    variants: [
      { id: 'gid://shopify/ProductVariant/701', title: 'Single', price: '3.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'double-chocolate-protein-cookie',
    title: 'Double Chocolate Protein Cookie',
    description: 'Rich cocoa cookie loaded with chocolate chips. Twice the chocolate, all the protein.',
    price: '3.99',
    image: 'images/2.0/double-chocolate-cookie-02.jpg',
    imgPosition: 'center 50%',
    comingSoon: true, nutritionTba: true,
    macros: { protein: 'TBA', calories: 'TBA', sugar: 'TBA', fat: 'TBA' },
    variants: [
      { id: 'gid://shopify/ProductVariant/801', title: 'Single', price: '3.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/9',
    handle: 'blondie-protein-cookie',
    title: 'Blondie Protein Cookie',
    description: 'Buttery, caramel-kissed, and loaded with clean protein. The cookie your sweet tooth and macros both agree on.',
    price: '3.99',
    image: 'images/blondie-brownie.png',
    comingSoon: true, nutritionTba: true,
    macros: { protein: 'TBA', calories: 'TBA', sugar: 'TBA', fat: 'TBA' },
    variants: [
      { id: 'gid://shopify/ProductVariant/901', title: 'Single', price: '3.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/10',
    handle: 'confetti-protein-cookie',
    title: 'Confetti Protein Cookie',
    description: 'Funfetti vibes with serious protein. Because high-protein snacks should be fun.',
    price: '3.99',
    image: 'images/2.0/confetti-brownie-13.jpg',
    imgPosition: 'center 55%',
    comingSoon: true, nutritionTba: true,
    macros: { protein: 'TBA', calories: 'TBA', sugar: 'TBA', fat: 'TBA' },
    variants: [
      { id: 'gid://shopify/ProductVariant/1001', title: 'Single', price: '3.99' }
    ]
  }
];

// Wholesale price per unit (multiplied by retail $3.99)
// In Shopify, tag wholesale customers with: 'wholesale', 'wholesale-standard',
// 'wholesale-volume', or 'wholesale-super'
const WHOLESALE_UNIT_PRICES = {
  'wholesale-super':    1.80,
  'wholesale-volume':   1.95,
  'wholesale-standard': 2.10,
  'wholesale':          2.25
};

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
  if (SHOPIFY_CONFIG.useMockData) {
    return { mock: true };
  }

  const data = await storefrontFetch(`
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { id webUrl }
        checkoutUserErrors { message }
      }
    }
  `, {
    input: {
      lineItems: lineItems.map(i => ({ variantId: i.variantId, quantity: i.quantity }))
    }
  });

  const result = data.checkoutCreate;
  if (result.checkoutUserErrors.length > 0) throw new Error(result.checkoutUserErrors[0].message);
  return result.checkout;
}

// ── Customer Auth ───────────────────────────────────────
async function loginCustomer(email, password) {
  if (SHOPIFY_CONFIG.useMockData) {
    // Demo mode: any credentials succeed and return a mock wholesale account
    return {
      customerAccessToken: {
        accessToken: 'demo-wholesale-token',
        expiresAt: new Date(Date.now() + 86400000).toISOString()
      }
    };
  }

  const data = await storefrontFetch(`
    mutation CustomerLogin($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { message }
      }
    }
  `, { input: { email, password } });

  const result = data.customerAccessTokenCreate;
  if (result.customerUserErrors.length > 0) throw new Error(result.customerUserErrors[0].message);
  return result;
}

async function getCustomer(accessToken) {
  if (SHOPIFY_CONFIG.useMockData && accessToken === 'demo-wholesale-token') {
    return {
      id: 'demo-customer',
      firstName: 'Wholesale',
      lastName: 'Demo',
      email: 'wholesale@demo.com',
      tags: ['wholesale']
    };
  }

  const data = await storefrontFetch(`
    query GetCustomer($token: String!) {
      customer(customerAccessToken: $token) {
        id firstName lastName email tags
      }
    }
  `, { customerAccessToken: accessToken });

  if (!data.customer) throw new Error('Session expired. Please log in again.');
  return data.customer;
}

// ── Wholesale Pricing Helpers ───────────────────────────
function calcWholesalePrice(retailPrice, tags = []) {
  for (const key of Object.keys(WHOLESALE_UNIT_PRICES)) {
    if (tags.includes(key)) {
      return WHOLESALE_UNIT_PRICES[key].toFixed(2);
    }
  }
  return null;
}

function getWholesaleTierName(tags = []) {
  if (tags.includes('wholesale-super'))    return 'Super Volume — 25+ cases ($1.80/unit)';
  if (tags.includes('wholesale-volume'))   return 'Volume Tier — 10–24 cases ($1.95/unit)';
  if (tags.includes('wholesale-standard')) return 'Standard Tier — 5–9 cases ($2.10/unit)';
  if (tags.includes('wholesale'))          return 'Sample Tier — 1–4 cases ($2.25/unit)';
  return null;
}

function isWholesaleCustomer(tags = []) {
  return Object.keys(WHOLESALE_UNIT_PRICES).some(t => tags.includes(t));
}
