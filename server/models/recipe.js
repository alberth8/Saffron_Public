const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
// var User = require('./user');
const Recipe_User = require('./recipe_user');
const Ingredient_Recipe = require('./ingredient_recipe');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  recipe_user: () => {
    this.hasMany(Recipe_User);
  },

  ingredient_recipe: () => {
    this.hasMany(Ingredient_Recipe);
  },
});

module.exports = Recipe;
