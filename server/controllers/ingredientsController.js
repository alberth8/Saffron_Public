const IngredientModel = require('../models/ingredient.js');
const IngredientUserModel = require('../models/ingredient_user.js');
const IngredientsCollection = require('../collections/ingredients.js');
const IngredientUserCollection = require('../collections/ingredients_users.js');
const IngredientsRecipesCollection = require('../collections/ingredients_recipes.js');
const RecipesCollection = require('../collections/recipes.js');
const RecipeModel = require('../models/recipe.js');
const db = require('../db/schema.js');

const _ = require('lodash');
const async = require('async');

// function finds max setID in ingredients_users table
// returns value in callback
const findMaxSavedIngredientID = (callback) => {
  db.knex('ingredients_users').max('set_id as max')
  .then((max) => callback(max[0].max + 1));
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
  if (user_id === undefined) {
    callback();
  } else {
    IngredientUserModel.where({ user_id }).fetchAll()
      .then((m) => { // find all entries in the user ingredient table that match our user ID
        async.each(m.models, (a, cb) => {
          ma.push(a.attributes); // push each row into an array
          cb(null);
        }, (() => {
          ma = _.groupBy(ma, 'set_id'); // regroup the arrays by set id
          // these are similar to ingredient list in recipes
          let uniqueTest = true;
          _.forEach(ma, (b) => { // the rows of this table are still in objects
            const f = [];        // so we'll loop over them
            for (const row of b) {
              if (row.ingredient_id) {
                f.push(row.ingredient_id); // then push the ingredients into their own sub arrays
              }
            }
            if (_.isEqual(f, ingredientIdArray)) { // test for arrays equality with any other
              uniqueTest = false;                  // previously saved ingredients
              console.log('Ingredient array already saved in user ingredient table');
              callback();
            }
          });
          if (uniqueTest) { // if the ingredient set is unique, save to the database
            async.each(ingredientIdArray, (ing, cb) => {
              console.log('Saving ingredient_user....', ing, set_id);
              IngredientUserCollection.create({
                ingredient_id: ing,
                user_id,
                set_id,
              });
              cb(null);
            }, () => { callback(); });
          }
        })); }
      );
  }
};

// given an array of ingredients, find all the recipes that contain
// those ingredients.  Return an array of recipeIDs to the callback
const getRecipeIds = (ingredientsIdArray, callback) => {
  IngredientsRecipesCollection.query((qb) => {
    qb.whereIn('ingredient_id', ingredientsIdArray);
  }).fetch()
  .then((foundRecipe) => {
    if (foundRecipe) { // if any recipes are found
      const storage = {};
      for (let i = 0; i < foundRecipe.models.length; i++) { // iterate through recipes
        const rId = foundRecipe.models[i].attributes.recipe_id; // keep track of recipe ID
        const iId = foundRecipe.models[i].attributes.ingredient_id; // keep track of ingredient id
        if (storage[rId]) {
          storage[rId].push(iId); // track recipes & ingredients in object
        } else {
          storage[rId] = [iId];
        }
      }
      const recipeIds = [];  // we only want recipes with ALL of our ingredients
      Object.keys(storage).forEach((recipe) => {  // in lieu of a bookshelf count function we'll
        if (storage[recipe].length !== ingredientsIdArray.length) { // filter out all recipes that
          delete storage[recipe];                     // don't have the same number of ingredients
        } else {
          recipeIds.push(recipe);
        }
      });
      callback(recipeIds); // return array of recipe IDs
    } else {
      console.log('no results');
    }
  })
  .catch((err) => {
    console.log(err);
    callback('Error in getting recipe ids');
  });
};

// Given a set of recipes and selected ingredients, what are the most frequently
// used OTHER ingredients?  This function solves for this question.
// get recipes' ingredients, count those ingredients, return the top 10
const getSuggestedIngredients = (recipeIdArray, ingredientIDArray, callback) => {
  IngredientsRecipesCollection.query((qb) => { // find all ingredients given a list of recipes
    qb.whereIn('recipe_id', recipeIdArray);
  }).fetch()
  .then((foundPair) => {
    const storage = { ingredients: [] };
    if (foundPair) { // if we find models, loop through and count
      // ingredient frequency using a storage object
      for (let i = 0; i < foundPair.models.length; i++) {
        const iId = foundPair.models[i].attributes.ingredient_id;
        if (ingredientIDArray.indexOf(iId) < 0) {
          if (storage[iId] === undefined) { // have we seen this ingredient before?
            storage[iId] = {  // if not, save it into our storage array
              name: '',
              count: 1,
            };
            storage.ingredients.push(iId);
          } else {
            storage[iId].count++; // if we've seen this ingredient increment the count
          }
        }
      }
      IngredientsCollection.query((qb) => { // find all ingredients given
        qb.whereIn('id', storage.ingredients); // a list of recipes (storage.ingredients)
      }).fetch()
      .then((ingredients) => {
        const suggestedIngredients = [];
        if (ingredients) {
          // loop through all the ingredients in our returned models
          // use them to search for an ingredient name in our storage object
          for (let i = 0; i < ingredients.models.length; i++) {
            storage[ingredients.models[i].attributes.id].name =
            ingredients.models[i].attributes.ingredient;
            suggestedIngredients.push([ // turn our storage object into a 2-D array
              ingredients.models[i].attributes.ingredient, // that we'll return to client
              storage[ingredients.models[i].attributes.id].count,
            ]);
          }
          suggestedIngredients.sort((a, b) => {
            if (a[1] > b[1]) {
              return -1;
            }
            if (a[1] < b[1]) {
              return 1;
            }
            return 0;
          });
          callback(suggestedIngredients.splice(0, 10));
        }
      })
      .catch((e) => (console.error(e)));
    }
  })
  .catch((e) => (console.error(e)));
};

// given an array of recipe IDs, return all the data associated with them in the
// recipes table.  Return data to callback
const getRecipeData = (recipeIds, callback) => {
  const storage = [];
  if (recipeIds.length === 0) {
    RecipeModel.fetchAll()
      .then((recipes) => {
        for (let i = 0; i < 12; i++) {
          storage.push(recipes.models[i].attributes);
        }
        callback(storage);
      })
      .catch((e) => (console.log(e)));
  } else {
    RecipesCollection.query((q) => {
      q.whereIn('id', recipeIds);
    }).fetch()
    .then((recipes) => {
      for (let i = 0; i < recipes.models.length; i++) {
        storage.push(recipes.models[i].attributes);
      }
      callback(storage);
    })
    .catch((e) => (console.log(e)));
  }
};

module.exports = {
  updateIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    const userId = req.body.userID;
    findMaxSavedIngredientID((maxSetId) => {
      findOrAddIngredient(ingredients, (ingredientIdArray) => {
        findAndGroup(userId, ingredientIdArray, maxSetId, () => {
          getRecipeIds(ingredientIdArray, (recipeIds) => {
            getSuggestedIngredients(recipeIds, ingredientIdArray, (suggestedIngredients) => {
              getRecipeData(recipeIds, (recipeData) => {
                res.status(200).send({
                  recipes: recipeData,
                  suggestedIngredients,
                });
              });
            });
          });
        });
      });
    });
  },
};
