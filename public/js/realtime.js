const socket = io();

// Elements
const form = document.getElementById('productForm');
const list = document.getElementById('productsList');

function renderProducts(products) {
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.innerHTML = `<strong>${p.title}</strong> - $${p.price} - stock: ${p.stock} 
      <button class="deleteBtn" data-id="${p.id}">Eliminar</button>`;
    list.appendChild(li);
  });
}

// Listen server-sent updates
socket.on('updateProducts', (products) => {
  renderProducts(products);
});

// Form submit -> send via socket
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const product = Object.fromEntries(fd.entries());
  product.price = Number(product.price) || 0;
  product.stock = Number(product.stock) || 0;

  socket.emit('newProduct', product);
  form.reset();
});

// Delete via socket
list.addEventListener('click', (e) => {
  if (e.target.matches('.deleteBtn')) {
    const id = e.target.dataset.id;
    socket.emit('deleteProduct', id);
  }
});

// Bridge events sent from socket to server-side actions (server emits these as requests)
socket.on('updateProductsRequest', async ({ source, product }) => {
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch (err) {
    console.error(err);
  }
});

socket.on('deleteProductRequest', async ({ source, id }) => {
  try {
    await fetch('/api/products/' + id, { method: 'DELETE' });
  } catch (err) {
    console.error(err);
  }
});
