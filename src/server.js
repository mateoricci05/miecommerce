const express = require('express');
const cors = require('cors');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
