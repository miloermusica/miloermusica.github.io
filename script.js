function sumarStock(idCelda) {
  const celda = document.getElementById(idCelda);
  let stockActual = parseInt(celda.innerText); // Obtiene el valor actual del stock
  celda.innerText = stockActual + 1; // Suma 1 al valor actual
}
