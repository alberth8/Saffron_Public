var recipesController = require('../controllers/recipesController.js');

// 
// Recipes routes
// 
export default function (app) {
  // recommends recipes based on the ingredients the user has searched/selected
  app.get('/api/ingredients/:id', recipesController.getMatchedRecipes);
};