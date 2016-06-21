const User = require('../models/user.js');
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');


// TODO: will complete when OAuth is implemented

module.exports = {
  createUser: function (req, res) {
    let userInfo = {
      email: req.body.username,
      password: req.body.password
    };

    User.where('email' , userInfo.email).fetch().then(function(user) {
    	if(!user) {
    	  bcrypt.genSalt(10, function(err, salt) {
    	  	if(err) {return err};
    	    bcrypt.hash(userInfo.password, salt, null, function(err, hash) {
    		  if (err) {return err};
    		    userInfo.password = hash
    		    return new User(userInfo).save();
    	    })
    	  })
    	}
      }).then(function(newUser) {
    	res.status(302).send({ error: 'Email already exists'});
    })
    .catch(function(err) {
    	console.log(err);
    });
  },

  findUser: function (req, res) {
  }
}

