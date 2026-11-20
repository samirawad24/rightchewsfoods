/* Right Chews Foods: visitor source tracking.
   Saves where a visitor came from (tagged link, referring site, or direct)
   for 30 days so it can be attached to their Shopify order at checkout.
   Also loads Google Analytics when RC_GA_ID is set. */
(function () {
  var RC_GA_ID = ''; // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'

  var KEY = 'rc_source';
  var DAYS = 30;
  var OWN_HOSTS = ['rightchewsfoods.com', 'www.rightchewsfoods.com', 'myshopify.com', 'shopify.com', 'shop.app', 'localhost', '127.0.0.1'];

  // Friendly names for common referrers
  var NAMES = [
    ['instagram', 'instagram'], ['facebook', 'facebook'], ['fb.', 'facebook'], ['t.co', 'twitter'],
    ['twitter', 'twitter'], ['x.com', 'twitter'], ['tiktok', 'tiktok'], ['google', 'google'],
    ['bing', 'bing'], ['yahoo', 'yahoo'], ['duckduckgo', 'duckduckgo'], ['pinterest', 'pinterest'],
    ['youtube', 'youtube'], ['linkedin', 'linkedin'], ['reddit', 'reddit'], ['chatgpt', 'chatgpt'],
    ['openai', 'chatgpt'], ['perplexity', 'perplexity'], ['claude.ai', 'claude']
  ];

  function isOwn(host) {
    return OWN_HOSTS.some(function (h) { return host === h || host.slice(-(h.length + 1)) === '.' + h; });
  }

  function nameFor(host) {
    for (var i = 0; i < NAMES.length; i++) if (host.indexOf(NAMES[i][0]) !== -1) return NAMES[i][1];
    return host.replace(/^www\./, '');
  }

  function read() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (d && d.expires > Date.now()) return d;
    } catch (e) {}
    return null;
  }

  function write(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }

  // What brought the visitor to this page view, or null if it was an internal click
  function detect() {
    var p = new URLSearchParams(location.search);
    var utm = p.get('utm_source');
    if (utm) {
      return { source: utm.toLowerCase(), medium: (p.get('utm_medium') || '').toLowerCase(), campaign: p.get('utm_campaign') || '' };
    }
    if (p.get('fbclid')) return { source: 'facebook', medium: 'social', campaign: '' };
    if (p.get('gclid')) return { source: 'google', medium: 'ads', campaign: '' };

    var ref = document.referrer;
    if (ref) {
      var host = '';
      try { host = new URL(ref).hostname.toLowerCase(); } catch (e) {}
      if (host && !isOwn(host)) {
        var name = nameFor(host);
        var search = ['google', 'bing', 'yahoo', 'duckduckgo'].indexOf(name) !== -1;
        return { source: name, medium: search ? 'search' : 'referral', campaign: '', referrer: host };
      }
      if (host) return null; // clicked through from our own pages
    }
    return { source: 'direct', medium: '', campaign: '' };
  }

  var now = Date.now();
  var hit = detect();
  var saved = read();

  if (hit) {
    hit.landing = location.pathname;
    hit.date = new Date(now).toISOString().slice(0, 10);
    if (!saved) {
      saved = { first: hit, last: hit };
    } else if (hit.source !== 'direct') {
      saved.last = hit; // a real source replaces the latest touch; plain direct visits do not
    }
    saved.expires = now + DAYS * 864e5;
    write(saved);
  }

  // Used by js/shopify.js when the cart is created
  window.rcSourceAttributes = function () {
    var d = read();
    if (!d) return [];
    var out = [];
    function add(k, v) { if (v) out.push({ key: k, value: String(v).slice(0, 200) }); }
    add('Source', d.last.source);
    add('Medium', d.last.medium);
    add('Campaign', d.last.campaign);
    add('Referrer', d.last.referrer);
    add('Landing page', d.last.landing);
    add('Source date', d.last.date);
    if (d.first.source !== d.last.source || d.first.date !== d.last.date) {
      add('First source', d.first.source + (d.first.date ? ' (' + d.first.date + ')' : ''));
    }
    return out;
  };

  // UTM tags for the Shopify checkout link, so Shopify's own Conversion panel shows the source too
  window.rcSourceUtm = function () {
    var d = read();
    if (!d || d.last.source === 'direct') return '';
    var p = new URLSearchParams();
    p.set('utm_source', d.last.source);
    if (d.last.medium) p.set('utm_medium', d.last.medium);
    if (d.last.campaign) p.set('utm_campaign', d.last.campaign);
    return p.toString();
  };

  // Google Analytics 4
  if (RC_GA_ID && location.hostname.indexOf('rightchewsfoods.com') !== -1) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + RC_GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', RC_GA_ID);
  }
})();
