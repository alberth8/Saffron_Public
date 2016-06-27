const addRecipeController = require('../controllers/addRecipeController.js');

// Add a recipe router
module.exports = (app) => {
  // find all favorited sets of ingredients
  console.log('HORRAY');


  // app.post('/api/addrecipe', function() {
  //   console.log('TEST TEST');
  // });
  app.post('/api/addRecipe', addRecipeController.addRecipe);
};
