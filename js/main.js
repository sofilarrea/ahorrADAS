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

/* Categorías */
const textInput = document.getElementById('text-input');
const agregar = document.getElementById('agregar');
const listaGastos = document.getElementById('lista-gastos');

// Función para agregar un elemento a la lista y almacenarlo en localStorage
function agregarElemento(texto) {
  const nuevoGasto = document.createElement('div');
  nuevoGasto.classList.add('nuevo-gasto');
  /* Creo un div vacío para ir agregando a la lista de gastos */

  const nuevoTexto = document.createElement('h2');
  nuevoTexto.textContent = texto;
  /* Creo un h2 para colocar en el div que hice arriba así vamos anotando los gastos */

  const botonEditar = document.createElement('button');
  botonEditar.textContent = 'Editar';
  /* Al generar el gasto voy a formar también un botón editar */

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', () => eliminarElemento(texto, nuevoGasto));
  /* Igual que en editar vamos a generar un boton eliminar */

  nuevoGasto.appendChild(nuevoTexto);
  nuevoGasto.appendChild(botonEditar);
  nuevoGasto.appendChild(botonEliminar);

  listaGastos.appendChild(nuevoGasto);
  /* Actualizo mi lista de gastos*/
}


// Función para cargar los elementos desde el localStorage al cargar la página
function cargarElementosDesdeLocalStorage() {
  const elementosGuardados = JSON.parse(localStorage.getItem('elementos'));
/* Usamos Json.parse para transformar el contenido recuperado en localStorage por un objeto y así poder trabajar
con él */
  elementosGuardados.forEach(texto => {
    /* Foreach para iterar por el array que tenemos y llamo a la función de arriba pasando el texto como argumento */
    agregarElemento(texto);
  });
}


// Función para eliminar un elemento
function eliminarElemento(texto, elemento) {
  if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
    /* alerta que pregunta si querés eliminar antes de que se borre */
    elemento.remove();

    // Actualizar el localStorage
    actualizarLocalStorage();
  }
}

// Función para actualizar el localStorage
function actualizarLocalStorage() {
  const elementos = Array.from(listaGastos.children).map(gasto => gasto.querySelector('h2').textContent);
  localStorage.setItem('elementos', JSON.stringify(elementos));
}

// Cargar elementos almacenados en el localStorage al cargar la página
window.addEventListener('load', cargarElementosDesdeLocalStorage);

// Agregar un nuevo elemento cuando se hace clic en el botón "agregar"
agregar.addEventListener('click', () => {
  const texto = textInput.value.trim();

  if (texto === '') {
    alert('Por favor, ingresa un nombre válido.');
    return;
  }

  agregarElemento(texto);

  // Actualizar el localStorage
  actualizarLocalStorage();

  // Limpiar el campo de entrada después de agregar un elemento
  textInput.value = '';
});
