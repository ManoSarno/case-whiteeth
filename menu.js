document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.querySelector('.overlay');
  const drawerMenu = document.getElementById('drawerMenu');
  const openMenuBtn = document.getElementById('openMenu');
  const closeMenuBtn = document.getElementById('closeMenu');
  const drawerCart = document.getElementById('drawerCart');
  
  // Open menu and show overlay
  function openMenu() {
    drawerMenu.classList.add('open');
    if(overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
    }
  }

  // Close menu and hide overlay
  function closeMenu() {
    drawerMenu.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }

  // Close cart and hide overlay
  function closeCart() {
    drawerCart.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }

  openMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  // Fecha o menu drawer e o cart drawer ao clicar fora dele
  overlay.addEventListener('click', function() {
    if(drawerMenu.classList.contains('open')) {
      closeMenu();
    } else {
      closeCart();
    }
  });
});
