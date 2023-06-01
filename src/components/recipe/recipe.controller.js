import Recipe from './recipe.model'

class recipeController{
    async addRecipe(req, res){
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
    }

    async viewRecipes(req, res){
        try {
            const recipes = await Recipe.find().populate('products');
            res.json(recipes);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recipes' });
        }
    }

    async updateRecipe(req, res){
        try {
            const recipe = await Recipe.findByIdAndUpdate(req.params.id.replace(":",""), req.body);
            res.json({ message: 'Product updated successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Failed to update product' });
        }
    }
}

module.exports = recipeController