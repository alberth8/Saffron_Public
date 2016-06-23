// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
const Ingredient = require('../models/ingredient.js');
const Ingredients = require('../collections/ingredients.js');
const Recipes = require('../collections/recipes.js'); // more conveinet to create w/ colleciton
const User = require('../models/user.js');

module.exports = {
  addRecipe: function (req, res) {
    // const user = req.body.email;
    const user = 'e@mail.com'
    const newRecipeTitle = req.body.recipeTitle;
    const newRecipeUrl = req.body.recipeUrl;
    const newRecipeImgUrl = req.body.recipeImgUrl;
    let ingredientsList = req.body.recipeIngredients; // will need to parse this and account for plurals
    let recipeId, ingredientId;

    // split `ingredients` in to array, then for each element, trim
    ingredients = ingredientsList.split(',');
    ingredientsArr = ingredients.map( (ingredient) => (
        ingredient.trim()
      )
    );
    console.log('DID IT MAP?', ingredientsArr);

    // need save to recipe
    // then save to ingredients
    // then update join table
    Recipes.create({ // use `Recipes` collection as convenience method
      recipeTitle: newRecipeTitle,
      recipeUrl: newRecipeUrl,
      recipeImgUrl: newRecipeImgUrl,
      favorited: true
    }) // returns a promise resolving with new model
    .then((recipeModel) => {
      recipeId = recipeModel.attributes.id
      console.log('RECIPEID:', recipeId);

      ingredientsArr.forEach((ing) => { // `ings` is an array
        Ingredients.create({
          ingredient: ing
        }) // returns newly created model (see following)
        .then( (ingredientModel) => { // update join table w/ recipeId
          const that = this;
          console.log('THAT#1', that);
          console.log('Ingredient Model:', ingredientModel);
          ingredientId = ingredientModel.attributes.id;
          console.log('CAN U SEE ME?', recipeModel);
          return {
            target: ingredientModel,
            model: recipeModel
          }
        })
        .then( (targetModelObj) => {
          // console.log('WHAT???', targetModelObj);
          // console.log('---------------');
          // console.log(this);
          // console.log('---------------');
          console.log(targetModelObj.model.ingredient.toString());
          console.log('THAT', that);
          console.log(targetModelObj.model.ingredient.call(targetModelObj.model));
          // return targetModelObj.model.ingredient.call(targetModelObj.model)
          //   .attach(targetModelObj.target);
        })
        .then( (whoknows) => {console.log('WHOKNOWS', whoknows)})
                    // ingredientModel.user();
            // .attach(User)
            // .then( (relation) => {console.log('WTF???', relation)})
      })
    })
  } // end addRecipe function 
    // .then( () = {

    // }) // save 

    // User.forge({email: user}).fetch() // find and obtain specified user
    //   .then( (foundUser) => {
    //     console.log(foundUser);
        
    //   .then( (newRecipe) => {
    //       console.log('NEWRECIPE??', newRecipe)
    //       Ingredient.forge().fetch()
    //         .then( () => {
    //           ingredients.forEach((ingredient) => { // `ingredients` is an array
    //             Ingredients.create({
    //               ingredient: ingredient
    //             })
    //           })
    //         }).then(function() {
    //           res.send(newTrip);
    //         })
    //       })
    //     })
    //   } // end addRecipeFunction
    // //         .then(function() {
    //           res.send(newRecipe);
    //         })
    //     });
    //   })
    //   .then( () => {
    //     res.status(200).send(newRecipe)
    //   });
  // } // equivalent to instantiating model w/ attributes, saving model to db, then adding to colleciton
} // end module exports