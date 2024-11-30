import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

      // Cargar productos y stock
      for (const id in productos) {
        const producto = productos[id];
        
        // Asegurarse de que el stock es un número antes de mostrarlo
        const stock = producto.stock;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${producto.nombre}</td>
          <td id="stock-${id}">${stock}</td>
          <td>
            <button onclick="sumarStock('${id}', 1)">+</button>
            <button onclick="restarStock('${id}', 1)">-</button>
          </td>
        `;
        tableBody.appendChild(row);
      }
    }
  });
}

// Función para sumar stock
window.sumarStock = function(id, cantidad) {
  const stockRef = ref(db, 'productos/' + id + '/stock');
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();

      // Asegurarnos de que el stock es un número
      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = parseInt(stockActual, 10);  // Asegurarnos de que el valor es un número
      nuevoStock += cantidad;
      console.log('Sumando stock: ', nuevoStock);  // Añadir console log para depuración

      // Actualizar stock en Firebase
      update(stockRef, { stock: nuevoStock }).then(() => {
        console.log('Stock actualizado en Firebase');
        cargarStock(); // Recargar el stock después de actualizar
      }).catch((error) => {
        console.error('Error actualizando el stock: ', error);
      });
    }
  });
}

// Función para restar stock
window.restarStock = function(id, cantidad) {
  const stockRef = ref(db, 'productos/' + id + '/stock');
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();

      // Asegurarnos de que el stock es un número
      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = parseInt(stockActual, 10);  // Asegurarnos de que el valor es un número
      nuevoStock -= cantidad;

      // Asegurarse de que el nuevo stock no sea negativo
      if (nuevoStock < 0) {
        console.error('El stock no puede ser negativo');
        return;
      }

      console.log('Restando stock: ', nuevoStock);  // Añadir console log para depuración

      // Actualizar stock en Firebase
      update(stockRef, { stock: nuevoStock }).then(() => {
        console.log('Stock actualizado en Firebase');
        cargarStock(); // Recargar el stock después de actualizar
      }).catch((error) => {
        console.error('Error actualizando el stock: ', error);
      });
    }
  });
}

// Cargar el stock al cargar la página
cargarStock();
