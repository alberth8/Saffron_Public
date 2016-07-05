const authController = require('../controllers/authController.js');
require('../controllers/passportController.js');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/signup', requireAuth, (req, res) => {
    res.send({ hey: 'hello' });
  });
  // signup route
  app.post('/api/signup', authController.signup);
  // login route flows to passport controller to verify
  // then to login route to add token to user
  app.post('/login', requireSignin, authController.login);
  // route to get user id for use in other request
  app.post('/api/userInfo', authController.userInfo);
};
