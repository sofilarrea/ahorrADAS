document.addEventListener('DOMContentLoaded', function() {
  const agregarCategoria = document.getElementById("agregar");
  let categorias = [];

  // Función para cargar las categorias desde el localStrage al cargar la página
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

  // Función para cargar y mostrar las categorías en la li
  function cargarCategoriaLista() {
      const categoriaLista = document.getElementById("categoriasLista");
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

  agregarCategoria.addEventListener("click", function() {
      let categoriaInput = document.getElementById("categoria");
      let nuevaCategoria = {
          id: categorias.length + 1,
          nombre: categoriaInput.value.trim()
      };

      if (nuevaCategoria.nombre) {
          categorias.push(nuevaCategoria);
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias);
          categoriaInput.value = "";
      }
  });

  function eliminarCategoria(id) {
      if (confirm("¿Estás seguro que deseas eliminar esta categoría?")) {
          categorias = categorias.filter(cat => cat.id !== id);
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias);
      }
  }

  function redirigirAEditar(id) {
    const categoria = categorias.find(cat => cat.id === id);
    console.log("Categoria seleccionada para editar:", categoria);
    localStorage.setItem('categoriaAEditar', JSON.stringify(categoria));
    window.location.href = 'editar.html';
}



  function guardarCategoriasEnLocalStorage(categorias) {
      localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  cargarCategoriasDesdeLocalStorage();
});


/* EDITAR categoria */
document.addEventListener('DOMContentLoaded', function() {
  const categoriaAEditar = JSON.parse(localStorage.getItem('categoriaAEditar'));
  const inputEditar = document.getElementById('input-editar');
  const editarBoton = document.getElementById('editar');
  const cancelarBoton = document.getElementById('cancelar');

  if (categoriaAEditar) {
      inputEditar.value = categoriaAEditar.nombre;
  } else {
      console.error('No se encontró una categoría para editar');
  }

  editarBoton.addEventListener('click', function() {
      const nuevoNombre = inputEditar.value.trim();
      if (nuevoNombre) {
          // Obtener categorías del almacenamiento local
          let categorias = JSON.parse(localStorage.getItem('categorias'));
          // Encontrar la categoría a editar
          const index = categorias.findIndex(cat => cat.id === categoriaAEditar.id);
          // Actualizar el nombre de la categoría
          categorias[index].nombre = nuevoNombre;
          // Guardar las categorías actualizadas en el almacenamiento local
          localStorage.setItem('categorias', JSON.stringify(categorias));
          // Redirigir a categoria.html
          window.location.href = 'categoria.html';
      } else {
          alert('Por favor ingresa un nombre válido para la categoría.');
      }
  });

  cancelarBoton.addEventListener('click', function() {
      // Redirigir a categoria.html
      window.location.href = 'categoria.html';
  });
});
