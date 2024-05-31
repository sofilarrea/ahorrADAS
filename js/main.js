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
      inputEditar.value= categoriaAEditar.nombre;
  } else {
      console.error('No se encontró una categoría para editar');
  }

  editarBoton.addEventListener('click', function() {
      const nuevoNombre = inputEditar.value.trim();
      if (nuevoNombre) {
          let categorias = JSON.parse(localStorage.getItem('categorias'));
          const index = categorias.findIndex(cat => cat.id === categoriaAEditar.id);
          categorias[index].nombre = nuevoNombre;
          localStorage.setItem('categorias', JSON.stringify(categorias));

          window.location.href = 'categoria.html';
      } else {
          alert('Por favor ingresa un nombre válido para la categoría.');
      }
  });

  cancelarBoton.addEventListener('click', function() {

      window.location.href = 'categoria.html';
  });
});


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
 





  
//   BOTON NUEVA OPERACION

// O P E R A C I O N E S




const categoriaSelect =document.getElementById("categoriaSelect")

function cargarCategorias(categorias){
  categorias.forEach((categoria) =>{
    let nuevaCategoria = document.createElement("option")
    nuevaCategoria.value = categoria;
    nuevaCategoria.textContent = categoria
    console.log("hola desde funcion que no funciona")
    categoriaSelect.appendChild(nuevaCategoria)
    console.log(categoriaSelect)

  })
}

function cargarStorage() {
    const categorias = localStorage.getItem("categoria")
    const operacion = localStorage.getItem("operaciones")
  
    if(!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]
        localStorage.setItem("categoria", categoriasDefault)
        cargarCategorias(categoriasDefault)
    } else {
        let nuevaCategoria = ""
        let nuevasCategoriasArray = []
        for (let i = 0; i < categorias.length; i++){
            if (categorias[i] !== ",") {
                nuevaCategoria += categorias[i]
                if(i === categorias.length - 1){
                  nuevasCategoriasArray.push(nuevaCategoria)
                }
            } else {
                nuevasCategoriasArray.push(nuevaCategoria)
                nuevaCategoria = " "
            }
        }
      cargarCategorias(nuevasCategoriasArray)
    }
}
cargarStorage ()








function convertirFormatoMonto(input) {
  // Eliminar cualquier carácter que no sea dígito, coma o punto
  const cleaned = input.replace(/[^\d.,]/g, '');

  // Reemplazar comas por puntos
  const withDot = cleaned.replace(',', '.');

  // Convertir a un número de punto flotante
  return parseFloat(withDot);
}



function agregarOperacion(event) {
  event.preventDefault();
  console.log("hello from the function agregarOperaciones");

  const descripcion = document.getElementById('nuevaOperacion-descripcion').value;
  let monto = document.getElementById('nuevaOperacion-monto').value;
  const tipo = document.getElementById('nuevaOperacion-tipo').value;
  const categoria = document.getElementById('nuevaOperacion-categoria').value;
  const fecha = document.getElementById('nuevaOperacion-fecha').value;

  // Validar que el monto contenga un punto decimal
  if (!monto.includes('.')) {
    alert('Por favor, introduce el monto con un punto decimal.');
    return; // Detener la ejecución de la función
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

  // Redirigir
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
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
              // Redireccionar
              window.location.href = 'operacioneseditar.html';
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
      // Eliminar la operación de la lista de operaciones
      operaciones.splice(id, 1);

      // Actualizar el almacenamiento local
      localStorage.setItem('operaciones', JSON.stringify(operaciones));

      // Volver a crear los elementos de la lista
      crearElementosLista();
  }

  crearElementosLista();
});


 /* -------------------------------------------------------------- */

 document.addEventListener('DOMContentLoaded', function() {
  // Obtener las operaciones almacenadas en localStorage
  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

  // Obtener las secciones por su ID
  const seccionOperaciones = document.getElementById('operaciones-con-operaciones');
  const seccionSinOperaciones = document.getElementById('operaciones');

  // Si hay operaciones cargadas, mostrar la sección con operaciones y ocultar la sección sin operaciones
  if (operaciones.length > 0) {
      seccionOperaciones.style.display = 'block';
      seccionSinOperaciones.style.display = 'none';
  } else {
      // Si no hay operaciones cargadas, mostrar la sección sin operaciones y ocultar la sección con operaciones
      seccionOperaciones.style.display = 'none';
      seccionSinOperaciones.style.display = 'block';
  }
});
/* -------------------------------------------- */
/* E D I T A R  O P E R A C I O N E S */

document.addEventListener('DOMContentLoaded', function() {
  const gananciasElements = document.querySelectorAll('.ganancias');
  const gastosElements = document.querySelectorAll('.gastos');
  const totalElement = document.querySelector('.total');

  let totalGanancias = 0;
  let totalGastos = 0;

  // Verificar si hay operaciones en localStorage y si está en el formato esperado
  const operacionesString = localStorage.getItem('operaciones');
  if (operacionesString) {
      try {
          const operaciones = JSON.parse(operacionesString);
          // Calcular el total de ganancias y gastos
          operaciones.forEach(function(operacion) {
              if (operacion.tipo === 'egreso') {
                  totalGanancias += parseFloat(operacion.monto);
              } else if (operacion.tipo === 'ingreso') {
                  totalGastos += parseFloat(operacion.monto);
              }
          });

          // Convertir los totales a números y redondearlos a dos decimales
          totalGanancias = totalGanancias.toFixed(2);
          totalGastos = totalGastos.toFixed(2);

          // Mostrar los totales en la tarjeta de balance
          gananciasElements.forEach(function(element) {
              element.textContent = `+$ ${totalGanancias}`;
          });

          gastosElements.forEach(function(element) {
              element.textContent = `-$ ${totalGastos}`;
          });

          // Calcular el total final y mostrarlo
          const totalFinal = (parseFloat(totalGanancias) - parseFloat(totalGastos)).toFixed(2);
          totalElement.textContent = `$${totalFinal}`;
      } catch (error) {
          console.error('Error al parsear las operaciones desde localStorage:', error);
      }
  } else {
      console.warn('No hay operaciones en localStorage.');
  }
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
const inputFecha=document.getElementById("input-fecha")
const ordenFiltros=document.getElementById("orden-filtros")
const filtrosTipos=document.getElementById("filtros-tipo")
const ordenarPor=document.getElementById("ordenarPor")

      mostrarFiltros.addEventListener("click" , (e) =>{
        panelTipo.style.display= "block";
  })










// // filtrado por tipo

// selectTipo.onchange =() =>{
//     const arrayFiltroTipo = aplicarFiltros();
//     mostrarOperacionesEnHTML(arrayFiltroTipo);
// }


// // por categoria

//      filtroCategoria.onchange =() =>{
//     const arrayFiltradoFinal = aplicarFiltros();
//     mostrarOperacionesEnHTML(arrayFiltradoFinal);
// }

// // porfecha


//     inputFecha.onchange = () => {
//     const FiltradoFecha = nuevasFechas(aplicarFiltros());
//     mostrarOperacionesEnHTML(ordenarFechas(FiltradoFecha));
//   };
  
//     ordenarPor.onchange =() => {
//     const arrayOrdenadoFinal = filtroPor();
//     mostrarOperacionesEnHTML(arrayOrdenadoFinal)
//   }



//   const filtroPor =() =>{
//     const orden = ordenarPor.value;
//     let operaciones = aplicarFiltros();
//     if (orden === "aZ"){
//         operaciones = operaciones.sort ((a, b)=>{
//             return a.Descripcion.localeCompare(b.Descripcion);

//         })


//     }else if (orden === "zA") {
//         operaciones = operaciones.sort ((a, b)=>{
//             return b.Descripcion.localeCompare(a.Descripcion);
    
//         });

// } else if (orden === "mayorMonto"){
//     operaciones = operaciones.sort((a, b)=>{
//         return b.monto - a.monto;

//     });
// }else if (orden === "menorMonto"){
//     operaciones = operaciones.sort((a, b)=>{
//         return b.monto - a.monto;

//     });
// } else if  (orden === "masReciente") {
//     operaciones = operaciones.sort((a, b) => {
//       return new Date(b.fecha) - new Date(a.fecha);
//     });
//   } else if (orden === "menosReciente") {
//     operaciones = operaciones.sort((a, b) => {
//       return new Date(a.fecha) - new Date(b.fecha);
//     });
//   }
//   return operaciones;
// };











