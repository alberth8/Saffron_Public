var db = require('../db/schema');
var Ingredient_User = require('../models/ingredient_user.js');

// instatiate collection
const Ingredients_Users = new db.Collection();

// setting model
Ingredients_Users.model = Ingredient_User;

module.exports = Ingredients_Users;