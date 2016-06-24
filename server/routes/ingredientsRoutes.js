const ingredientsController = require('../controllers/ingredientsController.js');

// Ingredients routes
module.exports = (app) => {
  app.post('/api/updateIngredients', ingredientsController.updateIngredients);
  app.get('/api/updateIngredients', ingredientsController.getIngredients);
};

// if user saves set of ingredients
// NOTE: not sure if will need `:/id`
// app.put('/api/faved-set/:id', ingredientsController.favedSet);
  // ;
