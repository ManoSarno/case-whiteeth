document.addEventListener('DOMContentLoaded', function() {
  const openPopupBtn = document.getElementById('openPopup');
  const openPopupBtn2 = document.getElementById('open-popup');
  const closePopupBtn = document.getElementById('closePopup');
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const form = document.getElementById('registrationForm');
  
  // Open popup and hide overlay
  function openPopup() {
    popup.classList.add('open');
    if(overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
    }
  }

  // Close popup and hide overlay
  function closePopup() {
    popup.classList.remove('open');
    if(!overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
    }
  }

  openPopupBtn.addEventListener('click', openPopup);
  openPopupBtn2.addEventListener('click', openPopup);
  closePopupBtn.addEventListener('click', closePopup);

  // Lida com o envio do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Aqui você pode adicionar lógica para processar os dados
    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('password').value;

    alert(`Usuário cadastrado com sucesso!\nNome: ${name}\nE-mail: ${email}`);

    // Fecha a popup após o cadastro
    closePopup();
  });
});
