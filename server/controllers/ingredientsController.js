// import { Ingredient } from '../models/ingredient';
// import { Ingredients } from '../collections/ingredients';
// const IngredientModel = require('../models/ingredient.js');
// const IngredientsCollection = require('../collections/ingredients.js');
// const Ingredient_UserCollection = require('../collections/ingredient_user.js');
// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID

module.exports = {
  updateIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    const userID = req.body.userID;
    console.log('ingredients controller!!!!', ingredients, userID);
    res.send('POST to /api/ingredients, this is ingredients');
  },
  getIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    console.log('GET: ', ingredients);
    res.send('get to /api/updateingredients, this is ingredients');
  },
};


// // check if ingredient list already exists
// User.where({ recipeUrl: newRecipeUrl }).fetch()
//   .then((foundRecipe) => {
//     console.log(foundRecipe);
//     // if so, then take it's id
//     if (foundRecipe) {
//       const foundRecipeId = foundRecipe.attributes.id;

//       // favorite it for the user
//       Recipes_Users.create({
//         user_id: userId,
//         recipe_id: foundRecipeId,
//       }).then(() => {
//         res.status(200).end();
//       });
//     } else { // if doesn't exist, then we need to create it
//       Recipes.create({ // will return the model that was just created
//         recipeTitle: newRecipeTitle,
//         recipeUrl: newRecipeUrl,
//         recipeImgUrl: newRecipeImgUrl,
//       }).then((recipeModel) => {
//         recipeId = recipeModel.attributes.id; // to be used later

//         // Then we need to favorite it for them again
//         Recipes_Users.create({
//           user_id: userId,
//           recipe_id: recipeId,
//         });

//         return recipeId;
//       }).then((recId) => {
//         console.log('>>>> Just in case, can you see the recId?:', recId);

//         // Iterate through ingredients to [create new ingredient and] add to join tables
//         ingredientsArr.forEach((ing) => {
//           // Check if ingredient exists
//           Ingredient.where({ ingredient: ing }).fetch()
//             .then((foundModel) => {
//               if (foundModel) {  // If so, extract the id, so that can save to join table below
//                 console.log('Model found. Extracting id...');
//                 ingredientId = foundModel.attributes.id;
//                 // TODO: Clean up by adding helper function for inserting in to join table
//                 Ingredients_Recipes.create({
//                   ingredient_id: ingredientId,
//                   recipe_id: recId,
//                 }).then((ingredient_recipe) => {
//                   console.log('SENDING INGREDIENT_RECIPE:', ingredient_recipe);
//                   res.status(200).end();
//                 }).catch((error) => {
//                   console.log(error);
//                 });
//               } else { // Otherwise, we need to add the ingredient to our table of ingredients
//                 console.log('Ingredient does not exist. Creating ingredient...');
//                 Ingredients.create({
//                   ingredient: ing,
//                 }) // returns newly created model (see following)
//                 .then((ingredientModel) => { // similarly, update join table w/ recipeId
  //                 console.log('>>>>>> RECIPEID:', recipeId, 'OR IS IT....', recId);
  //                 ingredientId = ingredientModel.attributes.id;
  //                 // TODO: Clean up by adding helper function for inserting in to join table
  //                 Ingredients_Recipes.create({
  //                   ingredient_id: ingredientId,
  //                   recipe_id: recipeId,
  //                 }).then((ingredient_recipe) => {
  //                   console.log('SENDING INGREDIENT_RECIPE:', ingredient_recipe);
  //                   res.status(200).end();
  //                 }).catch((error) => {
  //                   console.log(error);
  //                 });
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //               });
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // });
