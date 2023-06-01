import Supplier from '../supplier/supplier.model';
import Product from './product.model';

class productController{
    async addProduct(req, res){
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
    }

    async updateProduct(req, res){
        try {
    
            const product = await Product.findByIdAndUpdate(req.params.id.reNplace(":",""), req.body);
            res.json({ message: 'Product updated successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Failed to update product' });
          }
    }

    async viewProduct(req,res){
        try {
            const products = await Product.find();
            res.json(products);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
          }
    }
}

module.exports = productController