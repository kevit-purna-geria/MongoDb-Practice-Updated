const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
