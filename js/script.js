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


/* Operaciones */
function agregarOperacion(event) {
  event.preventDefault();
  const descripcion = document.getElementById('nuevaOperacion-descripcion').value;
  let monto = document.getElementById('nuevaOperacion-monto').value;
  const tipo = document.getElementById('nuevaOperacion-tipo').value;
  const categoria = document.getElementById('nuevaOperacion-categoria').value;
  const fecha = document.getElementById('nuevaOperacion-fecha').value;

  // PUNTOS DECIMALES
  if (!monto.includes('.')) {
    alert('Por favor, introduce el monto con un punto decimal.');
    return;
  }

  // Convertir el monto a un número
  monto = parseFloat(monto);

  const nuevaOperacion = {
      descripcion,
      monto,
      tipo,
      categoria,
      fecha
  };

  let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

  operaciones.push(nuevaOperacion);

  localStorage.setItem('operaciones', JSON.stringify(operaciones));


  window.location.href = 'index.html';
}

  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  const operacionesList = document.getElementById('operaciones-list');

  function crearElementosLista() {
      // Limpiar la lista
      operacionesList.innerHTML = '';

      operaciones.forEach(function(operacion, index) {
          const li = document.createElement('li');
          li.classList.add('px-4', 'py-2', 'flex', 'justify-between', 'items-center');
          li.dataset.id = index;

          const spanDescripcion = document.createElement('span');
          spanDescripcion.textContent = operacion.descripcion;

          const spanCategoria = document.createElement('span');
          spanCategoria.textContent = operacion.categoria;

          const spanFecha = document.createElement('span');
          const fechaParts = operacion.fecha.split('-');
          const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`; // Formato día/mes/año
          spanFecha.textContent = fechaFormateada;

          const spanMonto = document.createElement('span');
          if (operacion.tipo.trim() === 'egreso') {
              spanMonto.textContent = `+${operacion.monto}`;
              spanMonto.style.color = 'green';
          } else if (operacion.tipo.trim() === 'ingreso') {
              spanMonto.textContent = `-${operacion.monto}`;
              spanMonto.style.color = 'red';
          }
          // Botones
          const divAcciones = document.createElement('div');
          const btnEditar = document.createElement('button');
          btnEditar.textContent = 'Editar';
          btnEditar.classList.add('text-blue-500', 'hover:text-blue-700', 'mr-2');
          btnEditar.addEventListener('click', () => {

              window.location.href = 'operacioneseditar.html';
          });
        btnEditar.addEventListener('click', () => {
          const indiceOperacion = li.dataset.id;
          window.location.href = `operacioneseditar.html?index=${indiceOperacion}`;
});


          const btnEliminar = document.createElement('button');
          btnEliminar.textContent = 'Eliminar';
          btnEliminar.classList.add('text-red-500', 'hover:text-red-700');
          btnEliminar.addEventListener('click', (event) => {
              const confirmacion = confirm('¿Estás seguro de que deseas eliminar?');
              if (confirmacion) {
                  const li = event.target.closest('li');
                  if (li) {
                      const elementoId = li.dataset.id;
                      eliminarOperacion(elementoId);
                      li.remove();
                  } else {
                      console.error('No se pudo encontrar el elemento a eliminar');
                  }
              }
          });

          divAcciones.appendChild(btnEditar);
          divAcciones.appendChild(btnEliminar);

          li.appendChild(spanDescripcion);
          li.appendChild(spanCategoria);
          li.appendChild(spanFecha);
          li.appendChild(spanMonto);
          li.appendChild(divAcciones);

          operacionesList.appendChild(li);
      });
  }

  function eliminarOperacion(id) {
      operaciones.splice(id, 1);

      localStorage.setItem('operaciones', JSON.stringify(operaciones));

      crearElementosLista();
  }

  crearElementosLista();









/* BALANCE */
const gananciasElements = document.querySelectorAll('.ganancias');
const gastosElements = document.querySelectorAll('.gastos');
const totalElement = document.querySelector('.total');

let totalGanancias = 0;
let totalGastos = 0;

const operacionesString = localStorage.getItem('operaciones');
if (operacionesString) {
    try {
        const operaciones = JSON.parse(operacionesString);
        operaciones.forEach(function(operacion) {
            if (operacion.tipo === 'egreso') {
                totalGanancias += parseFloat(operacion.monto);
            } else if (operacion.tipo === 'ingreso') {
                totalGastos += parseFloat(operacion.monto);
            }
        });

        totalGanancias = totalGanancias.toFixed(2);
        totalGastos = totalGastos.toFixed(2);

        gananciasElements.forEach(function(element) {
            element.textContent = `+$ ${totalGanancias}`;
        });

        gastosElements.forEach(function(element) {
            element.textContent = `-$ ${totalGastos}`;
        });

        const totalFinal = (parseFloat(totalGanancias) - parseFloat(totalGastos)).toFixed(2);
        totalElement.textContent = `$${totalFinal}`;
    } catch (error) {
        console.error('Error al parsear las operaciones desde localStorage:', error);
    }
} else {
    console.warn('No hay operaciones en localStorage.');
}
