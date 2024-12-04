// Función para obtener los datos del archivo JSON y mostrarlos en el HTML
async function obtenerDatosDelJSON() {
  try {
    let res = await fetch("data.json");

    if (!res.ok) {
      throw new Error("Error al acceder al archivo JSON");
    }

    let json = await res.json();
    console.log("Datos JSON:", json);

    const $productos = document.querySelector("#productos");
    let html = "";

    json.productos.forEach((producto) => {
      html += `
        <article>
          <img src="${producto.image}" alt="${producto.title}" />
          <h4>${producto.title}</h4> 
          <p>${producto.description}</p>
          <p>Precio: $${producto.price}</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </article>
      `;
    });

    $productos.innerHTML = html;
  } catch (error) {
    console.warn("Error:", error);
  }
}

// Inicializar el carrito de compras
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  fetch("data.json")
    .then((res) => res.json())
    .then((json) => {
      const producto = json.productos.find((item) => item.id === id);
      if (producto) {
        carrito.push(producto);
        mostrarCarrito();
      }
    })
    .catch((error) => console.warn("Error:", error));
}

// Función para mostrar los productos del carrito en el HTML
function mostrarCarrito() {
  const $carrito = document.querySelector("#carrito");
  let html = "<h3>Carrito de Compras</h3>";

  if (carrito.length === 0) {
    html += "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach((producto) => {
      html += `
        <div>
          <img src="${producto.image}" alt="${producto.title}" width="50"/>
          <p>${producto.title} - $${producto.price}</p>
        </div>
      `;
    });
  }

  $carrito.innerHTML = html;
}

// Evento para cargar datos al inicio
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatosDelJSON();
});

