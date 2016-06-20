var recipesController = require('../controllers/recipesController.js');

// 
// Recipes routes
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  app.get('/api/ingredients/:id', recipesController.getFavedIngredients);

  // Note: sorting/filter results should be done through React's state
};