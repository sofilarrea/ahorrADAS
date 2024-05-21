document.addEventListener('DOMContentLoaded', function() {
  const agregarCategoria = document.getElementById("agregar");
  let categorias = [];

  agregarCategoria.addEventListener("click", function() {
      let categoriaInput = document.getElementById("categoria");
      let nuevaCategoria = {
          id: categorias.length + 1,
          nombre: categoriaInput.value.trim()
      };

      if (nuevaCategoria.nombre) {
          categorias.push(nuevaCategoria);
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias); // Guardar las categorías en el localStorage
          categoriaInput.value = "";
      }
  });

  function cargarCategoriaLista() {
      const categoriaLista = document.getElementById("categoriasLista");
      categoriaLista.innerHTML = "";
      categorias.forEach(categoria => {
          let categoriaListItem = document.createElement("li");
          categoriaListItem.textContent = categoria.nombre;
          categoriaListItem.classList.add('categorias');

          // Crear botón Editar
          const botonEditar = document.createElement('button');
          botonEditar.textContent = 'Editar';
          botonEditar.classList.add('boton-editar');
          botonEditar.addEventListener('click', () => editarCategoria(categoria.id));

          // Crear botón Eliminar
          const botonEliminar = document.createElement('button');
          botonEliminar.textContent = 'Eliminar';
          botonEliminar.classList.add('boton-eliminar');
          botonEliminar.addEventListener('click', () => eliminarCategoria(categoria.id));

          // Añadir los botones al elemento de la lista
          categoriaListItem.appendChild(botonEditar);
          categoriaListItem.appendChild(botonEliminar);

          categoriaLista.appendChild(categoriaListItem);
      });
  }

  function eliminarCategoria(id) {
      if (confirm("¿Estás seguro que deseas eliminar esta categoría?")) {
          categorias = categorias.filter(cat => cat.id !== id); // Filtrar las categorías para eliminar la seleccionada
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias); // Actualizar el localStorage después de eliminar la categoría
      }
  }

  // Función para guardar las categorías en el localStorage
  function guardarCategoriasEnLocalStorage(categorias) {
      localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  // Función para cargar las categorías desde el localStorage al cargar la página
  function cargarCategoriasDesdeLocalStorage() {
      const categoriasGuardadas = JSON.parse(localStorage.getItem('categorias'));
      if (categoriasGuardadas) {
          categorias = categoriasGuardadas; // Cargar las categorías guardadas en la variable categorias
          cargarCategoriaLista();
      }
  }

  // Llamar a la función para cargar las categorías desde el localStorage al cargar la página
  cargarCategoriasDesdeLocalStorage();
});

/* EDITAR GASTO */
