const mongoose = require('mongoose');

// Supplier Schema
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  // Other supplier details
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  // Other product details
});

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  // Other recipe details
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  }
  // Other user details
});

// Define models based on the schemas
const Supplier = mongoose.model('Supplier', supplierSchema);
const Product = mongoose.model('Product', productSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Supplier, Product, Recipe, User };
