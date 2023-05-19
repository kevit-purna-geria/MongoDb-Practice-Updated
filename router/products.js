const express = require('express');
const Product = require('../models/products');

const Supplier = require('../models/supplier')

const router = express.Router();

// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/add-product', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      
      const supplier = await Supplier.findById(req.body.supplier);
  
      // Add the product object to the supplier's products array
      supplier.products.push(product);
      await supplier.save();
  
      // Populate the products array with the complete product objects
      const populatedSupplier = await supplier.populate('products');
    
      res.status(201).json({ message: 'Product added successfully', supplier: populatedSupplier });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  });
  

// Update a product
router.put('/product:id', async (req, res) => {
  try {
    
    const product = await Product.findByIdAndUpdate(req.params.id.replace(":",""), req.body);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});



module.exports = router;
