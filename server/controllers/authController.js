const User = require('../models/user.js');
const Promise = require('bluebird');
// for auth:
// const bcrypt = require('bcrypt-nodejs');


// TODO: will complete when OAuth is implemented

export default {
  createUser: function (req, res) {
    let userInfo = {
      email: req.body.username,
      password: req.body.password
    }
  },

  findUser: function (req, res) {
  }
}

