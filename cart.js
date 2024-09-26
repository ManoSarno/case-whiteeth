import { products } from './dataProducts.js';

document.addEventListener('DOMContentLoaded', function() {
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const drawerCart = document.getElementById('drawerCart');
  const overlay = document.querySelector('.overlay');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cart-total');
  const drawerFooter = document.querySelector('.drawer-footer');
  
  // Open cart and show overlay
  function openCart() {
    drawerCart.classList.add('open');
    if(overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
    }
  }

  // Close cart and hide overlay
  function closeCart() {
    drawerCart.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }

  closeCartBtn.addEventListener('click', closeCart);
  openCartBtn.addEventListener('click', openCart);

  const CART_STORAGE_KEY = 'shoppingCart';

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

  // Save cart
  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  // Update total price
  function updateTotal() {
    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    cartTotal.textContent = `R$${total.toFixed(2)}`;
  }

  // Render cart with elements inside
  function renderCart() {
    cartItemsContainer.innerHTML = '';

    // If cart is empty, renders message and button to close cart
    if (cart.length === 0) {
      const emptyCart = document.createElement('div');
      emptyCart.classList.add('empty-cart');

      emptyCart.innerHTML = `
        <h3>Seu carrinho está vazio!</h3>
        <button id="closeBtn" class="button scheme--3">Continue comprando</button>
      `;
      
      cartItemsContainer.appendChild(emptyCart);
      drawerFooter.classList.add('hidden');
    } else {
      // If cart is not empty, renders cart items
      drawerFooter.classList.remove('hidden');
        
      cart.forEach((product, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <div class="item-image-wrapper">
            <img src="assets/${product.image}" alt="${product.name}">
          </div>
          <div class="item-info-wrapper">
            <div class="item-title-wrapper">
              <p class="product-title">${product.name}</p>
              <button class="remove">
                <svg class="icon-remove" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            </div>
            <div class="item-info">
              <div class="quantity-controls">
                <button class="decrement">
                  <svg class="quantity-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.91699 7H11.0837" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                  </svg>
                </button>
                <span>${product.quantity}</span>
                <button class="increment">
                  <svg class="quantity-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2.91675V11.0834" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                    <path d="M2.91699 7H11.0837" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <span>R$${(product.price * product.quantity).toFixed(2)}</span>
            </div>
          </div>
        `;

        // Decrement quantity
        itemElement.querySelector('.decrement').addEventListener('click', () => {
          if (product.quantity > 1) {
            product.quantity--;
            saveCart();
            renderCart();
            updateTotal();
          }
        });

        // Increment quantity
        itemElement.querySelector('.increment').addEventListener('click', () => {
          product.quantity++;
          saveCart();
          renderCart();
          updateTotal();
        });

        // Remove item
        itemElement.querySelector('.remove').addEventListener('click', () => {
          cart.splice(index, 1);
          saveCart();
          renderCart();
          updateTotal();
        });

        cartItemsContainer.appendChild(itemElement);
      });
    }
    
    document.getElementById('closeBtn').addEventListener('click', closeCart);
    updateTotal();
  }

  // Add a product to the cart
  function addToCart(productId) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      // If product already on cart, increase quantity
      existingProduct.quantity++;
    } else {
      const product = products.find(p => p.id === productId);
      
      if (product) {
        cart.push({ ...product, quantity: 1 });
      }
    }

    saveCart();
    renderCart();
    updateTotal();
    openCartBtn.click();
  }

  // Event listener to add to cart buttons
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      addToCart(productId);
    });
  });

  // Initialize cart on page load
  renderCart();
});
