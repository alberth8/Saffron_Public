const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
// var User = require('./user');
const Recipe_User = require('./recipe_user');
const ingredient = require('./ingredient.js');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  recipe_user: () => {
    this.hasMany(Recipe_User);
  },

  ingredients: () => {
    this.hasMany(ingredient, 'ingredient_id', 'ingredient');
  },
});

module.exports = Recipe;
