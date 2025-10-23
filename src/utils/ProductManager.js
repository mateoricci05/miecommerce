import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../../data/products.json');

export default class ProductManager {
  constructor(filePath = DATA_PATH) {
    this.path = filePath;
  }

  async _readFile() {
    try {
      const content = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(this.path, '[]', 'utf-8');
        return [];
      }
      throw err;
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getProducts() {
    return await this._readFile();
  }

  async addProduct(product) {
    const products = await this._readFile();
    const newProduct = {
      id: uuidv4(),
      title: product.title || 'Sin título',
      description: product.description || '',
      price: Number(product.price) || 0,
      thumbnail: product.thumbnail || '',
      stock: Number(product.stock) || 0,
      code: product.code || ''
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    await this._writeFile(products);
    return true;
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find(p => p.id === id);
  }
}
