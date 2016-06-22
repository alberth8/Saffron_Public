const jwt = require('jwt-simple'); 
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
const User = require('../collections/users.js');
const config = require('../config/authConfig.js');

//function to create token for user 
function token(user) {
	const timestamp = new Date().getTime();
	return jtw.encode({ 
		sub: user.id, 
		iat: timestamp
	}, config.secret);
}


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
    	} else {
    		res.status(404).send({error: 'Email already exists'})
    	}
      }).then(function(newUser) {
    	res.status(201).send({ token: token(newUser)});
    })
    .catch(function(err) {
    	console.log(err);
    });
  },

  login: function (req, res) {
  	res.send({ token: token(req.user) });
  }

}

