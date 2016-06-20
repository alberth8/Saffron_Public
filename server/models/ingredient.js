const db = require('../db/config');
const Users = require('./user');

let Ingredient = db.Model.extend({
  tableName: 'ingredients',

  users: () => {
    this.hasMany(Users);
  }
});

module.exports = Ingredient;