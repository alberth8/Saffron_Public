const db = require('../db/schema');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const Recipe = require('./recipe');

const User = db.Model.extend({

  tableName: 'users',

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },

  recipe: () => {
    this.belongsToMany('Recipe', 'recipe_user', 'recipe_id', 'user_id');
  },

  ingredient: () => {
    this.belongsToMany('Ingredient', 'ingredient_user', 'ingredient_id', 'user_id');
  }
});


module.exports = db.model('User', User);