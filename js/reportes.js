document.addEventListener('DOMContentLoaded', function () {
  console.log('Script cargado correctamente');

  function generarReportes() {
      const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      console.log('Operaciones:', operaciones);

      const categorias = {};
      const meses = {};

      operaciones.forEach(operacion => {
          const monto = parseFloat(operacion.monto);
          const categoria = operacion.categoria;
          const fecha = new Date(operacion.fecha);
          const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

          // Inicializar las categorías y meses
          if (!categorias[categoria]) {
              categorias[categoria] = { ganancia: 0, gasto: 0 };
          }
          if (!meses[mes]) {
              meses[mes] = { ganancia: 0, gasto: 0 };
          }

          // Acumulación de valores según el tipo de operación
          if (operacion.tipo === 'ingreso') {
              categorias[categoria].ganancia += monto;
              meses[mes].ganancia += monto;
          } else if (operacion.tipo === 'egreso') {
              categorias[categoria].gasto += monto;
              meses[mes].gasto += monto;
          }
      });

      // Determinar la categoría con mayor ganancia/gasto/balance
      let categoriaMayorGanancia = { nombre: '', cantidad: 0 };
      let categoriaMayorGasto = { nombre: '', cantidad: 0 };
      let categoriaMayorBalance = { nombre: '', cantidad: 0 };

      for (const [categoria, valores] of Object.entries(categorias)) {
          if (valores.ganancia > categoriaMayorGanancia.cantidad) {
              categoriaMayorGanancia = { nombre: categoria, cantidad: valores.ganancia };
          }
          if (valores.gasto > categoriaMayorGasto.cantidad) {
              categoriaMayorGasto = { nombre: categoria, cantidad: valores.gasto };
          }
          const balance = valores.ganancia - valores.gasto;
          if (balance > categoriaMayorBalance.cantidad) {
              categoriaMayorBalance = { nombre: categoria, cantidad: balance };
          }
      }

      // Determinar el mes con mayor ganancia/gasto
      let mesMayorGanancia = { mes: '', cantidad: 0 };
      let mesMayorGasto = { mes: '', cantidad: 0 };

      for (const [mes, valores] of Object.entries(meses)) {
          if (valores.ganancia > mesMayorGanancia.cantidad) {
              mesMayorGanancia = { mes, cantidad: valores.ganancia };
          }
          if (valores.gasto > mesMayorGasto.cantidad) {
              mesMayorGasto = { mes, cantidad: valores.gasto };
          }
      }

      // Actualizar el DOM con los resultados
      document.getElementById('cat-mayor-ganancia').textContent = `${categoriaMayorGanancia.nombre} (${categoriaMayorGanancia.cantidad.toFixed(2)})`;
      document.getElementById('cat-mayor-gasto').textContent = `${categoriaMayorGasto.nombre} (${categoriaMayorGasto.cantidad.toFixed(2)})`;
      document.getElementById('cat-mayor-balance').textContent = `${categoriaMayorBalance.nombre} (${categoriaMayorBalance.cantidad.toFixed(2)})`;
      document.getElementById('mes-mayor-ganancia').textContent = `${mesMayorGanancia.mes} (${mesMayorGanancia.cantidad.toFixed(2)})`;
      document.getElementById('mes-mayor-gasto').textContent = `${mesMayorGasto.mes} (${mesMayorGasto.cantidad.toFixed(2)})`;

      // Mostrar totales por categorías
      const categoriasList = document.getElementById('categorias-list');
      categoriasList.innerHTML = '';
      for (const [categoria, valores] of Object.entries(categorias)) {
          const balance = valores.ganancia - valores.gasto;
          categoriasList.innerHTML += `<li>${categoria}: Ganancia: ${valores.ganancia.toFixed(2)}, Gasto: ${valores.gasto.toFixed(2)}, Balance: ${balance.toFixed(2)}</li>`;
      }

      // Mostrar totales por meses
      const mesesList = document.getElementById('meses-list');
      mesesList.innerHTML = '';
      for (const [mes, valores] of Object.entries(meses)) {
          mesesList.innerHTML += `<li>${mes}: Ganancia: ${valores.ganancia.toFixed(2)}, Gasto: ${valores.gasto.toFixed(2)}</li>`;
      }
  }

  // Llamar a la función para generar el reporte
  generarReportes();
});

function actualizarVista() {
  // Ejemplo de función para obtener operaciones, reemplázala con tu lógica real
  function obtenerOperaciones() {
    // Reemplaza esto con tu lógica para obtener operaciones (p.ej., desde localStorage o una API)
    return JSON.parse(localStorage.getItem('operaciones')) || [];
  }

  const operaciones = obtenerOperaciones();
  const noOperationsCard = document.getElementById('no-operations-card');
  const operationsCard = document.getElementById('operations-card');

  if (operaciones.length === 0) {
    noOperationsCard.classList.remove('hidden');
    operationsCard.classList.add('hidden');
  } else {
    noOperationsCard.classList.add('hidden');
    operationsCard.classList.remove('hidden');
  }
}

// Llamada a la función principal para actualizar la vista
document.addEventListener('DOMContentLoaded', actualizarVista);
