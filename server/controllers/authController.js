const jwt = require('jwt-simple');
const User = require('../models/user.js');
const config = require('../config/authConfig.js');

// function to create token for user
function token(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

// checks to see if user already exists. If not then creates a new user
module.exports = {
  signup: (req, res) => {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    if (!userInfo.email || !userInfo.password) { // if user or password field is empty send back error
      return res.status(422).send({ error: 'You must provide email and password' });
    }
    User.where('email', userInfo.email).fetch().then((user) => {
      if (!user) { // if user does not exist then create new user
        return new User(userInfo).save();
      }
      return res.send({ error: 'Email already has a account' });
    })
    .then((newUser) => {
      res.json({ // sends a token to user after creating new user 
        token: token(newUser.attributes),
        userId: newUser.id,
        email: newUser.email,
      });
    })
    .catch((err) => {
      console.error(err);
    });
    return null;
  },

  // after passportController verifys user sends a token to user
  login: (req, res) => {
    res.send({ token: token(req.user) });
  },

  // fetchs user id to be used in other requests
  userInfo: (req, res) => {
    const email = req.body.email;
    User.where('email', email).fetch().then((user) => {
      res.status(200).send({
        userId: user.attributes.id,
        userEmail: email,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },
};
