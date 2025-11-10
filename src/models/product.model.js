import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  status: { type: Boolean, default: true }, // available
  thumbnails: [String],
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
