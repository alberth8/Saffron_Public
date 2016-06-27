const recController = require('../controllers/recController.js');

module.exports = function (app) {
  // find all favorited sets of ingredients
  app.post('/fetchData', recController.fetchData);
};