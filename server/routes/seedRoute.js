const seedController = require('../db/seedData/seed.js');

// seed route
module.exports = (app) => {
  app.post('/api/seed', seedController.seedDatabase);
};
