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
    description: 'Deep, rich cocoa meets 20g of clean whey protein. Powerful, indulgent, and impossible to put down.',
    price: '3.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/8d741ae8ad086e38560ef1a16a1217c0_560x674_fit.jpg',
    badge: 'Bestseller',
    macros: { protein: '20g', calories: '250', sugar: '5g', fat: '8g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/101', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/102', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'red-velvet-protein-brownie',
    title: 'Red Velvet Protein Brownie',
    description: 'Velvety texture with hints of vanilla and cocoa. Sophistication with 20g of protein per bite.',
    price: '3.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/0df1c70172b5e6a6af286140e26fc191_560x674_fit.jpg',
    badge: 'Customer Fav',
    macros: { protein: '20g', calories: '245', sugar: '5g', fat: '7g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/201', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/202', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'blondie-protein-brownie',
    title: 'Blondie Protein Brownie',
    description: 'Buttery caramel notes, golden texture, and 20g of protein. The one everyone keeps coming back for.',
    price: '3.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/bebbc11ca891b54536ab692ac305c4ce_560x674_fit.jpg',
    badge: 'New',
    macros: { protein: '20g', calories: '255', sugar: '5g', fat: '8g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/301', title: 'Single', price: '3.99' },
      { id: 'gid://shopify/ProductVariant/302', title: 'Case of 12', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'chocolate-protein-brownie-12-pack',
    title: 'Chocolate 12-Pack',
    description: 'A full dozen of our bestselling Chocolate Protein Brownies. Stock up and save — 20g protein in every brownie.',
    price: '39.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/8d741ae8ad086e38560ef1a16a1217c0_560x674_fit.jpg',
    badge: 'Best Value',
    macros: { protein: '20g', calories: '250', sugar: '5g', fat: '8g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/401', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'red-velvet-protein-brownie-12-pack',
    title: 'Red Velvet 12-Pack',
    description: 'A full dozen of our Red Velvet Protein Brownies. Silky, rich, and 20g of protein every single time.',
    price: '39.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/0df1c70172b5e6a6af286140e26fc191_560x674_fit.jpg',
    badge: 'Best Value',
    macros: { protein: '20g', calories: '245', sugar: '5g', fat: '7g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/501', title: '12-Pack', price: '39.99' }
    ]
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'blondie-protein-brownie-12-pack',
    title: 'Blondie 12-Pack',
    description: 'A full dozen of our Blondie Protein Brownies. Buttery caramel flavor with 20g of protein per brownie.',
    price: '39.99',
    image: 'https://www.rightchewsfoods.com/gallery_gen/bebbc11ca891b54536ab692ac305c4ce_560x674_fit.jpg',
    badge: 'Best Value',
    macros: { protein: '20g', calories: '255', sugar: '5g', fat: '8g' },
    variants: [
      { id: 'gid://shopify/ProductVariant/601', title: '12-Pack', price: '39.99' }
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
