const db = require('../db/schema');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
// const Recipe = require('./recipe');
const Recipe_User = require('./recipe_user');
const Ingredient_User = require('./ingredient_user');

const User = db.Model.extend({

  tableName: 'users',

  initialize: () => {
    this.on('creating', this.hashPassword);
  },

  comparePassword: (attemptedPassword, callback) => {
    bcrypt.compare(attemptedPassword, this.get('password'), (err, isMatch) => {
      callback(isMatch);
    });
  },

  hashPassword: () => {
    const cipher = Promise.promisify(bcrypt.hash);
    cipher(this.get('password'), null, null).bind(this)
      .then((hash) => {
        this.set('password', hash);
      });
  },

  ingredient_user: () => {
    this.hasMany(Ingredient_User);
  },

  recipe_user: () => {
    this.hasMany(Recipe_User);
  },
});

module.exports = User;
// module.exports = db.model('User', User);
