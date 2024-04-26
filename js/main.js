/* Abrir y cerrar navbar */
document.addEventListener('DOMContentLoaded', () => {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const navbarLinks = document.getElementById('navbar-links');

  open.addEventListener('click', () => {
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


/* Categorías */
const textInput = document.getElementById('text-input');
const agregar = document.getElementById('agregar');
const listaGastos = document.getElementById('lista-gastos');

agregar.addEventListener('click', agregarGasto);

function agregarGasto() {
  const texto = textInput.value.trim();

  if (texto === '') {
    alert('Por favor, ingresa un nombre válido.');
    return;
  }

  const nuevoGasto = document.createElement('div');
  nuevoGasto.classList.add('nuevo-gasto');

  const nuevoTexto = document.createElement('h2');
  nuevoTexto.textContent = texto;

  nuevoGasto.appendChild(nuevoTexto);

  listaGastos.appendChild(nuevoGasto);

  textInput.value = '';
}
