const db = require('../db/schema');
// don't need to assign the following two requires to variables
require('./recipe');
require('./ingredient');
// for OAuth:
// const bcrypt = require('bcrypt-nodejs');
// const Promise = require('bluebird');

const User = db.Model.extend({

  tableName: 'users',

  // initialize: function() {
  //   this.on('creating', this.hashPassword);
  // },

  // Until we actually have users
  // comparePassword: function(attemptedPassword, callback) {
  //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
  //     callback(isMatch);
  //   });
  // },
  
  // hashPassword: function() {
  //   var cipher = Promise.promisify(bcrypt.hash);
  //   return cipher(this.get('password'), null, null).bind(this)
  //     .then(function(hash) {
  //       this.set('password', hash);
  //     });
  // },

  recipe: () => {
    this.belongsToMany('Recipe');
  },

  ingredient: () => {
    this.belongsToMany('Ingredient');
  }
});

module.exports = db.model('User', User);