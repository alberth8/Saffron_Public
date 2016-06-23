const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user.js');
const config = require('../config/authConfig.js');
const bcrypt = require('bcrypt-nodejs');

const localOption = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOption, function(email, password, done) {
	User.where('email', email).fetch().then(function(user) {
	  user.comparePassword(password, function(isMatch) {
		  if(!isMatch) { return done(null, false); }
		  return done(null, true);
	  });
	}).catch(function(err){
		console.error(err);
	})
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {	
	User.where('id', payload.sub).fetch().then(function(user) {
		if (user) {
			done(user);
		} else {
			done(false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);