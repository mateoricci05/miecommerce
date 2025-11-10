import express from 'express';
import Product from '../services/product.service.js';
const router = express.Router();

// GET /api/products?limit=&page=&sort=&query=
router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await Product.getProducts({ limit, page, sort, query, baseUrl: req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0] });
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Additional endpoints for creating products (for testing)
router.post('/', async (req, res) => {
  try {
    const created = await Product.createProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const prod = await Product.getById(req.params.pid);
    if(!prod) return res.status(404).json({ status:'error', message:'Product not found' });
    res.json({ status: 'success', payload: prod });
  } catch(err) {
    res.status(500).json({ status:'error', message: err.message });
  }
});

export default router;
