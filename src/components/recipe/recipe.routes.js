import { Router } from 'express';
const router = Router();
import Recipe from './recipe.model';
import RecipeController from './recipe.controller';
const recipeController = new RecipeController()

// Create Recipes
router.post('/add-recipes', auth, async (req, res) => {
    recipeController.addRecipe(req, res)
  });

// Fetch the list of recipes along with the products used in each recipe
router.get('/view-recipes', auth, async (req, res) => {
  recipeController.viewRecipes(req, res)
});

// Update a product
router.put('/recipe:id', auth, async (req, res) => {
    recipeController.updateRecipe(req, res)
  });

export default router;
