var db = require('../db/schema');
var Recipe = require('../models/recipe.js');

// instatiate collection
var Recipes = new db.Collection();

// setting model
Recipes.model = Recipe;

module.exports = Recipes;