import { products } from './dataProducts.js';

document.addEventListener('DOMContentLoaded', function() {
  // Array com todas as categorias
  const categories = [...new Set(products.map(product => product.category))];

  const productsContainer = document.getElementById('products');

  // Loop por todas as categorias
  categories.forEach((category) => {
    let categoryWrapper = document.createElement('article');
    
    categoryWrapper.classList.add('product-category');
    let categoryHeadingWrapper = document.createElement('div');
    categoryHeadingWrapper.classList.add('container');

    let categoryHeading = document.createElement('h3');
    categoryHeading.classList.add('category-heading');
    categoryHeading.textContent = category;

    categoryHeadingWrapper.append(categoryHeading);

    let categoryProductsWrapper = document.createElement('div');
    categoryProductsWrapper.classList.add('product-grid-wrapper', 'container');

    let categoryProducts = document.createElement('div');
    categoryProducts.classList.add('product-grid');

    categoryProductsWrapper.append(categoryProducts);

    // Filtra os produtos que pertencem à categoria atual
    const productsInCategory = products.filter(product => product.category === category);

    // Loop por todos os produtos da categoria
    productsInCategory.forEach((product) => {
      // Calculando o desconto do produto
      let discount = Math.round((product.comparePrice - product.price)*100/product.comparePrice);
      
      let productCard = document.createElement('div');
      productCard.classList.add('product-card', 'scheme--4');

      // Renderizando conteúdo de acordo com o produto e categoria
      productCard.innerHTML = `
        <div class="product-image-wrapper">
          ${product.image ? `<img src="assets/${product.image}" alt="${product.imageAlt || product.name}">` : ''}
          ${product.comparePrice ? `
            <div class="sale-badge scheme--2">${discount}% OFF</div>
          ` : ''}
        </div>
        </div>
        <div class="product-info-wrapper">
          <div class="product-title-wrapper">
            <div class="rating">
              <div class="rating-stars" data-rating="${product.rating}"></div>
              <p class="rating-numbers">(${product.ratingNumbers})</p>
            </div>
            <h4>${product.name}</h4>
          </div>

          <div class="price">
            <span class="regular-price">${product.comparePrice ? `R$${product.comparePrice.toFixed(2).toString().replace('.', ',')}` : ''}</span>
            <span class="discount-price">
              R$${product.price.toFixed(2).toString().replace('.', ',')}
            </span>
          </div>

          <button class="button add-to-cart scheme--3" data-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `

      categoryProducts.append(productCard);
    })

    categoryWrapper.append(categoryHeadingWrapper, categoryProductsWrapper);
    productsContainer.append(categoryWrapper);
  });

});
