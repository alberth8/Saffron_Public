const jwt = require('jwt-simple'); 
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.js');
const config = require('../config/authConfig.js');

//function to create token for user 
function token(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ 
		sub: user.id, 
		iat: timestamp
	}, config.secret);
}


module.exports = {
  signup: function (req, res) {
    let userInfo = {
      email: req.body.email,
      password: req.body.password
    };
    console.log(userInfo)
      if (!userInfo.email || !userInfo.password) {
        return res.status(422).send({ error: 'You must provide email and password'});
      }
      User.where('email' , userInfo.email).fetch().then(function(user) {
      	return new User(userInfo).save();
      }).then(function(newUser) {
    	res.json({ token: token(newUser)});
    })
    .catch(function(err) {
    	console.log(err);
    });
  },

  login: function (req, res) {
  	console.log('IN THE THING DOE')
  	res.send({ token: token(req.user) });
  }

}

