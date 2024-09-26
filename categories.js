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
  const drawerMenu = document.getElementById('drawerMenu');
  const overlay = document.querySelector('.overlay');

  // Close menu and hide overlay
  function closeMenu() {
    drawerMenu.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }
  
  // Loop through all categories
  categories.forEach((category) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `<a class="category-link" href="#${createSlug(category)}">${category}</a>`; // Use slug in the href

    categoriesList.append(listItem);
  });


  document.querySelectorAll('.category-link').forEach((item) => {
    item.addEventListener('click', closeMenu);
  });
});
