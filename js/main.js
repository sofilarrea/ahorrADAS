document.addEventListener('DOMContentLoaded', function() {
  const agregarCategoria = document.getElementById("agregar");
  const categorias = [];

  agregarCategoria.addEventListener("click", function() {
      let categoriaInput = document.getElementById("categoria");
      let nuevaCategoria = {
          id: categorias.length + 1,
          nombre: categoriaInput.value.trim()
      };

      if (nuevaCategoria.nombre) {
          categorias.push(nuevaCategoria);
          cargarCategoriaLista();
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
        const index = categorias.findIndex(cat => cat.id === id);
        if (index > -1) {
            categorias.splice(index, 1);
            cargarCategoriaLista();
        }
    }
}
  cargarCategoriaLista();
});
/* EDITAR GASTO */
