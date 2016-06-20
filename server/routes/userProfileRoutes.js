// controller
var userController = require('../controllers/userController.js');

// 
// User Profile
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  app.get('/api/ingredients/:id', userController.recipes);

  // find all recipes favorited by the user
  app.get('/api/recipes/:id', userController.ingredients);
};