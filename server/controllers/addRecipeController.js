const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');
const Ingredients = require('../collections/ingredients.js');
const Recipes = require('../collections/recipes.js'); // more conveinet to create w/ colleciton
const Ingredients_Recipes = require('../collections/ingredients_recipes.js');
const Recipes_Users = require('../collections/recipes_users.js');


// To avoid shadowing, renamed ingredientId, recipeId, res
const createIngRec = (iId, rId, r) => {
  Ingredients_Recipes.create({
    ingredient_id: iId,
    recipe_id: rId,
  }).then((ingredient_recipe) => {
    console.log(ingredient_recipe);
    r.status(200).end();
  }).catch((error) => {
    console.log(error);
  });
};

module.exports = {
  addRecipe: (req, res) => {
    const userId = 1; // req.body.id
    const newRecipeTitle = req.body.recipeTitle;
    const newRecipeUrl = req.body.recipeUrl;
    const newRecipeImgUrl = req.body.recipeImgUrl;
    const ingredientsList = req.body.recipeIngredients; // TODO: account for plurals
    let recipeId;
    let ingredientId;

    // Split `ingredients` in to array, then for each element, trim
    const ingredients = ingredientsList.split(',');
    const ingredientsArr = ingredients.map((ingredient) => ingredient.trim());

    // Check if recipe already exists
    Recipe.where({ recipeUrl: newRecipeUrl }).fetch()
      .then((foundRecipe) => {
        // If so, then take it's id
        if (foundRecipe) {
          const foundRecipeId = foundRecipe.attributes.id;

          // favorite it for the user
          Recipes_Users.create({
            user_id: userId,
            recipe_id: foundRecipeId,
            recipeTitle: newRecipeTitle,
          }).then(() => {
            res.status(200).end();
          });
        } else { // If doesn't exist, then we need to create it
          Recipes.create({ // will return the model that was just created
            recipeTitle: newRecipeTitle,
            recipeUrl: newRecipeUrl,
            recipeImgUrl: newRecipeImgUrl,
          }).then((recipeModel) => {
            recipeId = recipeModel.attributes.id; // to be used later

            // Then we need to favorite it for them again
            Recipes_Users.create({
              user_id: userId,
              recipe_id: recipeId,
              recipeTitle: newRecipeTitle,
            });

            return recipeId;
          }).then((recId) => {
            // Iterate through ingredients to [create new ingredient and] add to join tables
            ingredientsArr.forEach((ing) => {
              // Check if ingredient exists
              Ingredient.where({ ingredient: ing }).fetch()
                .then((foundModel) => {
                  if (foundModel) {  // If so, extract the id, so that can save to join table
                    ingredientId = foundModel.attributes.id;

                    // Create entry in join table ingredients_recipes
                    createIngRec(ingredientId, recId, res);
                  } else { // Otherwise, we need to add the ingredient to our table of ingredients
                    console.log('Ingredient does not exist. Creating ingredient...');
                    Ingredients.create({
                      ingredient: ing,
                    }) // Returns newly created model (see following)
                    .then((ingredientModel) => { // similarly, update join table w/ recipeId
                      ingredientId = ingredientModel.attributes.id;

                      // Create entry in join table ingredients_recipes
                      createIngRec(ingredientId, recId, res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
  },
};
