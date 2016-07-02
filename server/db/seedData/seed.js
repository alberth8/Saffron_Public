const IngredientModel = require('../../models/ingredient.js');
const IngredientsCollection = require('../../collections/ingredients.js');
const RecipeModel = require('../../models/recipe.js');
const RecipeCollection = require('../../collections/recipes.js');
const IngRecCollection = require('../../collections/ingredients_recipes.js');
const IngRecModel = require('../../models/ingredient_recipe.js');

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
        console.log('Ingredient found, extracting id...');
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
  RecipeModel.where({ recipeTitle: recipeObject.title }).fetch()
  .then((foundModel) => { // if the recipe is found, send back it's ID
    if (foundModel) {
      console.log('Recipe found...');
      recipeId = foundModel.attributes.id;
      callback(recipeId);
    } else { // if the recipe isn't found, save it, then return the ID
      RecipeCollection.create({
        recipeTitle: recipeObject.title,
        recipeUrl: recipeObject.url,
        recipeImgUrl: recipeObject.imgUrl,
      })
      .then((model) => {
        console.log('Recipe added...');
        recipeId = model.attributes.id;
        callback(recipeId);
      });
    }
  });
};

const saveToRecipeIngredients = (recipe_id, ingredientIdArray, callback) => {
  async.each(ingredientIdArray, (ingredient_id, cb) => {
    IngRecModel.where({ recipe_id, ingredient_id }).fetch()
    .then((foundRecipe) => {
      if (foundRecipe) {
        console.log('Ingredient_Recipe found skipping save...');
      } else {
        IngRecCollection.create({
          ingredient_id,
          recipe_id,
        })
        .then((model) => {
          cb(model);
        })
        .catch((e) => { console.log(e); });
      }
    })
    .catch((e) => { console.log(e); });
  }, () => { callback(); });
};

module.exports = {
  seedDatabase: () => {
    async.each(data, (recipe, cb) => {
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

module.exports.seedDatabase();
