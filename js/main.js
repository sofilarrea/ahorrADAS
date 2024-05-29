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

const botonNuevaOperacion=document.getElementById("btn-operacion")
const divOperacion=document.getElementById("div-operacion")

divOperacion.addEventListener("click", ()=>{
    
})


// CARGAR CATEGORIA

const categoriaSelect =document.getElementById("select-categoria")
 const operaciones =document.getElementById("operaciones")
const SelectTipo = document.getElementById("select-tipo")
 const inputFechaOP = document.getElementById("inputFecha")

function cargarCategoria(categorias){
    categorias.forEach((categoria) =>{
        let nuevaCategoria = document.createElement("option")
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria
        categoriaSelect.appendChild(nuevaCategoria)
    })
}

function cargarStorage() {
    const categorias = localStorage.getItem("categoria")
    const operaciones = localStorage.getItem("operaciones")
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
            } else {
                nuevasCategoriasArray.push(nuevaCategoria)
                nuevaCategoria = ""
            }

        }

      cargarCategoria(nuevasCategoriasArray)


    }
}

cargarStorage()

