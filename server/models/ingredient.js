const db = require('../db/config');
const Users = require('./user');

let Recipe = db.Model.extend({
  tableName: 'recipes',

  users: () => {
    this.hasMany(Users);
  }
});

module.exports = Recipe;