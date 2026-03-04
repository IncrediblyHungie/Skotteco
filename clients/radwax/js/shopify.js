// Radwax Factory — Shopify Buy Button SDK Integration
// Docs: https://shopify.github.io/buy-button-js/
//
// SETUP REQUIRED:
// 1. Go to Shopify Admin > Settings > Apps and sales channels
// 2. Develop apps > Create a custom app
// 3. Configure Storefront API scopes (unauthenticated_read_product_listings, unauthenticated_read_checkouts, unauthenticated_write_checkouts)
// 4. Install the app and copy the Storefront access token
// 5. Replace SHOPIFY_DOMAIN and STOREFRONT_TOKEN below

(function() {
  'use strict';

  // TODO: Replace with actual Radwax Shopify credentials
  var SHOPIFY_DOMAIN = 'rad-wax-factory.myshopify.com';
  var STOREFRONT_TOKEN = 'PLACEHOLDER_TOKEN';

  var SDK_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function initShopify() {
    if (STOREFRONT_TOKEN === 'PLACEHOLDER_TOKEN') {
      console.log('[Radwax] Shopify SDK: Using placeholder token. Replace STOREFRONT_TOKEN to enable live products.');
      return;
    }

    if (typeof ShopifyBuy === 'undefined') {
      loadScript(SDK_URL, initShopify);
      return;
    }

    var client = ShopifyBuy.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: STOREFRONT_TOKEN
    });

    ShopifyBuy.UI.onReady(client).then(function(ui) {
      // Cart component — persistent across pages
      ui.createComponent('cart', {
        options: {
          cart: {
            styles: {
              button: {
                'background-color': '#C4880D',
                'border-radius': '9999px',
                ':hover': { 'background-color': '#D49A1D' }
              }
            },
            text: {
              total: 'Subtotal',
              button: 'Checkout'
            },
            popup: false
          },
          toggle: {
            styles: {
              toggle: { 'background-color': '#C4880D' },
              count: { 'font-size': '12px' }
            }
          }
        }
      });

      // Update cart count badge
      ui.cart.model.on('updateItem', updateCartCount);
      ui.cart.model.on('addItem', updateCartCount);

      function updateCartCount() {
        var count = ui.cart.model.lineItems.length;
        var badge = document.getElementById('cartCount');
        if (badge) badge.textContent = count;
      }

      // Wire up "Add to Cart" buttons
      // Each button needs a data-shopify-id attribute with the product variant ID
      document.querySelectorAll('[data-shopify-id]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var variantId = this.getAttribute('data-shopify-id');
          ui.cart.model.addLineItems([{ variantId: variantId, quantity: 1 }]);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShopify);
  } else {
    initShopify();
  }
})();
