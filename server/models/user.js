const db = require('../db/schema');
// const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const Recipe = require('./recipe');

var User = db.Model.extend({

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

  recipes: () => {
    this.belongsToMany(Recipe);
  }
});

module.exports = User;