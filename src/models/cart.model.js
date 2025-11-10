import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min:1 }
}, { _id: false });

const cartSchema = new Schema({
  products: [cartProductSchema]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
