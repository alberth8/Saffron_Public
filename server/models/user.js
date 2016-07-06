const db = require('../db/schema');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
// const Recipe = require('./recipe');
const Recipe_User = require('./recipe_user');
const Ingredient_User = require('./ingredient_user');

const User = db.Model.extend({

  tableName: 'users',

  initialize: function () {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function (attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), (err, isMatch) => {
      callback(isMatch);
    });
  },

  hashPassword: function () {
    const cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function (hash) {
        this.set('password', hash);
      });
  },

  ingredient_user: function () {
    this.hasMany(Ingredient_User);
  },

  recipe_user: function () {
    this.hasMany(Recipe_User);
  },
});

module.exports = User;
// module.exports = db.model('User', User);
