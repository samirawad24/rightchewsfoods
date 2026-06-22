// ─────────────────────────────────────────────────────────
//  Shopify Configuration — Right Chews Foods
//
//  HOW TO CONNECT (do this tomorrow when you create your account):
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
  storeDomain:     'YOUR-STORE.myshopify.com',  // e.g. rightchewfoods.myshopify.com
  storefrontToken: 'YOUR-STOREFRONT-API-TOKEN', // paste token here
  apiVersion:      '2024-01',
  useMockData:     true  // set to false after connecting Shopify
};
