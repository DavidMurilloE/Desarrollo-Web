const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $loader = d.querySelector("#loader");
let carrito = [];

// Evento para manejar el clic en los botones "+" y "-"
d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-mas")) {
    const $producto = e.target.closest(".producto");
    agregarProducto($producto);
  }

  if (e.target.matches(".btn-menos")) {
    const $producto = e.target.closest(".producto");
    quitarProducto($producto);
  }
});

// Función para agregar producto al carrito
function agregarProducto($producto) {
  let id = $producto.getAttribute("data-id");
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));
  let productoEnCarrito = carrito.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

// Función para quitar producto del carrito
function quitarProducto($producto) {
  let id = $producto.getAttribute("data-id");
  let productoEnCarrito = carrito.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad -= 1;
    if (productoEnCarrito.cantidad === 0) {
      carrito = carrito.filter(p => p.id !== id); // Eliminar del carrito si la cantidad es 0
    }
    actualizarCarrito();
  }
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
  $listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(producto => {
    // Crear el elemento de lista para cada producto agrupado por tipo
    const $itemCarrito = d.createElement("li");
    let subtotal = producto.precio * producto.cantidad;
    $itemCarrito.innerText = `${producto.nombre} x ${producto.cantidad} = $${subtotal.toFixed(2)}`;
    
    // Añadir el producto a la lista del carrito
    $listaCarrito.appendChild($itemCarrito);
    
    // Sumar el subtotal al total general del carrito
    total += subtotal;
  });

  // Actualizar el total del carrito en la interfaz
  $totalCarrito.innerText = total.toFixed(2);
}

// Evento para simular la compra con un loader
$btnCompra.addEventListener("click", function () {
  if (carrito.length > 0) {
    // Mostrar el loader
    $loader.classList.remove("hidden");

    // Simular la espera de 5 segundos
    setTimeout(() => {
      $loader.classList.add("hidden");
      $mensajeCompra.classList.remove("hidden");

      // Limpiar el carrito después de la compra
      carrito = [];
      actualizarCarrito();
    }, 5000);
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});

