const authController = require('../controllers/authController.js');
const passportService = require('../controllers/passportController.js');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
console.log('here');
module.exports = function (app) {
	app.get('/signup', requireAuth, function(req, res) {
		res.send({ hey:'hello' })
	})
	app.post('api/createUser', authController.createUser);
	app.post('/login', requireSignin, authController.login);
}
