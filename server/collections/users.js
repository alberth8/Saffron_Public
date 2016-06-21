var db = require('../db/schema');
var User = require('../models/user.js');

// instatiate collection
var Users = new db.Collection();

// setting model
Users.model = User;

module.exports = Users;