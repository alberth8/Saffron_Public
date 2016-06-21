
const Recipe = require('../models/recipe.js');
const Recipes = require('../collections/recipes.js');
const Ingredient = require('../models/ingredient.js');
const Ingredients = require('../collections/ingredients.js');

// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID

// Displays sets of ingredients and individual recipes that user has favorited
module.exports = {
  getFavedIngredients: function (req, res) {
  },

  getFavedRecipes: function (req, res) {
  }
}