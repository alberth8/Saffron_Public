const db = require('../db/schema.js');
const RecipeUser = require('./recipe_user');
const Ingredient = require('./ingredient.js');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  recipe_user: () => (
    this.hasMany(RecipeUser)
  ),

  ingredients: () => (
    this.hasMany(Ingredient)
  ),

});

module.exports = Recipe;
