/* Abrir y cerrar navbar */
document.addEventListener('DOMContentLoaded', () => {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const navbarLinks = document.getElementById('navbar-links');

  open.addEventListener('click', () => {
      c
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
