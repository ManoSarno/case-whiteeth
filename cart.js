import { products } from './dataProducts.js';

document.addEventListener('DOMContentLoaded', function() {
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const drawerCart = document.getElementById('drawerCart');
  const cartTotal = document.getElementById('cart-total');
  
  openCartBtn.addEventListener('click', () => {
    drawerCart.classList.add('open');
  });

  closeCartBtn.addEventListener('click', () => {
    drawerCart.classList.remove('open');
  });

  // Função para adicionar um produto ao carrinho
  function addToCart(productId) {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o produto já está no carrinho
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
      // Se o produto já existe no carrinho, aumenta a quantidade
      cart[existingProductIndex].quantity += 1;
    } else {
      // Se não, encontra o produto e adiciona ao carrinho
      const product = products.find(item => item.id === productId);
      cart.push({ ...product, quantity: 1 });
    }

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem de sucesso
    alert(`${products.find(item => item.id === productId).name} foi adicionado ao carrinho!`);
  }

  // Adicionar evento para os botões de adicionar ao carrinho
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      addToCart(productId);
    });
  });

  function updateTotal() {
    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    cartTotal.textContent = `R$${total.toFixed(2)}`;
  }

  // Função para exibir os itens do carrinho
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');

    cartContainer.innerHTML = ''; // Limpa o conteúdo antes de exibir os produtos

    if (cart.length === 0) {
      cartContainer.innerHTML = '<h3>O carrinho está vazio.</h3>';
      return;
    }

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <div class="item-image-wrapper">
          <img src="assets/${item.image}" alt="${item.name}">
        </div>
        <div class="item-info-wrapper">
          <div class="item-title-wrapper">
            <p class="product-title">${item.name}</p>
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
              <span>${item.quantity}</span>
              <button class="increment">
                <svg class="quantity-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2.91675V11.0834" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                  <path d="M2.91699 7H11.0837" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <span>R$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });
  }

  // Exibir os itens do carrinho ao carregar a página
  displayCartItems();
});
