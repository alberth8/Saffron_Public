const recController = require('../controllers/recController.js');

module.exports = function (app) {
  // route recommendation engine uses to get data from main data base
  app.get('/api/fetchData', recController.fetchData);
};
