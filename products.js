import { products, difCategories } from './dataProducts.js';

// Function to create a slug from a category name
export function createSlug(name) {
  return name
    .toLowerCase()                // Converte para minúsculas
    .replace(/\s+/g, '-')        // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '')    // Remove caracteres especiais
    .replace(/--+/g, '-')        // Substitui múltiplos hífens por um único
    .replace(/^-+|-+$/g, '');     // Remove hífens do início e do fim
}

document.addEventListener('DOMContentLoaded', function() {
  const productsContainer = document.getElementById('products');

  // Loop through all different categories
  difCategories.forEach((category) => {
    let categoryWrapper = document.createElement('article');
    categoryWrapper.classList.add('product-category');
    categoryWrapper.id = createSlug(category);

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

    // Filter products that belongs to this category
    const productsInCategory = products.filter(product => product.category === category);

    // Loop through all products in this category
    productsInCategory.forEach((product) => {
      // Calculate product discount
      let discount = Math.round((product.comparePrice - product.price)*100/product.comparePrice);
      
      let productCard = document.createElement('div');
      productCard.classList.add('product-card', 'scheme--4');

      // Renders content based on the product and the category
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

  // Rating containers from all products
  const ratingContainer = document.querySelectorAll('.rating-stars');

  // Looping through each rating container
  ratingContainer.forEach((item, index) => {
    // Getting data rating
    let rating = parseFloat(item.getAttribute('data-rating')); // e.g. 4.3

    // Looping 5 times
    for(let i = 0; i < 5; i++) {
      let starRating = rating - i;
      let starId = `star-${index + 1}-${i + 1}`
      let gradientId = `starGradient-${index + 1}-${i + 1}`;
      let stop = '';

      if (starRating >= 1) {
        // Full star
        stop = '100%';
      } else {
        // Partial star, calculate the fill percentage
        stop = `${(starRating * 100)}%`;
      }

      // Creating wrapper element for the star svg
      let starSpan = document.createElement('span');

      // Adding the html of the svg in the wrapper element with respective props
      starSpan.innerHTML =`
        <svg class="star" id="${starId}" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24">
          <path fill="url(#${gradientId})" stroke="#F7C325" stroke-width="2" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/>
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="${stop}" stop-color="#F7C325" />
              <stop offset="${stop}" stop-color="transparent" />
            </linearGradient>
          </defs>
        </svg>
      `;

      // Appending the wrapper element to the rating container
      item.append(starSpan);
    }
  })

});
