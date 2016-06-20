var addRecipeController = require('../controllers/addRecipeController.js');

// 
// Add a recipe router
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  app.post('/api/addRecipe', addRecipeController.addRecipe);
};