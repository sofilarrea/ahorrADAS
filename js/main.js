/* Abrir y cerrar navbar */
document.addEventListener('DOMContentLoaded', () => {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const navbarLinks = document.getElementById('navbar-links');

  open.addEventListener('click', () => {
    console.log('dentro de la function')
      open.style.display = 'none';
      close.style.display = 'block';
      navbarLinks.classList.add('show-nav');
  });

  close.addEventListener('click', () => {
      open.style.display = 'block';
      close.style.display = 'none';
      navbarLinks.classList.remove('show-nav');
  });
});

/*Abrir formulario de operacion nueva*/
document.addEventListener('DOMContentLoaded', function () {
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('transaction-form');
  
  form.addEventListener('submit', function (e) {
      e.preventDefault();
      formContainer.classList.add('scale-105');
      setTimeout(() => {
          formContainer.classList.remove('scale-105');
          alert('Formulario enviado con éxito');
          form.reset();
      }, 300);
  });
});