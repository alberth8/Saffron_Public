const db = require('../db/schema');
// don't need to assign the following two requires to variables
require('./user');
require('./recipe');

const Ingredient = db.Model.extend({
  tableName: 'ingredients',

  user: () => {
    this.belongsToMany('User');
  },

  recipe: () => {
    this.belongsToMany('Recipe');
  }
});

module.exports = db.model('Ingredient', Ingredient);  