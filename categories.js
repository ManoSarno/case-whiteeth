import { createSlug } from "./products.js";

export const categories = [
  'Pasta de dente',
  'Escova de dente',
  'Raspador de língua',
  'Clareamento',
  'Aparelhos ortodônticos'
];

document.addEventListener('DOMContentLoaded', function() {
  const categoriesList = document.getElementById('categoriesList');
  const filtersList = document.getElementById('filtersList');
  const drawerMenu = document.getElementById('drawerMenu');
  const overlay = document.querySelector('.overlay');

  // Close menu and hide overlay
  function closeMenu() {
    drawerMenu.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }

  let allCategoriesButton = document.createElement('button');
  allCategoriesButton.textContent = 'Todos';
  allCategoriesButton.classList.add('active');
  filtersList.append(allCategoriesButton);

  // Loop through all categories
  categories.forEach((category) => {
    let listItem = document.createElement('li');

    // Use slug in the href
    listItem.innerHTML = `
      <a class="category-link" href="#${createSlug(category)}">
        ${category}
        <svg class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.707,15.707l-3,3a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L11,15.586V6a1,1,0,0,1,2,0v9.586l1.293-1.293a1,1,0,0,1,1.414,1.414Z"/></svg>
      </a>`;
      
    categoriesList.append(listItem);

    let filterButton = document.createElement('button');
    filterButton.textContent = category;
    filtersList.append(filterButton);
  });

  // Adding filter functionality
  const filterButtons = filtersList.querySelectorAll("button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Atualizar estado do botão de filtro
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      // Implementar lógica de filtragem aqui
      const category = button.textContent.trim();
      filterProducts(category);
    });
  });

  function filterProducts(category) {
    // Filtragem de produtos baseada na categoria
    const productCategories = document.querySelectorAll(".product-category");

    productCategories.forEach(cat => {
      const categoryTitle = cat.querySelector("h3").textContent.trim();

      if (category === "Todos" || categoryTitle === category) {
        cat.style.display = "flex";
      } else {
        cat.style.display = "none";
      }
    });
  }

  document.querySelectorAll('.category-link').forEach((item) => {
    item.addEventListener('click', closeMenu);
  });
});
