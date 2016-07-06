const ingredientsController = require('../controllers/ingredientsController.js');

// Ingredients routes
module.exports = (app) => {
  app.post('/api/updateIngredients', ingredientsController.updateIngredients);
  // app.get('/api/updateIngredients', ingredientsController.getIngredients);
};
