const recipesController = require('../controllers/recipesController.js');

// 
// Recipes routes
// 
module.exports = function (app) {
  // recommends recipes based on the ingredients the user has searched/selected
  app.get('/api/ingredients/:id', recipesController.getMatchedRecipes);
};