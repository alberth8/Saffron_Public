const recController = require('../controllers/recController.js');

module.exports = function (app) {
  app.get('/api/fetchData', recController.fetchData);
};
