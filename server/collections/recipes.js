var db = require('../db/config');
var Recipe = require('../models/recipe.js');

// instatiate collection
var Recipes = new db.Collection();

// setting model
Recipes.model = Recipe;

module.exports = Recipes;