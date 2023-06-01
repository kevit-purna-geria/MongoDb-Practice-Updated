import { Router } from 'express';
import Product from './product.model';

import Supplier from '../supplier/supplier.model';

import ProductController from './product.controller';
const productController = new ProductController()

const router = Router();

// Fetch all products
router.get('/products', async (req, res) => {
  productController.viewProduct(req, res)
});

router.post('/add-product', async (req, res) => {
    productController.addProduct(req, res)
  });
  

// Update a product
router.put('/product:id', async (req, res) => {
  productController.updateProduct(req, res)
});



export default router;
