const addRecipeController = require('../controllers/addRecipeController.js');

// Add a recipe router
module.exports = (app) => {
  // find all favorited sets of ingredients
  app.post('/api/addRecipe', addRecipeController.addRecipe);
};
