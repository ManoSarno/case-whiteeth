document.addEventListener('DOMContentLoaded', function() {
  const products = [
    { name: 'Hortelã', category: 'Pasta de dente', categorySlug: 'pasta-de-dente', image: 'img-toothpaste.webp', imageAlt: 'Pasta de dente de Hortelã', rating: 4.5, ratingNumbers: 24, price: 70.90 },
    { name: 'Morango', category: 'Pasta de dente', categorySlug: 'pasta-de-dente', image: 'img-toothpaste.webp', imageAlt: 'Pasta de dente de Morango', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Uva', category: 'Pasta de dente', categorySlug: 'pasta-de-dente', image: 'img-toothpaste.webp', imageAlt: 'Pasta de dente de Uva', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Café', category: 'Pasta de dente', categorySlug: 'pasta-de-dente', image: 'img-toothpaste.webp', imageAlt: 'Pasta de dente de Café', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Bamboo', category: 'Escova de dentes', categorySlug: 'escova-de-dentes', image: 'img-toothbrush.webp', imageAlt: 'Escova de dentes de Bamboo', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Mógno', category: 'Escova de dentes', categorySlug: 'escova-de-dentes', image: 'img-toothbrush.webp', imageAlt: 'Escova de dentes de Mógno', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Carvalho', category: 'Escova de dentes', categorySlug: 'escova-de-dentes', image: 'img-toothbrush.webp', imageAlt: 'Escova de dentes de Carvalho', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Fio dental', category: 'Outros', categorySlug: 'outros', image: 'img-others.webp', imageAlt: 'Fio dental', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 },
    { name: 'Fio dental', category: 'Outros', categorySlug: 'outros', image: 'img-others.webp', imageAlt: 'Fio dental', rating: 4.5, ratingNumbers: 24, price: 50.90, comparePrice: 70.90 }
  ];

  function getCategoriesWithSlugs(products) {
    // Extrai categorias e remove duplicatas
    const categories = [...new Set(products.map(product => product.category))];

    // Gera um array de objetos com nome da categoria e slug
    return categories.map(category => ({
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-')
    }));
}

// Chama a função para obter as categorias com slugs
const categoriesWithSlugs = getCategoriesWithSlugs(products);

  const productsContainer = document.getElementById('products');

  categoriesWithSlugs.forEach((category, index) => {
    let categoryWrapper = document.createElement('article');
    categoryWrapper.id = category.slug;
    categoryWrapper.classList.add('product-category');
  
    let categoryHeading = document.createElement('h3');
    categoryHeading.classList.add('category-heading');
    categoryHeading.textContent = category.name;
  
    let categoryProducts = document.createElement('div');
    categoryProducts.classList.add('product-grid');

    // Filtra os produtos que pertencem à categoria atual
    const productsInCategory = products.filter(product => product.category === category.name);
    console.log(productsInCategory);

    productsInCategory.forEach((product) => {
      let discount = Math.round((product.comparePrice - product.price)*100/product.comparePrice);
      
      let productCard = document.createElement('div');
      productCard.classList.add('product-card', 'scheme--4');
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
            ${product.comparePrice ? `<span class="regular-price">R$${product.comparePrice.toFixed(2).toString().replace('.', ',')}</span>` : ''}
            <span class="discount-price">
              R$${product.price.toFixed(2).toString().replace('.', ',')}
            </span>
          </div>

          <button class="button scheme--3">Adicionar ao carrinho</button>
        </div>
      `

      categoryProducts.append(productCard);
    })

    categoryWrapper.append(categoryHeading, categoryProducts);

    productsContainer.append(categoryWrapper);
  });

});
