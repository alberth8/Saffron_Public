const db = require('../db/schema');
const Ingredient_Recipe = require('../models/ingredient_recipe.js');

// instatiate collection
const Ingredients_Recipes = new db.Collection();

// setting model
Ingredients_Recipes.model = Ingredient_Recipe;

module.exports = Ingredients_Recipes;
