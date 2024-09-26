import { products } from './dataProducts.js';

document.addEventListener('DOMContentLoaded', function() {
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const drawerCart = document.getElementById('drawerCart');
  
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

  // Função para exibir os itens do carrinho
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');

    cartContainer.innerHTML = ''; // Limpa o conteúdo antes de exibir os produtos

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>O carrinho está vazio.</p>';
      return;
    }

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} - Quantidade: ${item.quantity}</p>
        <p>Preço total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartContainer.appendChild(cartItem);
    });
  }

  // Exibir os itens do carrinho ao carregar a página
  displayCartItems();
});
