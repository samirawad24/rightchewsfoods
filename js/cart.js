// ─────────────────────────────────────────────────────────
//  Cart & Auth — Right Chews Foods
//  Cart persists in localStorage across pages.
//  Checkout redirects to Shopify hosted checkout (Shop Pay).
// ─────────────────────────────────────────────────────────

const CART_KEY = 'rc_cart';
const AUTH_KEY = 'rc_auth';

// ── Cart CRUD ───────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || { items: [] }; }
  catch { return { items: [] }; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (typeof updateCartUI === 'function') updateCartUI();
}

function addToCart(product, variantId, quantity, wholesalePrice) {
  const cart = getCart();
  const variant = product.variants.find(v => v.id === variantId);
  const existingIdx = cart.items.findIndex(i => i.variantId === variantId);

  if (existingIdx >= 0) {
    cart.items[existingIdx].quantity += quantity;
  } else {
    cart.items.push({
      variantId,
      productId:    product.id,
      title:        product.title,
      variantTitle: variant?.title || '',
      price:        wholesalePrice || variant?.price || product.price,
      isWholesale:  !!wholesalePrice,
      image:        product.image,
      quantity
    });
  }
  saveCart(cart);
  if (typeof openCart === 'function') openCart();
}

function removeFromCart(variantId) {
  const cart = getCart();
  cart.items = cart.items.filter(i => i.variantId !== variantId);
  saveCart(cart);
}

function updateCartQty(variantId, quantity) {
  const cart = getCart();
  const idx = cart.items.findIndex(i => i.variantId === variantId);
  if (idx < 0) return;
  if (quantity <= 0) cart.items.splice(idx, 1);
  else cart.items[idx].quantity = quantity;
  saveCart(cart);
}

function getCartCount() {
  return getCart().items.reduce((sum, i) => sum + i.quantity, 0);
}

function getCartTotal() {
  return getCart().items
    .reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0)
    .toFixed(2);
}

// ── Auth ────────────────────────────────────────────────
function getAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); }
  catch { return null; }
}

function setAuth(data) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

// ── Checkout ────────────────────────────────────────────
async function handleCheckout() {
  const cart = getCart();
  if (cart.items.length === 0) return;

  const btn = document.getElementById('checkoutBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Preparing checkout…'; }

  try {
    const lineItems = cart.items.map(i => ({ variantId: i.variantId, quantity: i.quantity }));
    const checkout = await createCheckout(lineItems);

    if (checkout.mock) {
      showMockCheckoutModal();
      return;
    }

    window.location.href = checkout.webUrl;
  } catch (err) {
    alert('Unable to start checkout. Please try again.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Checkout'; }
  }
}

function showMockCheckoutModal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(26,14,7,.75);z-index:9999;
    display:flex;align-items:center;justify-content:center;
    backdrop-filter:blur(8px);padding:24px;
  `;
  overlay.innerHTML = `
    <div style="background:#FDF8F0;border-radius:24px;padding:40px 36px;max-width:460px;
      width:100%;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.3);">
      <div style="width:60px;height:60px;border-radius:50%;
        background:linear-gradient(135deg,#2C1A0E,#5C3518);
        display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      </div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.4rem;
        color:#2C1A0E;margin-bottom:12px;">Almost Ready to Ship!</h3>
      <p style="color:#8A7060;font-size:.95rem;line-height:1.65;margin-bottom:8px;">
        Your cart is ready. Once you connect your Shopify account, this button
        will redirect to live Shopify checkout with <strong style="color:#2C1A0E;">Shop Pay</strong> available.
      </p>
      <p style="color:#8A7060;font-size:.85rem;margin-bottom:28px;">
        Open <code style="background:#F5ECD7;padding:2px 6px;border-radius:4px;
        font-size:.8rem;">js/config.js</code> and paste in your store credentials to go live.
      </p>
      <button onclick="this.closest('div[style]').remove()"
        style="background:#D4622A;color:#fff;border:none;padding:13px 32px;
        border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;
        transition:background 200ms;">
        Got It
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}
