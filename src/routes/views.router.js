import express from 'express';
import ProductService from '../services/product.service.js';
import CartService from '../services/cart.service.js';
const router = express.Router();

// Index redirect to products
router.get('/', (req, res) => res.redirect('/products') );

// Products listing view uses same query params as API
router.get('/products', async (req, res) => {
  const { limit, page, sort, query } = req.query;
  const baseUrl = req.protocol + '://' + req.get('host') + '/api/products';
  const data = await ProductService.getProducts({ limit, page, sort, query, baseUrl });
  res.render('products/index', { data });
});

// Product detail
router.get('/products/:pid', async (req, res) => {
  const prod = await ProductService.getById(req.params.pid);
  if(!prod) return res.status(404).send('Product not found');
  res.render('products/detail', { product: prod });
});

// Cart view
router.get('/carts/:cid', async (req, res) => {
  const cart = await CartService.getCart(req.params.cid);
  if(!cart) return res.status(404).send('Cart not found');
  res.render('carts/view', { cart });
});

export default router;
