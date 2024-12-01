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
      let totalPrecio = 0;

      // Cargar productos y stock
      for (const id in productos) {
        const producto = productos[id];
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${producto.nombre}</td>
          <td>${producto.tipo}</td>
          <td>${producto.precio}</td>
          <td id="stock-${id}">${producto.stock}</td>
          <td>
            <button onclick="sumarStock('${id}', 1)">+</button>
            <button onclick="restarStock('${id}', 1)">-</button>
          </td>
        `;
        tableBody.appendChild(row);

        // sumar el precio de cada vino al total

        totalPrecio += parseFloat(producto.precio) * pruducto.stock; // Multiplicar precio por stock
      }

      // Mostrar el total en el lugar de la pagina

      const totalPrecioElement = document.getElementById( 'totalPrecio');
      if (totalPrecioElement) {
        totalPrecioElement.innerText = `Total Precio: €${totalPrecio.toFixed(2)}`; // Mostrar el total con dos decimales
      }
    }
  });
}

// Función para sumar stock
window.sumarStock = function(id, cantidad) {
  const stockRef = ref(db, 'productos/' + id + '/stock');  // Ruta de stock
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();  // Obtener el valor actual de stock

      // Asegurarnos de que el stock es un número
      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = stockActual + cantidad;  // Sumar la cantidad al stock actual
      console.log('Sumando stock: ', nuevoStock);  // Añadir console log para depuración

      // Crear un objeto con la nueva estructura
      const updates = {};
      updates['productos/' + id + '/stock'] = nuevoStock;  // Asegurarse de que es un número válido

      // Actualizar el stock en Firebase
      update(ref(db), updates).then(() => {
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
  const stockRef = ref(db, 'productos/' + id + '/stock');  // Ruta de stock
  get(stockRef).then((snapshot) => {
    if (snapshot.exists()) {
      let stockActual = snapshot.val();  // Obtener el valor actual de stock

      // Asegurarnos de que el stock es un número
      if (isNaN(stockActual)) {
        console.error('El stock no es un número válido:', stockActual);
        return;
      }

      let nuevoStock = stockActual - cantidad;  // Restar la cantidad al stock actual

      // Asegurarse de que el nuevo stock no sea negativo
      if (nuevoStock < 0) {
        console.error('El stock no puede ser negativo');
        return;
      }

      console.log('Restando stock: ', nuevoStock);  // Añadir console log para depuración

      // Crear un objeto con la nueva estructura
      const updates = {};
      updates['productos/' + id + '/stock'] = nuevoStock;  // Asegurarse de que es un número válido

      // Actualizar el stock en Firebase
      update(ref(db), updates).then(() => {
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
