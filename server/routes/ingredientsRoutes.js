var ingredientsController = require('../controllers/ingredientsController.js');

// 
// Ingredients routes
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  app.get('/api/ingredients/:id', ingredientsController.getIngredients);

  // if user saves set of ingredients
  // NOTE: not sure if will need `:/id`
  app.put('/api/faved-set/:id', ingredientsController.favedSet);
};