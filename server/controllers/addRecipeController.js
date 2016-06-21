// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
import { Ingredient } from '../models/ingredient.js';
import { Ingredient } from '../models/ingredient.js';
const Recipes = require('../colleciton/recipe.js'); // more conveinet to create w/ colleciton
const User = require('../models/user.js');

export default {
  addRecipe: function (req, res) {
    let user = req.body.email;
    let newRecipeTitle = req.body.recipeTitle;
    let newRecipeUrl = req.body.recipeUrl;
    let newRecipeImgUrl = req.body.recipeImgUrl;
    let ingredients = req.body.ingredients; // will need to parse this and account for plurals

    // need save to recipe
    // then save to ingredients
    User.forge({email: user}).fetch() // find and obtain specified user
      .then( (foundUser) => {
        console.log(foundUser);
        Recipes.create({
          recipeTitle: newRecipeTitle,
          recipeUrl: newRecipeUrl,
          recipeImgUrl: newRecipeImgUrl
        })
        .then( (newRecipe) => {
          Ingredient.forge().fetch()
            .then( () => {
              ingredients.forEach((ing) => {
                Ingredients.create({
                  ingredient: ing
                })
              })
            })
            .then(function() {
              res.send(newRecipe);
            })
        });
      })
      // .then( () => {
      //   res.status(200).send(newRecipe)
      // });
  } // equivalent to instantiating model w/ attributes, saving model to db, then adding to colleciton
}
