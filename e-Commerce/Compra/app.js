// Datos de los productos
const products = [
    {
      id: 1,
      name: "Anillo Mold 1",
      description: "Creado con la finalidad de ser moderno y único",
      price: 2400,
      image: "Diseños de Anillos/Leonardo_Phoenix_a_sleek_and_minimalist_futuristic_ring_with_a_0.jpg"
    },
    {
      id: 2,
      name: "Anillo Mold 2",
      description: "Con una forma tradicional y elegante",
      price: 1600,
      image: "Diseños de Anillos/Leonardo_Phoenix_A_futuristic_wedding_ring_featuring_sleek_met_0.jpg"
    },
    {
      id: 3,
      name: "Anillo Mold 3",
      description: "Sencillo e impresionante",
      price: 3500,
      image: "Diseños de Anillos/Leonardo_Phoenix_A_intricately_designed_medievalstyle_wedding_3.jpg"
    }
  ];
  
  // Carrito de compras inicializado como un arreglo vacío
  const cart = [];
  
  // Función para mostrar los productos
  function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('col-md-4');
      productElement.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
          </div>
        </div>
      `;
      productList.appendChild(productElement);
    });
  }
  
  // Función para agregar productos al carrito
  function addToCart(productId) {
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1; // Si ya existe, incrementamos la cantidad
    } else {
      const product = products.find(p => p.id === productId);
      cart.push({ ...product, quantity: 1 }); // Si no existe, lo agregamos al carrito con cantidad 1
    }
    displayCart();
  }
  
  // Función para eliminar productos del carrito
  function removeFromCart(productId) {
    const product = cart.find(p => p.id === productId);
    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1; // Si la cantidad es mayor a 1, solo la restamos
      } else {
        const index = cart.indexOf(product);
        cart.splice(index, 1); // Si es 1, eliminamos el producto del carrito
      }
    }
    displayCart();
  }
  
  // Función para mostrar el carrito
  function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('list-group-item');
      cartItem.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity} 
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">-</button>
        <button class="btn btn-sm btn-success" onclick="addToCart(${item.id})">+</button>
        <strong> = $${item.price * item.quantity}</strong>
      `;
      total += item.price * item.quantity;
      cartItems.appendChild(cartItem);
    });
    document.getElementById('total').innerText = `Total: $${total}`;
  }
  
  // Función de checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
    } else {
      let total = 0;
      cart.forEach(item => total += item.price * item.quantity);
      alert(`Total de la compra: $${total}\nGracias por tu compra.`);
      cart.length = 0;
      displayCart();
    }
  });
  
  // Mostrar productos cuando cargue la página
  window.onload = displayProducts;
  