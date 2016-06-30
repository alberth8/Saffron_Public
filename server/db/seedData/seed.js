const IngredientModel = require('../models/ingredient.js');
const IngredientsCollection = require('../collections/ingredients.js');
const RecipeModel = require('../models/recipe.js');
const RecipeCollection = require('../collections/recipes.js');
const IngRecCollection = require('../collection/ingredients_recipes.js');

const async = require('async');
const data = require('./seed.json');
// takes an array of text ingredients, saves or finds them,
// returns an array of ingredient ids
const findOrSaveIngredient = (ingredientArray, callback) => {
  const ingredientIdArray = [];
  async.each(ingredientArray, (ing, cb) => {
    IngredientModel.where({ ingredient: ing }).fetch()
    .then((foundModel) => {
      if (foundModel) {
        console.log('Model Found, extracting id...');
        ingredientIdArray.push(foundModel.attributes.id);
      } else { // if ingredient not in database,
        IngredientsCollection.create({ ingredient: ing })
          .then((model) => {
            console.log('Ingredient added...');
            ingredientIdArray.push(model.attributes.id);
          })
          .catch((e) => { console.log(e); });
      }
      cb(null);
    })
    .catch((e) => { console.log(e); });
  }, () => { callback(ingredientIdArray); });
};

// takes a recipe object, checks whether its in the databse
// saves recipe and/or returns a recipe ID to a callback
const findOrSaveRecipe = (recipeObject, callback) => {
  let recipeId;
  RecipeModel.where({ title: recipeObject.title }).fetch()
  .then((foundModel) => { // if the recipe is found, send back it's ID
    if (foundModel) {
      recipeId = foundModel.attributes.recipe_id;
      callback(recipeId);
    } else { // if the recipe isn't found, save it, then return the ID
      RecipeCollection.create({
        title: recipeObject.title,
        url: recipeObject.url,
        imgURL: recipeObject.imgURL,
      })
      .then((model) => {
        console.log('Recipe added...');
        recipeId = model.attributes.recipe_id;
        callback(recipeId);
      });
    }
  });
};

const saveToRecipeIngredients = (recipe_id, ingredientIdArray, callback) => {
  async.each(ingredientIdArray, (ingredient_id, cb) => {
    IngRecCollection.create({
      ingredient_id,
      recipe_id,
    })
    .then((model) => {
      cb(model);
    });
  }, () => { callback(); });
};

module.exports = {
  updateIngredients: (dataJSON) => {
    async.each(dataJSON, (recipe, cb) => {
      findOrSaveIngredient(recipe.ingredients, (ingredientIdArray) => {
        findOrSaveRecipe(recipe, (recipe_id) => {
          saveToRecipeIngredients(recipe_id, ingredientIdArray, () => {
            cb(null);
          });
        });
      });
    });
  },
};
