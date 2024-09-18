
  /* CATEGORÍAS */
  const agregarCategoria = document.getElementById("agregar");
  const categoriaInput = document.getElementById("categoria");
  const categoriaLista = document.getElementById("categoriasLista");
  const inputEditar = document.getElementById('input-editar');
  const editarBoton = document.getElementById('editar');
  const cancelarBoton = document.getElementById('cancelar');

  let categorias = [];

  // Función para cargar las categorías desde el localStorage al cargar la página
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

  // Función para cargar y mostrar las categorías en la lista
  function cargarCategoriaLista() {
    if (categoriaLista) {
      categoriaLista.innerHTML = "";
      for (let i = 0; i < categorias.length; i++) {
          const categoria = categorias[i];

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
      }
    }
  }

  /* Agregar categorías desde el input */
  if (agregarCategoria && categoriaInput) {
    agregarCategoria.addEventListener("click", function() {
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
  }

  /* Eliminar categoría */
  function eliminarCategoria(id) {
      if (confirm("¿Estás seguro que deseas eliminar esta categoría?")) {
          categorias = categorias.filter(cat => cat.id !== id);
          cargarCategoriaLista();
          guardarCategoriasEnLocalStorage(categorias);
      }
  }

  /* Redirigir a la página de edición */
  function redirigirAEditar(id) {
    const categoria = categorias.find(cat => cat.id === id);
    localStorage.setItem('categoriaAEditar', JSON.stringify(categoria));
    window.location.href = 'editar.html';
  }

  /* Función para guardar las categorías en localStorage */
  function guardarCategoriasEnLocalStorage(categorias) {
      localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  // Editar categoría
  if (inputEditar && editarBoton && cancelarBoton) {
    const categoriaAEditar = JSON.parse(localStorage.getItem('categoriaAEditar'));

    categoriaAEditar && (inputEditar.value = categoriaAEditar.nombre);

    editarBoton.addEventListener('click', function() {
      const nuevoNombre = inputEditar.value.trim();
      if (nuevoNombre) {
          let categorias = JSON.parse(localStorage.getItem('categorias'));
          const index = categorias.findIndex(cat => cat.id === categoriaAEditar.id);
          categorias[index].nombre = nuevoNombre;
          localStorage.setItem('categorias', JSON.stringify(categorias));

          window.location.href = 'categoria.html';
      }
  });


      window.location.href = 'categoria.html';
  }



/*Abrir formulario de operacion nueva*/
 document.addEventListener('DOMContentLoaded', function () {
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('transaction-form');

  form.addEventListener('submit', function (e) {
      e.preventDefault();
      formContainer.classList.add('scale-105');
      setTimeout(() => {
          formContainer.classList.remove('scale-105');
          alert('Formulario enviado con éxito');
          form.reset();
      }, 300);
  });
});




// FILTROS
// ocultar panel de filtros
const ocultarFiltros=document.getElementById ("ocultar-filtros")
const mostrarFiltros=document.getElementById("mostrar-filtros")
const panelFiltros=document.getElementById ("panel-filtros")
const panelTipo=document.getElementById("panel-tipo")


 ocultarFiltros.addEventListener("click" , () =>{

    ocultarFiltros.classList.add("hidden")
     panelFiltros.classList.add("hidden")
     mostrarFiltros.classList.remove("hidden")

 })
// selec filtros
    ocultarFiltros.addEventListener("click" , (e) =>{

     panelTipo.style.display= "none";
   })

// para que aparezcan los filtros nuevamente

   mostrarFiltros.addEventListener("click" , (e) =>{

   mostrarFiltros.classList.add("hidden")
   panelFiltros.classList.remove("hidden")
   ocultarFiltros.classList.remove("hidden")



 })

const selectTipo=document.getElementById("select-tipo")
const filtroCategoria=document.getElementById("filtro-categoria")
const inputFecha=document.getElementById("inputFecha")
const ordenFiltros=document.getElementById("orden-filtros")
const filtrosTipos=document.getElementById("filtros-tipo")

      mostrarFiltros.addEventListener("click" , (e) =>{
        panelTipo.style.display= "block";
  })



//   BOTON NUEVA OPERACION
// O P E R A C I O N E S
const categoriaSelect = document.getElementById("categoriaSelect");

function cargarCategoria(categorias) {
    categoriaSelect.innerHTML = ""; // Limpiar el contenido del select antes de agregar nuevas opciones

    categorias.forEach((categoria) => {
        let nuevaCategoria = document.createElement("option");
        nuevaCategoria.value = categoria.id; // Usar el ID como valor
        nuevaCategoria.textContent = categoria.nombre; // Mostrar el nombre de la categoría
        categoriaSelect.appendChild(nuevaCategoria);
    });
  }

  cargarCategoriasDesdeLocalStorage();

    if (!categorias) {
        // Categorías por defecto con id y nombre
        const categoriasDefault = [
            { id: 1, nombre: 'cinevbvb' },
            { id: 2, nombre: 'cinevbvbcvbcvb' },
            { id: 3, nombre: 'cinevbvbcvbcvb' }
        ];
        localStorage.setItem("categorias", JSON.stringify(categoriasDefault)); // Guardar como JSON string
        cargarCategoria(categoriasDefault);
    } else {
        // Parsear las categorías a un array
        categorias = JSON.parse(categorias);
        cargarCategoria(categorias);
    }
}

// Llamar a cargarStorage al cargar la página
document.addEventListener("DOMContentLoaded", cargarStorage);

  if (operacionesParse.length > 0) {
      seccionOperaciones.style.display = 'block';
      seccionSinOperaciones.style.display = 'none';
  } else {
      seccionOperaciones.style.display = 'none';
      seccionSinOperaciones.style.display = 'block';
  }

/* OPERACIONES */

/* A G R E G A R  O P E R A C I O N E S */
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
          } else {
              console.error(`Tipo de operación desconocido: ${operacion.tipo}`);
              spanMonto.textContent = `${operacion.monto}`;
              spanMonto.style.color = 'black';
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



 /* -------------------------------------------------------------- */


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

/* Ocultar y Mostrat filtros */
const ocultarFiltros = document.getElementById("ocultar-filtros");
const mostrarFiltros = document.getElementById("mostrar-filtros");
const panelFiltros = document.getElementById("panel-filtros");

function actualizarVisibilidad() {
    if (panelFiltros.classList.contains("hidden")) {
        mostrarFiltros.classList.remove("hidden");
        ocultarFiltros.classList.add("hidden");
    } else {
        mostrarFiltros.classList.add("hidden");
        ocultarFiltros.classList.remove("hidden");
    }
}

actualizarVisibilidad();

//
document.addEventListener("DOMContentLoaded", function() {
  const categoriasData = [
      { nombre: "Comida", ganancias: 1000, gastos: 500 },
      { nombre: "Servicios", ganancias: 2000, gastos: 1000 },
      { nombre: "Salidas", ganancias: 1500, gastos: 1200 },
      { nombre: "Educación", ganancias: 3000, gastos: 2000 },
      { nombre: "Transporte", ganancias: 500, gastos: 300 },
      { nombre: "Trabajo", ganancias: 4000, gastos: 1500 }
  ];

  const mesesData = [
      { nombre: "Enero", ganancias: 5000, gastos: 3000 },
      { nombre: "Febrero", ganancias: 6000, gastos: 2000 },
      { nombre: "Marzo", ganancias: 4000, gastos: 3500 },
      { nombre: "Abril", ganancias: 7000, gastos: 5000 },
      { nombre: "Mayo", ganancias: 3000, gastos: 1000 },
      { nombre: "Junio", ganancias: 8000, gastos: 4000 },
      { nombre: "Julio", ganancias: 5500, gastos: 2500 },
      { nombre: "Agosto", ganancias: 6500, gastos: 3000 },
      { nombre: "Septiembre", ganancias: 7500, gastos: 4500 },
      { nombre: "Octubre", ganancias: 9000, gastos: 6000 },
      { nombre: "Noviembre", ganancias: 10000, gastos: 7000 },
      { nombre: "Diciembre", ganancias: 11000, gastos: 8000 }
  ];

  const categoriasList = document.getElementById("categorias-list");
  const mesesList = document.getElementById("meses-list");

  const operacionesCargadas = categoriasData.length > 0 && mesesData.length > 0;


   /*  const maxCategoriaGanancia = categoriasData.reduce((max, cat) => cat.ganancias > max.ganancias ? cat : max);
    const maxCategoriaGasto = categoriasData.reduce((max, cat) => cat.gastos > max.gastos ? cat : max);
    const maxCategoriaBalance = categoriasData.reduce((max, cat) => (cat.ganancias - cat.gastos) > (max.ganancias - max.gastos) ? cat : max);

    const maxMesGanancia = mesesData.reduce((max, mes) => mes.ganancias > max.ganancias ? mes : max);
    const maxMesGasto = mesesData.reduce((max, mes) => mes.gastos > max.gastos ? mes : max);

    document.getElementById("cat-mayor-ganancia").textContent = maxCategoriaGanancia.nombre;
    document.getElementById("cat-mayor-gasto").textContent = maxCategoriaGasto.nombre;
    document.getElementById("cat-mayor-balance").textContent = maxCategoriaBalance.nombre;
    document.getElementById("mes-mayor-ganancia").textContent = maxMesGanancia.nombre;
    document.getElementById("mes-mayor-gasto").textContent = maxMesGasto.nombre;
}); */

  if (operacionesCargadas) {
      document.getElementById("operations-card").classList.remove("hidden");
      document.getElementById("no-operations-card").classList.add("hidden");

      categoriasData.forEach(categoria => {
          const balance = categoria.ganancias - categoria.gastos;
          const li = document.createElement("li");
          li.innerHTML = `${categoria.nombre}: Ganancias: ${categoria.ganancias}, Gastos: ${categoria.gastos}, Balance: ${balance}`;
          categoriasList.appendChild(li);
      });

      mesesData.forEach(mes => {
          const balance = mes.ganancias - mes.gastos;
          const li = document.createElement("li");
          li.innerHTML = `${mes.nombre}: Ganancias: ${mes.ganancias}, Gastos: ${mes.gastos}, Balance: ${balance}`;
          mesesList.appendChild(li);
      });

      const maxCategoriaGanancia = categoriasData.reduce((max, cat) => cat.ganancias > max.ganancias ? cat : max);
      const maxCategoriaGasto = categoriasData.reduce((max, cat) => cat.gastos > max.gastos ? cat : max);
      const maxCategoriaBalance = categoriasData.reduce((max, cat) => (cat.ganancias - cat.gastos) > (max.ganancias - max.gastos) ? cat : max);

      const maxMesGanancia = mesesData.reduce((max, mes) => mes.ganancias > max.ganancias ? mes : max);
      const maxMesGasto = mesesData.reduce((max, mes) => mes.gastos > max.gastos ? mes : max);

      document.getElementById("cat-mayor-ganancia").textContent = maxCategoriaGanancia.nombre;
      document.getElementById("cat-mayor-gasto").textContent = maxCategoriaGasto.nombre;
      document.getElementById("cat-mayor-balance").textContent = maxCategoriaBalance.nombre;
      document.getElementById("mes-mayor-ganancia").textContent = maxMesGanancia.nombre;
      document.getElementById("mes-mayor-gasto").textContent = maxMesGasto.nombre;
  } else {
      document.getElementById("operations-card").classList.add("hidden");
      document.getElementById("no-operations-card").classList.remove("hidden");
  }

});

/* Filtro */
document.addEventListener('DOMContentLoaded', function() {
  const filtroTipo = document.getElementById('filtro-tipo');
  const lista = document.getElementById('operaciones-list');

  function mostrarOperacionesFiltradas(operacionesFiltradas) {
      lista.innerHTML = ''; // Limpia la lista antes de agregar nuevos elementos

      operacionesFiltradas.forEach(operacion => {
          const li = document.createElement('li');
          li.className = 'py-2 border-b'; // Clase opcional para estilo

          li.innerHTML = `
              <div class="flex justify-evenly  ">
                  <span class="font-medium">${operacion.descripcion}</span>
                  <span class="text-gray-600">${operacion.categoria}</span>
                  <span class="text-gray-600">${operacion.fecha}</span>
                  <span class="font-light ${operacion.tipo === 'ingreso' ? 'text-green-400' : 'text-red-500'}">${operacion.monto}</span>
           <div class="flex justify-end space-x-2">
  <button class="text-green-500 hover:text-green-700 rounded px-2 py-1 text-xs">
    Editar
  </button>
  <button class="text-red-500 hover:text-red-700 rounded px-2 py-1 text-xs">
    Eliminar
  </button>
</div>



              </div>
          `;

          lista.appendChild(li);
      });
  }

  function filtrarOperaciones() {
      const tipoSeleccionado = filtroTipo.value;
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

      let operacionesFiltradas = [];

      if (tipoSeleccionado === 'todos') {
          operacionesFiltradas = operaciones;
      } else if (tipoSeleccionado === 'gasto') {
          operacionesFiltradas = operaciones.filter(operacion => operacion.tipo === 'egreso');
      } else if (tipoSeleccionado === 'ganancia') {
          operacionesFiltradas = operaciones.filter(operacion => operacion.tipo === 'ingreso');
      }

      mostrarOperacionesFiltradas(operacionesFiltradas);
  }

  // Inicializar
  filtrarOperaciones(); // Mostrar operaciones por defecto (todos)

  // Agregar evento de cambio al filtro
  filtroTipo.addEventListener('change', filtrarOperaciones);

});
