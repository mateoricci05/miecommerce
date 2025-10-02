const express = require('express');
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');
const router = express.Router();
const cm = new CartManager('src/data/carts.json');
const pm = new ProductManager('src/data/products.json');

router.post('/', async (req, res) => {
  const cart = await cm.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  const cart = await cm.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  res.json(cart.products);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const product = await pm.getById(pid);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  try {
    const updatedCart = await cm.addProductToCart(cid, pid);
    if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
