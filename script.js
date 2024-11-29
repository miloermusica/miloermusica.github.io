// Función para sumar stock
function sumarStock(idCelda) {
    const celda = document.getElementById(idCelda);
    let stockActual = parseInt(celda.innerText); // Obtiene el valor actual del stock
    celda.innerText = stockActual + 1; // Suma 1 al valor actual
  }
  
  // Función para restar stock
  function restarStock(idCelda) {
    const celda = document.getElementById(idCelda);
    let stockActual = parseInt(celda.innerText); // Obtiene el valor actual del stock
    if (stockActual > 0) {
      celda.innerText = stockActual - 1; // Resta 1 al valor actual
    } else {
      alert("El stock no puede ser menor a 0."); // Mensaje de error si ya está en 0
    }
  }
  