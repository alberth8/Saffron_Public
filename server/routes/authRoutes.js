const authController = require('../controllers/authController.js');

module.exports = function (app) {

	app.post('api/createUser', authController.createUser);
	
}
