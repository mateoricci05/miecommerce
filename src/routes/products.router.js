import { Router } from 'express';
import ProductManager from '../utils/ProductManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.post('/', async (req, res) => {
  const product = req.body;
  const newProduct = await manager.addProduct(product);

  // If request has access to io (app set), emit update
  const io = req.app.get('io');
  if (io) {
    const products = await manager.getProducts();
    io.emit('updateProducts', products);
  }
  res.status(201).json(newProduct);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const ok = await manager.deleteProduct(id);
  if (ok) {
    const io = req.app.get('io');
    if (io) {
      const products = await manager.getProducts();
      io.emit('updateProducts', products);
    }
    return res.json({ deleted: true });
  }
  res.status(404).json({ error: 'Product not found' });
});

export default router;
