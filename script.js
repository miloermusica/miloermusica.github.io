// Importar e inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Configuración de Firebase (reemplaza con tus datos)
const firebaseConfig = {
  apiKey: "AIzaSyBc0HLTT1llSGwh-85qucdPnJVIat9Dq14",
  authDomain: "enoteca-d37c8.firebaseapp.com",
  databaseURL: "https://enoteca-d37c8-default-rtdb.firebaseio.com",
  projectId: "enoteca-d37c8",
  storageBucket: "enoteca-d37c8.firebasestorage.app",
  messagingSenderId: "255465370905",
  appId: "1:255465370905:web:bd99e92bc02e3d9dac4188"
};

// Inicializar Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para cargar el stock inicial desde Firebase
function cargarStockDesdeFirebase() {
  const stockRef = ref(db, "stock");

  // Escuchar los cambios en tiempo real
  onValue(stockRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      Object.keys(data).forEach((idProducto) => {
        const celda = document.getElementById(`producto-${idProducto}`);
        if (celda) {
          celda.innerText = data[idProducto].cantidad; // Actualiza la cantidad en la celda
        }
      });
    }
  });
}

// Función para guardar el stock en Firebase
function guardarStockEnFirebase(idProducto, cantidad) {
  const stockRef = ref(db, `stock/${idProducto}`);
  update(stockRef, { cantidad: cantidad });
}

// Función para sumar stock
function sumarStock(idCelda, idProducto) {
  const celda = document.getElementById(idCelda);
  let stockActual = parseInt(celda.innerText);
  stockActual++;
  celda.innerText = stockActual;

  // Actualizar en Firebase
  guardarStockEnFirebase(idProducto, stockActual);
}

// Función para restar stock
function restarStock(idCelda, idProducto) {
  const celda = document.getElementById(idCelda);
  let stockActual = parseInt(celda.innerText);
  if (stockActual > 0) {
    stockActual--;
    celda.innerText = stockActual;

    // Actualizar en Firebase
    guardarStockEnFirebase(idProducto, stockActual);
  } else {
    alert("El stock no puede ser menor a 0.");
  }
}

// Cargar el stock al cargar la página
window.onload = cargarStockDesdeFirebase;
