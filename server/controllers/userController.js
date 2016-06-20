var usersController = require('../controllers/usersController.js');

// 
// User Profile
// 
module.exports = function (app) {
  // find all favorited sets of ingredients
  app.get('/api/ingredients/:id', function(req, res) {
  });

  // find all recipes favorited by the user
  app.get('/api/recipes/:id', function(req, res) {
  });
};