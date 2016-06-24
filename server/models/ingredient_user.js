const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
const User = require('./user');
// require('./user');
const Ingredient = require('./ingredient');
// require('./ingredient');

const Ingredient_User = db.Model.extend({
  tableName: 'ingredients_users',

  user: function () {
    return this.belongsTo(User);
  },

  ingredient: function() {
    return this.belongsTo(Ingredient);
  }
});

module.exports = Ingredient_User;
// module.exports = db.model('Recipe', Recipe);
