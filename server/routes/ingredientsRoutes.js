const ingredientsController = require('../controllers/ingredientsController.js');

// Ingredients routes
module.exports = (app) => {
  // find all favorited sets of ingredients
  app.post('api/updateIngredinents', ingredientsController.updateIngredients);
};


  // if user saves set of ingredients
  // NOTE: not sure if will need `:/id`
  // app.put('/api/faved-set/:id', ingredientsController.favedSet);
