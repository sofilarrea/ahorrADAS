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

  const nuevaOperacion = {
      descripcion,
      monto,
      tipo,
      categoria,
      fecha
  };

  let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

  const esDuplicado = operaciones.some(operacion =>
      operacion.descripcion === nuevaOperacion.descripcion &&
      operacion.monto === nuevaOperacion.monto &&
      operacion.tipo === nuevaOperacion.tipo &&
      operacion.categoria === nuevaOperacion.categoria &&
      operacion.fecha === nuevaOperacion.fecha
  );

  if (esDuplicado) {

      return;
  }

  operaciones.push(nuevaOperacion);

  localStorage.setItem('operaciones', JSON.stringify(operaciones));

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

  // Validar el monto
  if (!monto.includes('.')) {
      alert('Por favor, introduce el monto con un punto decimal.');
      return;
  }

  // Convertir el monto a un número
  monto = parseFloat(monto);

  // Obtener las operaciones y actualizar la operación editada
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
      if (operacion.tipo.trim() === 'ingreso') {
        spanMonto.textContent = `+${operacion.monto}`;
        spanMonto.style.color = 'red';
    } else if (operacion.tipo.trim() === 'egreso') {
        spanMonto.textContent = `-${operacion.monto}`;
        spanMonto.style.color = 'red';
    }


      // Botones
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

// Inicializar la página para editar una operación
document.addEventListener('DOMContentLoaded', function() {
  // Cargar categorías en el select si existe
  if (document.getElementById('nuevaOperacion-categoria')) {
      cargarCategoriasSelect();
  }

  // Cargar datos de la operación si estamos en la página de edición
  const params = new URLSearchParams(window.location.search);
  const indiceOperacion = params.get('index');

  if (indiceOperacion !== null) {
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      const operacion = operaciones[indiceOperacion];

      if (operacion) {
          // Cargar los datos de la operación en el formulario
          document.getElementById('nuevaOperacion-descripcion').value = operacion.descripcion;
          document.getElementById('nuevaOperacion-monto').value = operacion.monto;
          document.getElementById('nuevaOperacion-tipo').value = operacion.tipo;
          document.getElementById('nuevaOperacion-categoria').value = operacion.categoria;
          document.getElementById('nuevaOperacion-fecha').value = operacion.fecha;

          // Agregar el evento de envío del formulario para editar la operación
          document.getElementById('transaction-form').addEventListener('submit', function(event) {
              guardarOperacionEditada(indiceOperacion);
          });
      }
  } else {
      // Si no hay índice en la URL, agregar una operación nueva
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

      // Limpiar las listas
      operacionesList.innerHTML = '';
      if (tableBody) tableBody.innerHTML = '';

      operaciones.forEach((operacion, index) => {
          // Mostrar en la lista
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

  cargarStorage();  // Llamada inicial para cargar y mostrar las operaciones
});
// Obtiene las operaciones del localStorage, o un arreglo vacío si no hay operaciones guardadas.
const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

// Obtiene las referencias a las secciones del DOM
const seccionOperaciones = document.getElementById('operaciones-con-operaciones');
const seccionSinOperaciones = document.getElementById('operaciones');

// Verifica si hay operaciones
if (operaciones.length > 0) {
    // Si hay operaciones, muestra la sección de operaciones y oculta la sección sin operaciones
    seccionOperaciones.style.display = 'block';
    seccionSinOperaciones.style.display = 'none';
} else {
    // Si no hay operaciones, muestra la sección sin operaciones y oculta la sección de operaciones
    seccionOperaciones.style.display = 'none';
    seccionSinOperaciones.style.display = 'block';
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
console.log(localStorage.getItem('operaciones'));
console.log(localStorage.getItem('categorias'));
// Función para mostrar la tarjeta adecuada
function mostrarTarjetaDeOperaciones(operaciones) {
  const sinResultados = document.getElementById('operaciones');
  const tablaOperaciones = document.getElementById('operaciones-con-operaciones');

  if (operaciones.length > 0) {
      // Mostrar la tarjeta de operaciones y ocultar la de "sin resultados"
      tablaOperaciones.style.display = 'block';
      sinResultados.style.display = 'none';
  } else {
      // Mostrar la tarjeta de "sin resultados" y ocultar la de operaciones
      tablaOperaciones.style.display = 'none';
      sinResultados.style.display = 'block';
  }
}
const cancelarButton = document.getElementById('cancelar');

cancelarButton.addEventListener('click', function() {
    window.location.href = 'index.html';
});

operaciones.forEach((operacion, index) => {
  let signo = operacion.tipo === 'ganancia' ? '+' : '-';
  let colorClass = operacion.tipo === 'ganancia' ? 'positive' : 'negative';

  let li = document.createElement('li');
  li.innerHTML = `
    <span>${operacion.descripcion}</span>
    <span>${operacion.categoria}</span>
    <span>${formatearFecha(operacion.fecha)}</span>
    <span class="amount ${colorClass}">
        ${signo}${operacion.monto.toFixed(2)}
    </span>
    <div>
        <button class="text-blue-500 hover:text-blue-700 mr-2" onclick="editarOperacion(${index})">Editar</button>
        <button class="text-red-500 hover:text-red-700" onclick="eliminarOperacion(${index})">Eliminar</button>
    </div>
  `;

  document.getElementById('operaciones-list').appendChild(li);
});







console.log('Script cargado correctamente');

document.addEventListener('DOMContentLoaded', function () {
  // Función para calcular los reportes
  function generarReportes() {
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

      const categorias = {};
      const meses = {};

      operaciones.forEach(operacion => {
          const monto = parseFloat(operacion.monto);
          const categoria = operacion.categoria;
          const fecha = new Date(operacion.fecha);
          const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

          // Acumulando ganancias y gastos por categoría
          if (!categorias[categoria]) {
              categorias[categoria] = { ganancia: 0, gasto: 0 };
          }
          if (operacion.tipo === 'ingreso') {
              categorias[categoria].ganancia += monto;
          } else if (operacion.tipo === 'egreso') {
              categorias[categoria].gasto += monto;
              
          }

          // Acumulando ganancias y gastos por mes
          if (!meses[mes]) {
              meses[mes] = { ganancia: 0, gasto: 0 };
          }
          if (operacion.tipo === 'ingreso') {
              meses[mes].ganancia += monto;
          } else if (operacion.tipo === 'egreso') {
              meses[mes].gasto += monto;
          }
      });

      // Encontrar la categoría con mayor ganancia
      let categoriaMayorGanancia = { nombre: '', cantidad: 0 };
      for (const [categoria, valores] of Object.entries(categorias)) {
          if (valores.ganancia > categoriaMayorGanancia.cantidad) {
              categoriaMayorGanancia = { nombre: categoria, cantidad: valores.ganancia };
          }
      }

      // Encontrar la categoría con mayor gasto
      let categoriaMayorGasto = { nombre: '', cantidad: 0 };
      for (const [categoria, valores] of Object.entries(categorias)) {
          if (valores.gasto > categoriaMayorGasto.cantidad) {
              categoriaMayorGasto = { nombre: categoria, cantidad: valores.gasto };
          }
      }

      // Encontrar la categoría con el mayor balance
      let categoriaMayorBalance = { nombre: '', cantidad: 0 };
      for (const [categoria, valores] of Object.entries(categorias)) {
          const balance = valores.ganancia - valores.gasto;
          if (balance > categoriaMayorBalance.cantidad) {
              categoriaMayorBalance = { nombre: categoria, cantidad: balance };
          }
      }

      // Encontrar el mes con mayor ganancia
      let mesMayorGanancia = { mes: '', cantidad: 0 };
      for (const [mes, valores] of Object.entries(meses)) {
          if (valores.ganancia > mesMayorGanancia.cantidad) {
              mesMayorGanancia = { mes, cantidad: valores.ganancia };
          }
      }

      // Encontrar el mes con mayor gasto
      let mesMayorGasto = { mes: '', cantidad: 0 };
      for (const [mes, valores] of Object.entries(meses)) {
          if (valores.gasto > mesMayorGasto.cantidad) {
              mesMayorGasto = { mes, cantidad: valores.gasto };
          }
      }

      // Mostrar los reportes en el DOM
      document.getElementById('cat-mayor-ganancia').textContent = `${categoriaMayorGanancia.nombre} (${categoriaMayorGanancia.cantidad.toFixed(2)})`;
      document.getElementById('cat-mayor-gasto').textContent = `${categoriaMayorGasto.nombre} (${categoriaMayorGasto.cantidad.toFixed(2)})`;
      document.getElementById('cat-mayor-balance').textContent = `${categoriaMayorBalance.nombre} (${categoriaMayorBalance.cantidad.toFixed(2)})`;
      document.getElementById('mes-mayor-ganancia').textContent = `${mesMayorGanancia.mes} (${mesMayorGanancia.cantidad.toFixed(2)})`;
      document.getElementById('mes-mayor-gasto').textContent = `${mesMayorGasto.mes} (${mesMayorGasto.cantidad.toFixed(2)})`;

      // Mostrar totales por categoría
      const categoriasList = document.getElementById('categorias-list');
      categoriasList.innerHTML = '';
      for (const [categoria, valores] of Object.entries(categorias)) {
          const balance = valores.ganancia - valores.gasto;
          categoriasList.innerHTML += `<li>${categoria}: Ganancia: ${valores.ganancia.toFixed(2)}, Gasto: ${valores.gasto.toFixed(2)}, Balance: ${balance.toFixed(2)}</li>`;
      }

      // Mostrar totales por mes
      const mesesList = document.getElementById('meses-list');
      mesesList.innerHTML = '';
      for (const [mes, valores] of Object.entries(meses)) {
          mesesList.innerHTML += `<li>${mes}: Ganancia: ${valores.ganancia.toFixed(2)}, Gasto: ${valores.gasto.toFixed(2)}</li>`;
      }
  }

  // Ejecutar la función para generar reportes
  generarReportes();
});


