// Instrucción 1
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalones", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
];

// Instrucción 2
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
      if (producto.stock >= cantidad) {
        carrito.push({
          nombre: productoNombre,
          cantidad: cantidad,
          precio: producto.precio,
        });

        producto.stock -= cantidad;
        console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
      } else {
        console.error(`No hay suficiente stock de ${productoNombre}`);
      }
      return;
    }
  }
  console.error(`El producto "${productoNombre}" no existe.`);
}


// Instrucción 3
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
    total += item.precio * item.cantidad;
  }

  return total;
}

// Instrucción 4
function aplicarDescuento(total) {
  if (total > 100) {
    //Aplica un 10% de descuento
    return total * 0.9;
  }

  return total;
}


// Instrucción 6
agregarAlCarrito("Pantalones", 3);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Zapatos", 2);
agregarAlCarrito("Camisetas", 3);
agregarAlCarrito("Camiseta", 3);
agregarAlCarrito("Pantalones", 2);
console.log(carrito);

function eliminarDelCarrito(productoNombre, cantidad) {
  // Buscar el producto en el carrito
  for (let i = 0; i < carrito.length; i++) {
    let itemCarrito = carrito[i];
    
    if (itemCarrito.nombre === productoNombre) {
      // Verificar si la cantidad a eliminar es válida
      if (cantidad >= itemCarrito.cantidad) {
        // Si la cantidad a eliminar es mayor o igual, eliminamos el producto completo
        carrito.splice(i, 1);
        console.info(`${itemCarrito.cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
        
        // Devolver el stock completo del producto
        for (let producto of productos) {
          if (producto.nombre === productoNombre) {
            producto.stock += itemCarrito.cantidad;
            break;
          }
        }
      } else {
        // Si la cantidad es menor, reducimos la cantidad del carrito
        itemCarrito.cantidad -= cantidad;
        console.info(`${cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
        
        // Devolver la cantidad eliminada al stock
        for (let producto of productos) {
          if (producto.nombre === productoNombre) {
            producto.stock += cantidad;
            break;
          }
        }
      }
      return;
    }
  }
  
  console.error(`El producto "${productoNombre}" no está en el carrito.`);
}

// Ejemplo de uso
eliminarDelCarrito("Pantalones", 3);
console.log(carrito);


//Instrucción 5
function procesarCompra() {
  setTimeout(function () {
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  }, 3000);
}

//Cuenta Regresiva en segundos

function confirmarCompraConCuentaRegresiva(tiempoEnSegundos) {
  
  let contador = tiempoEnSegundos;

  let intervalo = setInterval(() => {
    if (contador > 0) {
      console.log(`Compra confirmada en ${contador}...`);
      contador--;
    } else {
      console.log("Compra confirmada!");
      clearInterval(intervalo); // Detener el intervalo cuando llegue a 0
      procesarCompra(); // Llamar a la función que procesa la compra
    }
  }, 1000); // Ejecuta el bloque cada 1 segundo (1000 ms)
}


confirmarCompraConCuentaRegresiva(3);  // Cuenta regresiva de 3 segundos


/* let total = calcularTotal();
total = aplicarDescuento(total);
console.log(total); */
procesarCompra();
