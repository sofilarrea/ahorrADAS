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
  const btnCancelarOperacion = document.getElementById('cancelarr');

  // Verifica si el botón existe antes de agregar el evento
  if (btnCancelarOperacion) {
    btnCancelarOperacion.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }


// Función para cargar las categorías en el select
function cargarCategoriasSelect() {
  const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
  const categoriaSelect = document.getElementById('nuevaOperacion-categoria');

  categoriaSelect.innerHTML = '';

  categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.nombre;
      option.textContent = categoria.nombre;
      categoriaSelect.appendChild(option);
  });
}

// Función para agregar una nueva operación
function agregarOperacion(event) {
  event.preventDefault();

  const descripcion = document.getElementById('nuevaOperacion-descripcion').value.trim();
  let monto = document.getElementById('nuevaOperacion-monto').value.trim();
  const tipo = document.getElementById('nuevaOperacion-tipo').value;
  const categoria = document.getElementById('nuevaOperacion-categoria').value;
  const fecha = document.getElementById('nuevaOperacion-fecha').value;

  if (!descripcion || !monto || !tipo || !categoria || !fecha) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Validar  monto
  if (isNaN(monto) || monto <= 0) {
      alert('Por favor, introduce un monto válido.');
      return;
  }

  monto = parseFloat(monto);

  const nuevaOperacion = {
      descripcion,
      monto,
      tipo,
      categoria,
      fecha
  };

  let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

  // Comprobar si la operación ya existe
  const esDuplicado = operaciones.some(operacion =>
      operacion.descripcion === nuevaOperacion.descripcion &&
      operacion.monto === nuevaOperacion.monto &&
      operacion.tipo === nuevaOperacion.tipo &&
      operacion.categoria === nuevaOperacion.categoria &&
      operacion.fecha === nuevaOperacion.fecha
  );

  if (esDuplicado) {
      alert('La operación fue creada  .');
      return;
  }

  // Añadir la nueva operación al array
  operaciones.push(nuevaOperacion);

  // Guardar las operaciones en localStorage
  localStorage.setItem('operaciones', JSON.stringify(operaciones));

  // Redirigir a la página principal
  window.location.href = 'index.html';
}

// Función para guardar una operación editada
function guardarOperacionEditada(index) {
  event.preventDefault();
  const descripcion = document.getElementById('nuevaOperacion-descripcion').value;
  let monto = document.getElementById('nuevaOperacion-monto').value;
  const tipo = document.getElementById('nuevaOperacion-tipo').value;
  const categoria = document.getElementById('nuevaOperacion-categoria').value;
  const fecha = document.getElementById('nuevaOperacion-fecha').value;

  if (!monto.includes('.')) {
      alert('Por favor, introduce el monto con un punto decimal.');
      return;
  }

  monto = parseFloat(monto);

  let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  if (index >= 0 && index < operaciones.length) {
      operaciones[index] = {
          descripcion,
          monto,
          tipo,
          categoria,
          fecha
      };

      localStorage.setItem('operaciones', JSON.stringify(operaciones));
      window.location.href = 'index.html';
  }
}

// Función para eliminar una operación
function eliminarOperacion(id) {
  let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  if (id >= 0 && id < operaciones.length) {
      operaciones.splice(id, 1);
      localStorage.setItem('operaciones', JSON.stringify(operaciones));
      crearElementosLista();
  }
}

// Función para crear la lista de operaciones
function crearElementosLista() {
  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  const operacionesList = document.getElementById('operaciones-list');
  const ordenarPor = document.getElementById('ordenarPor').value;

  // Limpiar la lista antes de agregar las operaciones
  operacionesList.innerHTML = '';

  // Ordenar las operaciones según la selección
  switch (ordenarPor) {
      case 'masReciente':
          operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          break;
      case 'menosReciente':
          operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          break;
      case 'mayorMonto':
          operaciones.sort((a, b) => b.monto - a.monto);
          break;
      case 'menorMonto':
          operaciones.sort((a, b) => a.monto - b.monto);
          break;
      case 'aZ':
          operaciones.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
          break;
      case 'zA':
          operaciones.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
          break;
  }

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
      const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
      spanFecha.textContent = fechaFormateada;

      const spanMonto = document.createElement('span');
      if (operacion.tipo.trim() === 'ingreso') {
          spanMonto.textContent = `+$ ${operacion.monto.toFixed(2)}`;
          spanMonto.style.color = 'green';
      } else {
          spanMonto.textContent = `-$ ${operacion.monto.toFixed(2)}`;
          spanMonto.style.color = 'red';
      }

      const divAcciones = document.createElement('div');
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.classList.add('text-blue-500', 'hover:text-blue-700', 'mr-2');
      btnEditar.addEventListener('click', () => {
          window.location.href = `operacioneseditar.html?index=${index}`;
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

// Evento para actualizar la lista cuando cambie la opción de ordenación
document.getElementById('ordenarPor').addEventListener('change', crearElementosLista);

// Inicializar la página para editar una operación
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('nuevaOperacion-categoria')) {
      cargarCategoriasSelect();
  }

  const params = new URLSearchParams(window.location.search);
  const indiceOperacion = params.get('index');

  if (indiceOperacion !== null) {
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      const operacion = operaciones[indiceOperacion];

      if (operacion) {
          document.getElementById('nuevaOperacion-descripcion').value = operacion.descripcion;
          document.getElementById('nuevaOperacion-monto').value = operacion.monto;
          document.getElementById('nuevaOperacion-tipo').value = operacion.tipo;
          document.getElementById('nuevaOperacion-categoria').value = operacion.categoria;
          document.getElementById('nuevaOperacion-fecha').value = operacion.fecha;

          document.getElementById('transaction-form').addEventListener('submit', function(event) {
              guardarOperacionEditada(indiceOperacion);
          });
      }
  } else {
      document.getElementById('transaction-form').addEventListener('submit', agregarOperacion);
  }

  // Crear la lista de operaciones si estamos en la página principal
  if (document.getElementById('operaciones-list')) {
      crearElementosLista();
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const seccionOperaciones = document.getElementById('operaciones-container');
  const seccionSinOperaciones = document.getElementById('operations-list');

  function cargarStorage() {
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

      if (operaciones.length > 0) {
          seccionOperaciones.style.display = 'block';
          seccionSinOperaciones.style.display = 'none';
          mostrarOperaciones(operaciones);
      } else {
          seccionOperaciones.style.display = 'none';
          seccionSinOperaciones.style.display = 'block';
      }
  }

  function mostrarOperaciones(operaciones) {
      const operacionesList = document.getElementById('operaciones-list');
      const tableBody = document.querySelector('table tbody');

      operacionesList.innerHTML = '';
      if (tableBody) tableBody.innerHTML = '';

      operaciones.forEach((operacion, index) => {
          const li = document.createElement('li');
          li.classList.add('px-4', 'py-2', 'flex', 'justify-between', 'items-center');
          li.dataset.id = index;

                li.innerHTML = `
        <span>${operacion.descripcion}</span>
        <span>${operacion.categoria}</span>
        <span>${operacion.fecha}</span>
        <span>${(operacion.tipo && operacion.tipo.trim() === 'ganancia') ? `+${operacion.monto}` : `-${operacion.monto}`}</span>
        <div>
            <button class="text-blue-500 hover:text-blue-700" onclick="editarOperacion(${index})">Editar</button>
            <button class="text-red-500 hover:text-red-700" onclick="eliminarOperacion(${index})">Eliminar</button>
        </div>
      `;
;
          operacionesList.appendChild(li);

          // Mostrar en la tabla
          if (tableBody) {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                  <td class="px-4 py-2">${operacion.descripcion}</td>
                  <td class="px-4 py-2">${operacion.categoria}</td>
                  <td class="px-4 py-2">${operacion.fecha}</td>
                  <td class="px-4 py-2">${operacion.tipo.trim() === 'ganancia' ? `+${operacion.monto}` : `-${operacion.monto}`}</td>
                  <td class="px-4 py-2">
                      <button class="text-blue-500 hover:text-blue-700" onclick="editarOperacion(${index})">Editar</button>
                      <button class="text-red-500 hover:text-red-700" onclick="eliminarOperacion(${index})">Eliminar</button>
                  </td>
              `;
              tableBody.appendChild(tr);
          }
      });
  }

  window.eliminarOperacion = function(index) {
      window.location.href = `operacioneseditar.html?index=${index}`;
  }

  window.eliminarOperacion = function(index) {
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar?');
      if (confirmacion) {
          let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
          operaciones.splice(index, 1);
          localStorage.setItem('operaciones', JSON.stringify(operaciones));
          cargarStorage();
      }
  }

  cargarStorage();
});
const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

const seccionOperaciones = document.getElementById('operaciones-con-operaciones');
const seccionSinOperaciones = document.getElementById('operaciones');

// Verifica si hay operaciones
if (operaciones.length > 0) {
    seccionOperaciones.style.display = 'block';
    seccionSinOperaciones.style.display = 'none';
} else {
    seccionOperaciones.style.display = 'none';
    seccionSinOperaciones.style.display = 'block';
}
// Función para editar una operación
function editarOperacion(index) {
  window.location.href = `operacioneseditar.html?index=${index}`;
}


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

// Función para mostrar la tarjeta adecuada
function mostrarTarjetaDeOperaciones(operaciones) {
  const sinResultados = document.getElementById('operaciones');
  const tablaOperaciones = document.getElementById('operaciones-con-operaciones');

  if (operaciones.length > 0) {
      tablaOperaciones.style.display = 'block';
      sinResultados.style.display = 'none';
  } else {
      tablaOperaciones.style.display = 'none';
      sinResultados.style.display = 'block';
  }
}


function crearElementosLista() {
  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  const operacionesList = document.getElementById('operaciones-list');
  const ordenarPor = document.getElementById('ordenarPor').value;

  // Limpiar la lista antes de agregar las operaciones
  operacionesList.innerHTML = '';

  // Ordenar las operaciones según la selección
  switch (ordenarPor) {
      case 'masReciente':
          operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          break;
      case 'menosReciente':
          operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          break;
      case 'mayorMonto':
          operaciones.sort((a, b) => b.monto - a.monto);
          break;
      case 'menorMonto':
          operaciones.sort((a, b) => a.monto - b.monto);
          break;
      case 'aZ':
          operaciones.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
          break;
      case 'zA':
          operaciones.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
          break;
  }

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
      const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
      spanFecha.textContent = fechaFormateada;

      const spanMonto = document.createElement('span');
      if (operacion.tipo.trim() === 'ingreso') {
          spanMonto.textContent = `+$ ${operacion.monto.toFixed(2)}`;
          spanMonto.style.color = 'green';
      } else {
          spanMonto.textContent = `-$ ${operacion.monto.toFixed(2)}`;
          spanMonto.style.color = 'red';
      }

      const divAcciones = document.createElement('div');
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.classList.add('text-blue-500', 'hover:text-blue-700', 'mr-2');
      btnEditar.addEventListener('click', () => {
          window.location.href = `operacioneseditar.html?index=${index}`;
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

// Evento para actualizar la lista cuando cambie la opción de ordenación
document.getElementById('ordenarPor').addEventListener('change', crearElementosLista);
