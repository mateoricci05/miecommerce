import express from 'express';
import CartService from '../services/cart.service.js';
const router = express.Router();

// Create cart
router.post('/', async (req, res) => {
  try {
    const cart = await CartService.createCart();
    res.status(201).json({ status:'success', payload: cart });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

// Get cart (populated)
router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartService.getCart(req.params.cid);
    if(!cart) return res.status(404).json({ status:'error', message:'Cart not found' });
    res.json({ status:'success', payload: cart });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

// DELETE api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const updated = await CartService.deleteProductFromCart(req.params.cid, req.params.pid);
    res.json({ status:'success', payload: updated });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

// PUT api/carts/:cid  -> replace products array
router.put('/:cid', async (req, res) => {
  try {
    const products = req.body.products || [];
    const updated = await CartService.replaceCartProducts(req.params.cid, products);
    res.json({ status:'success', payload: updated });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

// PUT api/carts/:cid/products/:pid  -> update quantity of a product
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const quantity = parseInt(req.body.quantity);
    const updated = await CartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json({ status:'success', payload: updated });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

// DELETE api/carts/:cid -> remove all products
router.delete('/:cid', async (req, res) => {
  try {
    const updated = await CartService.clearCart(req.params.cid);
    res.json({ status:'success', payload: updated });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

export default router;
