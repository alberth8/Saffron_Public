const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
require('./user');
require('./ingredient');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  user: () => {
    this.belongsToMany('User');
  },

  ingredient: () => {
    this.belongsToMany('Ingredient');
  }
});

module.exports = db.model('Recipe', Recipe);


// ing has many recipes
// recipe has many ing
// 
// 
// users has many ingredients