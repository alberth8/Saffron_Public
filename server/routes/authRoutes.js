const authController = require('../controllers/authController.js');
const passportService = require('../controllers/passportController.js');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
console.log('here');
	app.get('/signup', requireAuth, function(req, res) {
		res.send({ hey:'hello' })
	})
	app.post('/api/signup', authController.signup);
	app.post('/login', requireSignin, authController.login);
}
