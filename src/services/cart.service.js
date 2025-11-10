import CartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

export default {
  async createCart() {
    const c = new CartModel({ products: [] });
    return c.save();
  },

  async getCart(cid) {
    if(!mongoose.Types.ObjectId.isValid(cid)) return null;
    return CartModel.findById(cid).populate('products.product').lean();
  },

  async deleteProductFromCart(cid, pid) {
    if(!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) throw new Error('Invalid id');
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error('Cart not found');
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  },

  async replaceCartProducts(cid, productsArray) {
    // productsArray expected: [{ product: productId, quantity: N }, ...]
    if(!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid cart id');
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error('Cart not found');
    cart.products = productsArray.map(p => ({ product: p.product, quantity: p.quantity || 1 }));
    await cart.save();
    return cart;
  },

  async updateProductQuantity(cid, pid, quantity) {
    if(!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) throw new Error('Invalid id');
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error('Cart not found');
    const item = cart.products.find(p => p.product.toString() === pid);
    if(!item) throw new Error('Product not found in cart');
    item.quantity = quantity;
    await cart.save();
    return cart;
  },

  async clearCart(cid) {
    if(!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid id');
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error('Cart not found');
    cart.products = [];
    await cart.save();
    return cart;
  }
};
