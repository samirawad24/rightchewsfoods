# Right Chews Foods — Project Status
**Last updated:** 2026-06-22

---

## Live URL
**GitHub Pages:** https://samirawad24.github.io/rightchewsfoods/
**GitHub Repo:** https://github.com/samirawad24/rightchewsfoods (branch: master)

---

## What's Built

### Pages
| File | Status | Notes |
|------|--------|-------|
| `index.html` | Live | Home page — hero, marquee, stats, footer |
| `shop.html` | Live | Full storefront — product grid, cart drawer, wholesale login |
| `about.html` | Live | Brand story, values, testimonials |
| `wholesale.html` | Live | Application form only — pricing NOT public |
| `contact.html` | Live | Contact form + info cards, Weston FL |

### Shared Files
- `css/style.css` — shared design system (tokens, nav, footer, buttons, forms)
- `js/nav.js` — shared nav behavior (cart badge, hamburger, scroll effect)
- `js/config.js` — Shopify credentials (currently mock mode)
- `js/shopify.js` — Storefront API wrapper + all mock product data
- `js/cart.js` — localStorage cart logic
- `robots.txt` + `sitemap.xml` — SEO crawl files

---

## Products in the Shop

### Live / For Sale (6 items)
| Product | Price |
|---------|-------|
| Chocolate Protein Brownie | $3.99 |
| Red Velvet Protein Brownie | $3.99 |
| Blondie Protein Brownie | $3.99 |
| Chocolate 12-Pack | $39.99 |
| Red Velvet 12-Pack | $39.99 |
| Blondie 12-Pack | $39.99 |

### Coming Soon (4 items — shown in grid with overlay)
| Product | Price (placeholder) |
|---------|---------------------|
| Chocolate Chip Protein Cookie | $3.99 |
| Red Velvet Protein Cookie | $3.99 |
| Blondie Protein Cookie | $3.99 |
| Confetti Protein Cookie | $3.99 |

Grid layout: 4 columns desktop → 3 on laptop → 2 on tablet/mobile

---

## Shopify Integration
- Currently running in **mock data mode** (`SHOPIFY_CONFIG.useMockData: true` in `js/config.js`)
- All products, cart, and checkout use mock data — nothing real charges yet
- Demo wholesale login: any email/password → logs in as wholesale customer
- **To connect real Shopify:** update `js/config.js` with:
  - `storeDomain: 'YOUR-STORE.myshopify.com'`
  - `storefrontToken: 'YOUR-STOREFRONT-API-TOKEN'`
  - `useMockData: false`

### Wholesale Pricing Logic (no Shopify Plus needed)
Wholesale prices are computed client-side based on Shopify customer tags:
| Tag | Unit Price |
|-----|-----------|
| `wholesale` | $2.25 |
| `wholesale-standard` | $2.10 |
| `wholesale-volume` | $1.95 |
| `wholesale-super` | $1.80 |

---

## SEO — What's In Place
- Title tags, meta descriptions — keyword-optimized on all 5 pages
- `<meta name="keywords">` — 15–18 terms per page
- Open Graph + Twitter Card tags — all pages
- JSON-LD structured data:
  - `index.html` — Organization + WebSite schema
  - `shop.html` — Product ItemList with nutrition data
  - `about.html` — AboutPage schema
  - `wholesale.html` — WebPage schema
  - `contact.html` — LocalBusiness schema (Weston, FL)
- `sitemap.xml` + `robots.txt`
- Image preloads for LCP on home + shop

**Target keywords:** protein brownies, high protein snacks, gym snacks, fitness snacks, post workout snacks, healthy brownies, whey protein brownies, clean protein snacks, buy protein brownies, protein desserts

**Next SEO step:** Submit sitemap to Google Search Console once the domain is live at rightchewsfoods.com

---

## Design Tokens
```
--brown-900: #1A0E07
--brown-800: #2C1A0E
--brown-700: #3D2411
--orange:    #D4622A
--gold:      #C9A84C
--cream-100: #FDF8F0
Fonts: Playfair Display (headings) + Inter (body)
```

---

## Pending / Next Steps
- [ ] Connect real Shopify store credentials in `js/config.js`
- [ ] Add actual product photos for cookies (currently using brownie images as placeholders)
- [ ] Set up Google Search Console and submit sitemap
- [ ] Point custom domain `rightchewsfoods.com` to GitHub Pages (or deploy to Netlify)
- [ ] Add email capture to "Notify Me When Available" button on coming soon cookies
- [ ] Privacy Policy + Terms pages (linked in footer but not built yet)

---

## Domain / Deployment
- Currently hosted on **GitHub Pages** at `samirawad24.github.io/rightchewsfoods`
- To go live on `rightchewsfoods.com`:
  - Option A: GitHub Pages — add CNAME record pointing to `samirawad24.github.io`
  - Option B: Netlify — drag and drop the folder or connect GitHub repo (recommended for better performance)

---

## Recent Git Commits
```
3ed3942  Nav: logo 64px with 12px padding top/bottom for perfect vertical centering
09336c9  Nav: grow logo to 74px and nav bar to 88px
5fbd9e8  Shop: 4-column grid, smaller cards, add 4 Coming Soon protein cookies
e0f1c94  SEO: keyword-optimize titles, descriptions, and meta across all 5 pages
ba2d2a0  Shop: replace Variety Pack with 12-pack for each flavor
a139b95  Add full SEO layer across all pages
```
