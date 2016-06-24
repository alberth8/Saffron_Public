const db = require('../db/schema.js');
// don't need to assign the following two requires to variables
const Recipe = require('./recipe');
// require('./user');
const Ingredient = require('./ingredient');
// require('./ingredient');

const Ingredient_Recipe = db.Model.extend({
  tableName: 'ingredients_recipes',

  recipe: function () {
    return this.belongsTo(Recipe);
  },

  ingredient: function() {
      return this.belongsTo(Ingredient);
  }
});

module.exports = Ingredient_Recipe;
// module.exports = db.model('Recipe', Recipe);
