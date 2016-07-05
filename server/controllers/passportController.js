const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user.js');
const config = require('../config/authConfig.js');
const bcrypt = require('bcrypt-nodejs');

// enables Auth on main website
const localOption = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOption, (email, password, done) => {
	User.where('email', email).fetch().then((user) => {
	 user.comparePassword(password, (isMatch) => {
		if (!isMatch) {
			return done(null, false); 
		}
			return done(null, true);
		});
	}).catch((err) => {
		console.error(err);
	})
});
// enables cross domain Auth with token 
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {	
	User.where('id', payload.sub).fetch().then((user) => {
		if (user) {
			done(user);
		} else {
			done(false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);