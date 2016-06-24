const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
const Recipe = require('./recipe');
// require('./user');
const User = require('./user');
// require('./ingredient');

const Recipe_User = db.Model.extend({
  tableName: 'recipes_users',

  recipe: function () {
    return this.belongsTo(Recipe);
  },

  user: function() {
      return this.belongsTo(User);
  }
});

module.exports = Recipe_User;
// module.exports = db.model('Recipe', Recipe);
