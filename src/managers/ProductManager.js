const fs = require('fs').promises;
const path = require('path');

class ProductManager {
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

  async getAll() { return await this._read(); }

  async getById(id) {
    const items = await this._read();
    return items.find(p => String(p.id) === String(id)) || null;
  }

  async addProduct(body) {
    const required = ['title','description','code','price','status','stock','category'];
    for (const r of required) {
      if (!(r in body)) throw new Error(`Missing field: ${r}`);
    }
    const items = await this._read();
    const id = this._generateId(items);
    const product = {
      id,
      title: body.title,
      description: body.description,
      code: body.code,
      price: Number(body.price),
      status: Boolean(body.status),
      stock: Number(body.stock),
      category: body.category,
      thumbnails: Array.isArray(body.thumbnails) ? body.thumbnails : []
    };
    items.push(product);
    await this._write(items);
    return product;
  }

  async updateProduct(id, updates) {
    const items = await this._read();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const current = items[idx];
    if ('id' in updates && String(updates.id) !== String(id)) throw new Error('Cannot modify id');
    const merged = { ...current, ...updates, id: current.id };
    items[idx] = merged;
    await this._write(items);
    return merged;
  }

  async deleteProduct(id) {
    const items = await this._read();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    items.splice(idx,1);
    await this._write(items);
    return true;
  }
}

module.exports = ProductManager;
