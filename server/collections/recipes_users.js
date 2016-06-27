const db = require('../db/schema');
const Recipe_User = require('../models/recipe_user.js');

// instatiate collection
const Recipes_Users = new db.Collection();

// setting model
Recipes_Users.model = Recipe_User;

module.exports = Recipes_Users;
