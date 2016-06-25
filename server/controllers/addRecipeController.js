// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
const Ingredient = require('../models/ingredient.js');
const Ingredients = require('../collections/ingredients.js');
const Recipes = require('../collections/recipes.js'); // more conveinet to create w/ colleciton
const Recipe = require('../models/recipe.js');
const Ingredients_Recipes = require('../collections/ingredients_recipes.js');
// const User = require('../models/user.js');


module.exports = {
  addRecipe: function (req, res) {
    const user = 'e@mail.com'; // req.body.email;
    const newRecipeTitle = req.body.recipeTitle;
    const newRecipeUrl = req.body.recipeUrl;
    const newRecipeImgUrl = req.body.recipeImgUrl;
    let ingredientsList = req.body.recipeIngredients; // will need to parse this and account for plurals
    let recipeId, ingredientId, currIngredient;

    // split `ingredients` in to array, then for each element, trim
    ingredients = ingredientsList.split(',');
    ingredientsArr = ingredients.map( function(ingredient) {
      return ingredient.trim();
    });

    // check if recipe already exists
    // console.log(Recipes.query('where', 'recipeUrl', '=', 'u4'));

    // need save to recipe, then ingredients, then update join table
    // Recipe
    Recipe.where({recipeUrl: newRecipeUrl}).fetch()
      .then(function(foundRecipe) {
        console.log(foundRecipe);
        if (foundRecipe) {
          foundRecipeId = foundRecipe.attributes.id
          // fave for user
          new Recipe({id: foundRecipeId}).save({favorited: 1})
          // .then(function(savedModel) {
          //   res.status(200).send(savedModel);
          // });
        } else {
          // do everything below...
          Recipes.create({ // use `Recipes` collection as convenience method
            recipeTitle: newRecipeTitle,
            recipeUrl: newRecipeUrl,
            recipeImgUrl: newRecipeImgUrl,
            favorited: true
          }) // returns the model that was just created
          .then(function (recipeModel) {
            recipeId = recipeModel.attributes.id;

            // add associations
            ingredientsArr.forEach(function(ing) { 
              Ingredient.where({ingredient: ing}).fetch()
                .then(function(foundModel) {
                  if (foundModel) {
                    console.log('Model found. Extracting id...')
                    ingredientId = foundModel.attributes.id;
                    // HELPER: insert in to join table
                    Ingredients_Recipes.create({
                      ingredient_id: ingredientId,
                      recipe_id: recipeId
                    }).then(function (ingredient_recipe) {
                      console.log('SENDING INGREDIENT_RECIPE:', ingredient_recipe);
                      res.status(200).end();
                    }).catch(function (error) {
                      console.log(error);
                    })
                  } else { // otherwise, create it
                    console.log('Ingredient does not exist. Creating ingredient...');
                    Ingredients.create({
                        ingredient: ing
                    }) // returns newly created model (see following)
                    .then(function (ingredientModel) { // update join table w/ recipeId
                      ingredientId = ingredientModel.attributes.id;
                      // HELPER: insert in to join table
                      Ingredients_Recipes.create({ // won't have unique conflicts b/c will have been caught above
                        ingredient_id: ingredientId,
                        recipe_id: recipeId
                      }).then(function (ingredient_recipe) {
                        console.log('SENDING INGREDIENT_RECIPE:', ingredient_recipe);
                        res.status(200).end();
                      }).catch(function (error) {
                        console.log(error);
                      })
                    })
                    .catch(function(err) {
                      console.log(err);
                    })
                  } 
                })
                .catch(function(err) {
                  console.log(err);
                });
            })
          })      
          .catch(function (err) { // if already exists, favorite it (needs recipes_users join table)
            console.log('Recipe already exists in database, but we have added it to your favorited recipes'); 
          });
        }
      })
  }
}
  