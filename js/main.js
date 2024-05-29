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
          let categorias = JSON.parse(localStorage.getItem('categorias'));
          const index = categorias.findIndex(cat => cat.id === categoriaAEditar.id);
          categorias[index].nombre = nuevoNombre;
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


/*Abrir formulario de operacion nueva*/
/* document.addEventListener('DOMContentLoaded', function () {
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
 */


/*
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
*/
// CARGAR CATEGORIA

const categoriaSelect =document.getElementById("categoriaSelect")
/* onst operaciones =document.getElementById("operaciones")
const SelectTipo = document.getElementById("select-tipo")
const inputFechaOP = document.getElementById("inputFecha") */

function cargarCategoria(categorias){
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
    const operaciones = localStorage.getItem("operaciones")
    console.log(categorias)
    console.log(operaciones)
    if(!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]
        localStorage.setItem("categoria", categoriasDefault)
        cargarCategoria(categoriasDefault)
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
      cargarCategoria(nuevasCategoriasArray)
    }
}
cargarStorage()

function agregarOperacion(event) {
  event.preventDefault();
  console.log("hello from the function agregarOperaciones")
  const descripcion = document.getElementById('nuevaOperacion-descripcion').value;
  const monto = document.getElementById('nuevaOperacion-monto').value;
  const tipo = document.getElementById('nuevaOperacion-tipo').value;
  const categoria = document.getElementById('nuevaOperacion-categoria').value;
  const fecha = document.getElementById('nuevaOperacion-fecha').value;

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
  // Obtener las operaciones almacenadas en localStorage
  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

  // Obtener el contenedor de operaciones en index.html
  const operacionesList = document.getElementById('operaciones-list');

  // Función para crear los elementos de la lista a partir de las operaciones almacenadas
  function crearElementosLista() {
      // Limpio
      operacionesList.innerHTML = '';

      operaciones.forEach(function(operacion) {
          const li = document.createElement('li');
          li.classList.add('px-4', 'py-2', 'flex', 'justify-between', 'items-center');


          const spanFecha = document.createElement('span');
          const fechaParts = operacion.fecha.split('-');
          const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`; // Formato día/mes/año
          spanFecha.textContent = fechaFormateada;

          const spanDescripcion = document.createElement('span');
          spanDescripcion.textContent = operacion.descripcion;

          const spanCategoria = document.createElement('span');
          spanCategoria.textContent = operacion.categoria;

          const spanMonto = document.createElement('span');
          spanMonto.textContent = operacion.monto;

          // Botones
          const divAcciones = document.createElement('div');
          const btnEditar = document.createElement('button');
          btnEditar.textContent = 'Editar';
          btnEditar.classList.add('text-blue-500', 'hover:text-blue-700', 'mr-2');
          const btnEliminar = document.createElement('button');
          btnEliminar.textContent = 'Eliminar';
          btnEliminar.classList.add('text-red-500', 'hover:text-red-700');

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

  crearElementosLista();
});
