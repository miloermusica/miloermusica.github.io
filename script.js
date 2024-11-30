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

firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firebase
const dbRef = firebase.database().ref("productos");

// Función para cargar el stock desde Firebase
function cargarStock() {
    dbRef.once("value", function(snapshot) {
        const productos = snapshot.val();
        const tabla = document.getElementById("tabla-stock");

        // Limpiar la tabla antes de actualizarla
        tabla.innerHTML = "";

        for (const key in productos) {
            const producto = productos[key];
            const fila = document.createElement("tr");

            const nombre = document.createElement("td");
            nombre.textContent = producto.nombre;

            const stock = document.createElement("td");
            stock.textContent = producto.stock;

            // Crear botones para sumar y restar stock
            const sumarButton = document.createElement("button");
            sumarButton.textContent = "+";
            sumarButton.addEventListener("click", () => actualizarStock(key, producto.stock + 1));

            const restarButton = document.createElement("button");
            restarButton.textContent = "-";
            restarButton.addEventListener("click", () => actualizarStock(key, producto.stock - 1));

            fila.appendChild(nombre);
            fila.appendChild(stock);
            fila.appendChild(sumarButton);
            fila.appendChild(restarButton);

            tabla.appendChild(fila);
        }
    });
}

// Función para actualizar el stock de un producto
function actualizarStock(id, nuevoStock) {
    const productoRef = dbRef.child(id);
    productoRef.update({
        stock: nuevoStock
    }, (error) => {
        if (error) {
            console.log("Error al actualizar el stock:", error);
        } else {
            console.log("Stock actualizado correctamente.");
            cargarStock(); // Recargar la tabla después de la actualización
        }
    });
}

// Llamar a la función cargarStock cuando se cargue la página
window.onload = cargarStock;