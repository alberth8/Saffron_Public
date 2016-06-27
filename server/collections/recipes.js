const db = require('../db/schema');
const Recipe = require('../models/recipe.js');

// instatiate collection
const Recipes = new db.Collection();

// setting model
Recipes.model = Recipe;

module.exports = Recipes;
