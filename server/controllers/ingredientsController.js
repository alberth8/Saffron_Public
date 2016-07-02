// import { Ingredient } from '../models/ingredient';
// import { Ingredients } from '../collections/ingredients';
const IngredientModel = require('../models/ingredient.js');
const Ingredient_UserModel = require('../models/ingredient_user.js');
const IngredientsCollection = require('../collections/ingredients.js');
const Ingredient_UserCollection = require('../collections/ingredients_users.js');
const IngredientsRecipesCollection = require('../collections/ingredients_recipes.js');
const RecipesCollection = require('../collections/recipes.js');

const _ = require('lodash');
const async = require('async');

// this function finds the largest set ID in the user ingredients table
// with a slight change to schema design, we could probably eliminate this
// function
const findMaxSavedIngredientID = (callback) => {
  let maxSetId = 0;
  Ingredient_UserModel.fetchAll()
  .then((foundModels) => {
    async.each(foundModels.models, (iuModel, cb) => {
      maxSetId = Math.max(maxSetId, iuModel.attributes.set_id);
      cb(null);
    }, () => { callback(maxSetId + 1); });
  });
};

// function takes an array of ingredient as strings, and
// returns an array of ingredientIds to the callback
const findOrAddIngredient = (ingredientArray, callback) => {
  const ingredientIdArray = [];
  async.each(ingredientArray, (ing, cb) => {
    IngredientModel.where({ ingredient: ing }).fetch()
    .then((foundModel) => {
      if (foundModel) {  // if ingredient found, push into array
        console.log('Ingredient found, extracting id...');
        ingredientIdArray.push(foundModel.attributes.id);
      } else { // if ingredient not in database,
        IngredientsCollection.create({ ingredient: ing })
          .then((model) => { // push ingredient id into array
            console.log('Ingredient added to database...');
            ingredientIdArray.push(model.attributes.id);
          })
          .catch((e) => { console.log(e); });
      }
      cb(null);
    })
    .catch((e) => { console.log(e); });
  }, () => { callback(ingredientIdArray); });
};

// function takes userID, ingredientID array, and setID
// saves each of the ingredients asynchronously into the
// user ingredients table with the same setId
const findAndGroup = (user_id, ingredientIdArray, set_id, callback) => {
  let ma = [];
  Ingredient_UserModel.where({ user_id }).fetchAll()
    .then((m) => { // find all entries in the user ingredient table that match our user ID
      async.each(m.models, (a, cb) => {
        ma.push(a.attributes); // push each row into an array
        cb(null);
      }, (() => {
        ma = _.groupBy(ma, 'set_id'); // regroup the arrays by set id
        let uniqueTest = true;
        _.forEach(ma, (b) => { // iterate over the sub arrays
          const f = [];
          for (const row of b) {
            if (row.ingredient_id) {
              f.push(row.ingredient_id);
            }
          }
          if (_.isEqual(f, ingredientIdArray)) { // test for array equality
            uniqueTest = false;
            console.log('Ingredient array already saved in user ingredient table');
            callback();
          }
        });
        if (uniqueTest) { // if the ingredient set is unique, save to the database
          async.each(ingredientIdArray, (ing, cb) => {
            console.log('Saving ingredient_user....', ing, set_id);
            Ingredient_UserCollection.create({
              ingredient_id: ing,
              user_id,
              set_id,
            });
            cb(null);
          }, () => { callback(); });
        }
      })); }
    );
};

const getRecipeIds = (ingredientsIdArray, callback) => {
  IngredientsRecipesCollection.query((qb) => {
    qb.whereIn('ingredient_id', ingredientsIdArray);
  }).fetch()
  .then((foundRecipe) => {
    if (foundRecipe) {
      const storage = {};
      for (let i = 0; i < foundRecipe.models.length; i++) {
        const rId = foundRecipe.models[i].attributes.recipe_id;
        const iId = foundRecipe.models[i].attributes.ingredient_id;
        if (storage[rId]) {
          storage[rId].push(iId);
        } else {
          storage[rId] = [iId];
        }
      }
      const recipeIds = [];
      Object.keys(storage).forEach((recipe) => {
        if (storage[recipe].length !== ingredientsIdArray.length) {
          delete storage[recipe];
        } else {
          recipeIds.push(recipe);
        }
      });
      callback(recipeIds);
    } else {
      console.log('no results');
    }
  })
  .catch((err) => {
    console.log(err);
    callback('Error in getting recipe ids');
  });
};

const getRecipeData = (recipeIds, callback) => {
  const storage = [];
  RecipesCollection.query((q) => {
    q.whereIn('id', recipeIds);
  }).fetch()
  .then((recipes) => {
    for (let i = 0; i < recipes.models.length; i++) {
      storage.push(recipes.models[i].attributes);
    }
    callback(storage);
  });
};

module.exports = {
  updateIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    const userId = req.body.userID;
    findMaxSavedIngredientID((maxSetId) => {
      findOrAddIngredient(ingredients, (ingredientIdArray) => {
        findAndGroup(userId, ingredientIdArray, maxSetId, () => {
          getRecipeIds(ingredientIdArray, (recipeIds) => {
            getRecipeData(recipeIds, (recipeData) => {
              console.log(recipeData);
              res.status(200).send({
                recipes: recipeData,
              });
            });
          });
        });
      });
    });
  },
};
