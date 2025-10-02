const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor(filepath) {
    this.filepath = path.resolve(filepath);
    this._ensureFile();
  }

  async _ensureFile() {
    try {
      await fs.mkdir(path.dirname(this.filepath), { recursive: true });
      await fs.access(this.filepath);
    } catch {
      await fs.writeFile(this.filepath, JSON.stringify([]));
    }
  }

  async _read() {
    const content = await fs.readFile(this.filepath, 'utf-8');
    return JSON.parse(content || '[]');
  }

  async _write(data) {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }

  _generateId(items) {
    const nums = items.map(it => {
      const n = Number(it.id);
      return Number.isFinite(n) ? n : null;
    }).filter(Boolean);
    const max = nums.length ? Math.max(...nums) : 0;
    return String(max + 1);
  }

  async createCart() {
    const items = await this._read();
    const id = this._generateId(items);
    const cart = { id, products: [] };
    items.push(cart);
    await this._write(items);
    return cart;
  }

  async getCartById(id) {
    const items = await this._read();
    return items.find(c => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cid, pid) {
    const items = await this._read();
    const idx = items.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;
    const cart = items[idx];
    const prodIdx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (prodIdx === -1) {
      cart.products.push({ product: String(pid), quantity: 1 });
    } else {
      cart.products[prodIdx].quantity += 1;
    }
    items[idx] = cart;
    await this._write(items);
    return cart;
  }
}

module.exports = CartManager;
