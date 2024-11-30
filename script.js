// Función para recuperar el stock almacenado o establecer un valor predeterminado
function cargarStock() {
  // Para cada celda de stock, recuperamos el valor del almacenamiento local o lo dejamos en 0 si no existe.
  const stock1 = localStorage.getItem('stock-1') || 10; // Valor predeterminado 10
  const stock2 = localStorage.getItem('stock-2') || 15; // Valor predeterminado 15
  
  // Asignar el valor de stock a cada celda
  document.getElementById('stock-1').innerText = stock1;
  document.getElementById('stock-2').innerText = stock2;
}

// Función para guardar el stock actualizado en el almacenamiento local
function guardarStock(idCelda, stock) {
  localStorage.setItem(idCelda, stock); // Guardamos el valor del stock en Local Storage
}

// Función para sumar stock
function sumarStock(idCelda) {
  const celda = document.getElementById(idCelda);
  let stockActual = parseInt(celda.innerText); // Obtiene el valor actual del stock
  stockActual++; // Sumar 1 al valor actual
  celda.innerText = stockActual; // Actualiza el valor en la celda
  guardarStock(idCelda, stockActual); // Guardar el nuevo valor en Local Storage
}

// Función para restar stock
function restarStock(idCelda) {
  const celda = document.getElementById(idCelda);
  let stockActual = parseInt(celda.innerText); // Obtiene el valor actual del stock
  if (stockActual > 0) {
    stockActual--; // Resta 1 al valor actual
    celda.innerText = stockActual; // Actualiza el valor en la celda
    guardarStock(idCelda, stockActual); // Guardar el nuevo valor en Local Storage
  } else {
    alert("El stock no puede ser menor a 0."); // Mensaje de error si ya está en 0
  }
}

// Cargar los valores de stock al cargar la página
window.onload = cargarStock;