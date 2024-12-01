import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc0HLTT1llSGwh-85qucdPnJVIat9Dq14",
  authDomain: "enoteca-d37c8.firebaseapp.com",
  databaseURL: "https://enoteca-d37c8-default-rtdb.firebaseio.com",
  projectId: "enoteca-d37c8",
  storageBucket: "enoteca-d37c8.firebasestorage.app",
  messagingSenderId: "255465370905",
  appId: "1:255465370905:web:bd99e92bc02e3d9dac4188"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Obtener los productos desde Firebase
function cargarStock() {
  const stockRef = ref(db, 'productos/');
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      const productos = snapshot.val();
      const tableBody = document.querySelector('#stockTable tbody');
      tableBody.innerHTML = ''; // Limpiar tabla antes de cargar
      let totalPrecio = 0; // Variable para almacenar el precio total

      // Cargar productos y stock
      for (const id in productos) {
        const producto = productos[id];

        // Validar que los datos existan antes de asignarlos
        const nombre = producto.nombre || "Sin nombre";
        const tipo = producto.tipo || "Sin tipo";
        const precio = producto.precio || 0;
        const stock = producto.stock || 0;

        // Crear fila de la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${tipo}</td>
          <td>${nombre}</td>
          <td>€${precio}</td>
          <td id="stock-${id}">${stock}</td>
          <td>
            <button onclick="sumarStock('${id}', 1)">+</button>
            <button onclick="restarStock('${id}', 1)">-</button>
          </td>
        `;
        tableBody.appendChild(row);

        // Sumar el precio de cada vino al total
        totalPrecio += parseFloat(precio) * stock; // Multiplicar precio por stock
      }

      // Mostrar el total en un lugar de la página
      const totalPrecioElement = document.getElementById('totalPrecio');
      if (totalPrecioElement) {
        totalPrecioElement.innerText = `Total Precio: €${totalPrecio.toFixed(2)}`; // Mostrar el total con dos decimales
      }
    } else {
      console.log("No se encontraron datos en la base de datos.");
    }
  }).catch((error) => {
    console.error("Error al cargar el stock:", error);
  });
}

// Función para sumar stock
window.sumarStock = function (id, cantidad) {
  const stockRef = ref(db, `productos/${id}/stock`);
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();

      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = stockActual + cantidad;

      // Actualizar el stock en Firebase
      const updates = {};
      updates[`productos/${id}/stock`] = nuevoStock;

      update(ref(db), updates).then(() => {
        console.log('Stock actualizado en Firebase');
        cargarStock(); // Recargar el stock después de actualizar
      }).catch((error) => {
        console.error('Error actualizando el stock:', error);
      });
    }
  });
}

// Función para restar stock
window.restarStock = function (id, cantidad) {
  const stockRef = ref(db, `productos/${id}/stock`);
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();

      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = stockActual - cantidad;

      if (nuevoStock < 0) {
        console.error('El stock no puede ser negativo');
        return;
      }

      // Actualizar el stock en Firebase
      const updates = {};
      updates[`productos/${id}/stock`] = nuevoStock;

      update(ref(db), updates).then(() => {
        console.log('Stock actualizado en Firebase');
        cargarStock(); // Recargar el stock después de actualizar
      }).catch((error) => {
        console.error('Error actualizando el stock:', error);
      });
    }
  });
}

// Cargar el stock al cargar la página
cargarStock();
