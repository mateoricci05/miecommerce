/*
Run this script with: node src/seed/seed.js (ensure NODE_PATH supports ES modules or run with a bundler)
This script seeds sample products into the DB for testing.
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.model.js';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/entrega_final';

const sample = [
  { title: 'Mouse', description: 'Mouse gamer', price: 25, category: 'Perifericos', stock: 10 },
  { title: 'Teclado', description: 'Teclado mecánico', price: 75, category: 'Perifericos', stock: 5 },
  { title: 'Monitor', description: 'Monitor 24"', price: 200, category: 'Monitores', stock: 2 },
  { title: 'Auriculares', description: 'Auriculares inalambricos', price: 50, category: 'Audio', stock: 0 },
];

mongoose.connect(MONGODB_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(sample);
  console.log('Seed done');
  mongoose.disconnect();
}).catch(err => console.error(err));
