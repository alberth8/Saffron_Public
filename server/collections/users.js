const db = require('../db/schema');
const User = require('../models/user.js');

// instatiate collection
const Users = new db.Collection();

// setting model
Users.model = User;

module.exports = Users;
