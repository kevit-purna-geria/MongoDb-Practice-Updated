import { Schema, model } from 'mongoose';
import validator from 'validator';

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  }
});

const Product = model('Product', productSchema);

export default Product;
