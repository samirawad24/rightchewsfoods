// ─────────────────────────────────────────────────────────
//  Shopify Configuration — Right Chews Foods
//
//  CONNECTED 2026-10-06 through the Headless sales channel.
//  Original setup notes (custom app route, no longer needed):
//
//  1. Go to your Shopify admin → Settings → Apps and sales channels
//  2. Click "Develop apps" → Create an app (name it "Storefront")
//  3. Under "API credentials", enable Storefront API access with:
//       • unauthenticated_read_product_listings
//       • unauthenticated_write_checkouts
//       • unauthenticated_read_customer_tags
//       • unauthenticated_write_customers
//  4. Copy the Storefront API access token
//  5. Paste storeDomain and storefrontToken below
//  6. Set useMockData to false
//
//  That's it — checkout, Shop Pay, and wholesale login all go live.
// ─────────────────────────────────────────────────────────

const SHOPIFY_CONFIG = {
  storeDomain:     '4zbcmw-ua.myshopify.com',
  storefrontToken: 'cc532865dc8ca78e816d2f1ba040a860', // public Storefront token (Headless channel), safe in page code
  apiVersion:      '2026-07',
  useMockData:     true,  // products + login still come from this site (photos, nutrition, stickers)

  // Shopify-hosted customer account page (sign in with an emailed code)
  accountUrl:      'https://shopify.com/99813130607/account',

  // Real Shopify checkout. On for everyone since 2026-10-07 (owner demo).
  // The store is still password protected and uses the test payment gateway.
  // Set to false to bring back the "coming soon" popup.
  checkoutLive:    true,

  // Site variant id -> Shopify variant id
  variantMap: {
    'gid://shopify/ProductVariant/101':  'gid://shopify/ProductVariant/67682740339055', // Chocolate single
    'gid://shopify/ProductVariant/102':  'gid://shopify/ProductVariant/67682740797807', // Chocolate case of 12
    'gid://shopify/ProductVariant/201':  'gid://shopify/ProductVariant/67682740470127', // Red Velvet single
    'gid://shopify/ProductVariant/202':  'gid://shopify/ProductVariant/67682740896111', // Red Velvet case of 12
    'gid://shopify/ProductVariant/301':  'gid://shopify/ProductVariant/67682740601199', // Blondie single
    'gid://shopify/ProductVariant/302':  'gid://shopify/ProductVariant/67682741125487', // Blondie case of 12
    'gid://shopify/ProductVariant/401':  'gid://shopify/ProductVariant/67682740797807', // Chocolate 12-Pack
    'gid://shopify/ProductVariant/501':  'gid://shopify/ProductVariant/67682740896111', // Red Velvet 12-Pack
    'gid://shopify/ProductVariant/601':  'gid://shopify/ProductVariant/67682741125487', // Blondie 12-Pack
    'gid://shopify/ProductVariant/1101': 'gid://shopify/ProductVariant/67682741354863'  // Variety 12-Pack
  }
};
