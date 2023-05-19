const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Create Recipes
router.post('/add-recipes', async (req, res) => {
    try {
      const { name, products } = req.body;
  
      const recipe = new Recipe({
        name,
        products
      });
  
      await recipe.save();
  
      res.status(201).json({ message: 'Recipe added successfully', recipe });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add recipe' });
    }
  });


// Fetch the list of recipes along with the products used in each recipe
router.get('/view-recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('products');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Update a product
router.put('/recipe:id', async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id.replace(":",""), req.body);
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

module.exports = router;
