const db = require('../db/schema');
const User = require('./user');

const Ingredient = db.Model.extend({
  tableName: 'ingredients',

  users: () => {
    this.belongsToMany(User);
  }
});

module.exports = Ingredient;