// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');
const Recipe_User = require('../models/recipe_user.js');
const Ingredients = require('../collections/ingredients.js');
const Recipes = require('../collections/recipes.js'); // more conveinet to create w/ colleciton
const Ingredients_Recipes = require('../collections/ingredients_recipes.js');
const Ingredients_Users = require('../collections/ingredients_users.js');
const Recipes_Users = require('../collections/ingredients_users.js');
// const User = require('../models/user.js');


module.exports = {
  addRecipe: function (req, res) {
    const user = 'e@mail.com'; // req.body.email or req.body.id
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

    // check if recipe already exists
    Recipe.where({recipeUrl: newRecipeUrl}).fetch()
      .then(function(foundRecipe) {
        console.log(foundRecipe);
        // if so, then take it's id 
        if (foundRecipe) { 
          foundRecipeId = foundRecipe.attributes.id

          // favorite it for the user
          Recipes_Users.create({
            user_id: user,
            recipe_id: foundRecipeId
          }).then(function (ingredient_user) {
            res.status(200).end();
          });
        } else { // if doesn't exist, then we need to create it
          Recipes.create({ // will return the model that was just created
            recipeTitle: newRecipeTitle,
            recipeUrl: newRecipeUrl,
            recipeImgUrl: newRecipeImgUrl
          }).then(function (recipeModel) {
            recipeId = recipeModel.attributes.id; // to be used later

            // Then we need to favorite it for them again
            Recipes_Users.create({
              user_id: user,
              recipe_id: foundRecipeId
            })

            return recipeId;
          }).then(function(recipeId) {
            console.log('Just in case, can you see the recipeID?:', recipeId);

            // loop through ingredients to [create new ingredient and] add to join tables
            ingredientsArr.forEach(function(ing) { 
              Ingredient.where({ingredient: ing}).fetch()
                .then(function(foundModel) {
                  if (foundModel) {
                    console.log('Model found. Extracting id...')
                    ingredientId = foundModel.attributes.id;
                    // TODO: Clean up by adding helper function for inserting in to join table
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
                    // TODO: Clean up by adding helper function for inserting in to join table
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
          .catch(function (err) {
            console.log(err);
          });
        }
      })
  }
}
  