var db = require('../db/config');
var Ingredient = require('../models/ingredient.js');

// instatiate collection
var Ingredients = new db.Collection();

// setting model
Ingredients.model = Ingredient;

module.exports = Ingredients;