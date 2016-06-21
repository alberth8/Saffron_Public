var usersController = require('../controllers/usersController.js');

// 
// User Profile
// 
export default  function (app) {
  // find all favorited sets of ingredients
  // Note: `:` is a place holder. `id` will be adeed to req.param
  app.get('/api/ingredients/:userid', userController.getFavedIngredients);

  // find all recipes favorited by the user
  app.get('/api/recipes/:userid', userController.getFavedRecipes);
};