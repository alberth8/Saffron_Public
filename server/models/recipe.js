const db = require('../db/schema.js');
const RecipeUser = require('./recipe_user');
const Ingredient = require('./ingredient.js');

const Recipe = db.Model.extend({
  tableName: 'recipes',

  recipe_user: () => (
    this.hasMany(RecipeUser)
  ),

  ingredients: () => (
    this.hasMany(Ingredient)
  ),

  insertRecipe: (recipeObject) => {
    console.log(recipeObject);
    return db.transaction(() => (
      new Recipe({
        recipeTitle: recipeObject.title,
        recipeUrl: recipeObject.url,
        recipeImgUrl: recipeObject.imgURL,
      })
    ))
    .save();
  },
});

module.exports = Recipe;
