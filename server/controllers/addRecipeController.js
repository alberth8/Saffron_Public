// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
const Ingredient = require('../models/ingredient.js');
const Ingredients = require('../colleciton/ingredients.js');
const Recipes = require('../colleciton/recipe.js'); // more conveinet to create w/ colleciton
const User = require('../models/user.js');

module.exports = {
  addRecipe: function (req, res) {
    const user = req.body.email;
    const newRecipeTitle = req.body.recipeTitle;
    const newRecipeUrl = req.body.recipeUrl;
    const newRecipeImgUrl = req.body.recipeImgUrl;
    const ingredients = req.body.ingredients; // will need to parse this and account for plurals

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
