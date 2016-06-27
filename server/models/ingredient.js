const db = require('../db/schema');
// don't need to assign the following two requires to variables
const Ingredient_User = require('./ingredient_user');
const Ingredient_Recipe = require('./ingredient_recipe');

const Ingredient = db.Model.extend({
  tableName: 'ingredients',

  ingredient_user: () => {
    this.hasMany(Ingredient_User);
  },

  ingredient_recipe: () => {
    this.hasMany(Ingredient_Recipe);
  },
});

module.exports = Ingredient;
// module.exports = db.model('Ingredient', Ingredient);
