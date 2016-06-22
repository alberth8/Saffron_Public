const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user.js');
const config = require('../config/authConfig.js');
const bcrypt = require('bcrypt-nodejs');

const localLogin = new LocalStrategy( {
	usernameField: 'email'
 }, function(email, password, done) {
 	User.where({ 'email': email}).fetch().then(function(user) {
 		if(!user) { return done(false) };
 		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
 			if(err) { return err; }

 			return done(true);
 		})
 	})
})

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
