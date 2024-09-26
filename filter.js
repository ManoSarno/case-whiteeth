// Filtro de produtos
const filterButtons = document.querySelectorAll(".filter-buttons button");

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
