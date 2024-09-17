// Constantes de elementos DOM
const agregarCategoria = document.getElementById("agregar");
const categoriaInput = document.getElementById("categoria");
const categoriaLista = document.getElementById("categoriasLista");
const inputEditar = document.getElementById('input-editar');
const editarBoton = document.getElementById('editar');
const cancelarBoton = document.getElementById('cancelar');

let categorias = [];

// Función para cargar las categorías desde localStorage
function cargarCategoriasDesdeLocalStorage() {
    const categoriasGuardadas = JSON.parse(localStorage.getItem('categorias'));
    if (categoriasGuardadas && categoriasGuardadas.length > 0) {
        categorias = categoriasGuardadas;
    } else {
        categorias = [
            { id: 1, nombre: 'cinevbvb' },
            { id: 2, nombre: 'cinevbvbcvbcvb' },
            { id: 3, nombre: 'cinevbvbcvbcvb' }
        ];
        guardarCategoriasEnLocalStorage(categorias);
    }
    cargarCategoriaLista();
}

// Función para mostrar las categorías en la lista
function cargarCategoriaLista() {
  if (categoriaLista) {
    categoriaLista.innerHTML = "";
    categorias.forEach(categoria => {
      let categoriaListItem = document.createElement("li");
      categoriaListItem.textContent = categoria.nombre;
      categoriaListItem.classList.add('categorias');

      const botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.classList.add('boton-editar');
      botonEditar.addEventListener('click', () => redirigirAEditar(categoria.id));

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.classList.add('boton-eliminar');
      botonEliminar.addEventListener('click', () => eliminarCategoria(categoria.id));

      categoriaListItem.appendChild(botonEditar);
      categoriaListItem.appendChild(botonEliminar);
      categoriaLista.appendChild(categoriaListItem);
    });
  }
}

// Función para agregar nuevas categorías
if (agregarCategoria && categoriaInput) {
  agregarCategoria.addEventListener("click", function() {
      let nuevaCategoria = {
          id: categorias.length > 0 ? Math.max(...categorias.map(cat => cat.id)) + 1 : 1,
          nombre: categoriaInput.value.trim()
      };

      if (nuevaCategoria.nombre) {
          categorias.push(nuevaCategoria);
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias);
          categoriaInput.value = "";
      }
  });
}

// Función para eliminar categorías
function eliminarCategoria(id) {
    if (confirm("¿Estás seguro que deseas eliminar esta categoría?")) {
        categorias = categorias.filter(cat => cat.id !== id);
        cargarCategoriaLista();
        guardarCategoriasEnLocalStorage(categorias);
    }
}

// Redirigir a la página de edición
function redirigirAEditar(id) {
  const categoria = categorias.find(cat => cat.id === id);
  localStorage.setItem('categoriaAEditar', JSON.stringify(categoria));
  window.location.href = 'editar.html';  // Página de edición
}

// Función para guardar categorías en localStorage
function guardarCategoriasEnLocalStorage(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

// Cargar las categorías al cargar la página
cargarCategoriasDesdeLocalStorage();

// Sección de edición de categorías
if (inputEditar && editarBoton && cancelarBoton) {
  const categoriaAEditar = JSON.parse(localStorage.getItem('categoriaAEditar'));

  if (categoriaAEditar) {
    inputEditar.value = categoriaAEditar.nombre;

    editarBoton.addEventListener('click', function() {
      const nuevoNombre = inputEditar.value.trim();
      if (nuevoNombre) {
          let categorias = JSON.parse(localStorage.getItem('categorias'));
          const index = categorias.findIndex(cat => cat.id === categoriaAEditar.id);
          categorias[index].nombre = nuevoNombre;
          guardarCategoriasEnLocalStorage(categorias);

          window.location.href = 'categoria.html';  // Redirigir de vuelta a la lista
      }
    });

    cancelarBoton.addEventListener('click', function() {
      window.location.href = 'categoria.html';  // Cancelar la edición y volver
    });
  }
}
