const recipesController = require('../controllers/recipesController.js');

// Recipes routes
module.exports = (app) => {
  // recommends recipes based on the ingredients the user has searched/selected
  // app.get('/api/recipes/:id', recipesController.getMatchedRecipes);
  app.post('/api/saveFav', recipesController.saveFav);

  // get all of users favorit recipes
  app.post('/api/getFavs', recipesController.getFavs);

  // get the recipes detail from main db
  app.post('/api/getRecipeInfo', recipesController.getRecipeInfo);
};
