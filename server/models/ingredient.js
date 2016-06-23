const db = require('../db/schema');
// don't need to assign the following two requires to variables
require('./user');
require('./recipe');

const Ingredient = db.Model.extend({
  tableName: 'ingredients',

  initialize: () => {
    this.on('creating');
  },

  user: () => {
    this.belongsToMany('User', 'ingredient_user', 'ingredient_id', 'user_id');
  },

  recipe: () => {
    this.belongsToMany('Recipe');
  },
});

module.exports = db.model('Ingredient', Ingredient);
