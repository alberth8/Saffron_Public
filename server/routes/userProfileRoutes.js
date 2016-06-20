var usersController = require('../controllers/usersController.js');

// 
// User Profile
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  // Note: `:` is a place holder. `id` will be adeed to req.param
  app.get('/api/ingredients/:id', userController.recipes);

  // find all recipes favorited by the user
  app.get('/api/recipes/:id', userController.ingredients);
};