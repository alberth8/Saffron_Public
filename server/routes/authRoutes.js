const authController = require('../controllers/authController.js');
const passportService = require('../controllers/passportController.js');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false});

module.exports = function (app) {
	app.get('/profile', function() {
		res.send
	})
	app.post('api/createUser', authController.createUser);

}
