const db = require('../db/schema.js');
const Users = require('./user');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  users: () => {
    this.belongsToMany(User);
  }
});

module.exports = Recipe;


// ing has many recipes
// recipe has many ing
// 
// 
// users has many ingredients