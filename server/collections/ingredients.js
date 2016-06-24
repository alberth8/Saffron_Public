const db = require('../db/schema');
const Ingredient = require('../models/ingredient.js');

// instatiate collection
const Ingredients = new db.Collection();

// setting model
Ingredients.model = Ingredient;

module.exports = Ingredients;
