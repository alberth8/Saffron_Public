// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID
const Ingredient = require('../models/ingredient.js');
const Ingredients = require('../collections/ingredients.js');
const Recipes = require('../collections/recipes.js'); // more conveinet to create w/ colleciton
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
    Recipes.create({ // use `Recipes` collection as convenience method
      recipeTitle: newRecipeTitle,
      recipeUrl: newRecipeUrl,
      recipeImgUrl: newRecipeImgUrl,
      favorited: true
    }) // returns the model that was just created
    .then(function (recipeModel) {

      recipeId = recipeModel.attributes.id;

      // add associations
      // the issue is with forEach
      ingredientsArr.forEach(function(ing) { // (*)
        currIngredient = ing;
        Ingredients.create({
          ingredient: currIngredient
        }) // returns newly created model (see following)
        .then( function (ingredientModel) { // update join table w/ recipeId
          // console.log('Ingredient Model:', ingredientModel);
          ingredientId = ingredientModel.attributes.id;
          Ingredients_Recipes.create({ // won't have unique conflicts b/c will have been caught above
            ingredient_id: ingredientId,
            recipe_id: recipeId
          })
        })
        .catch(function (error) { // if ingredient already exists, grab id so that can still associate
          console.log('An ingredient in this recipe already exists');

          foo(function(result) {

          });

          // find id of the duplicate ingredient
          // use promise.all here

          Ingredients.query('where', 'ingredient', '=', ing)

          //     .fetch()
          //     .then( function(resp) {
          //     console.log(resp.models[0].id);
          //     console.log('ASYNC????/');
          //   })
          //   .catch( function(err) {
          //     console.log(err);
          //   });
          

          //   resolve
          // });
          // Promise.all([qry])
          // // obtain the id to make the entry in ingredients recipes

        });
      })
    })
    .catch(function (err) { // if already exists, favorite it (needs recipes_users join table)
      console.log('Recipe already exists in database, but we have added it to your favorited recipes'); 
    });
    // .then( function (recipeModel) {
    //   recipeId = recipeModel.attributes.id;
    //   // console.log('EXISTS?:', Recipes.fetch({id: recipeId}));

    //   // if (!(  recipeModel({id: recipeId}).fetch())) {
    //   //   console.log('HALLLAAALUUUUYAAHHHH:::: EXISTS ALREADY');
    //   // }

    //   // console.log('-------------------');
    //   // console.log(recipeModel.isNew())
    //   // console.log('-------------------');

      // ingredientsArr.forEach(function(ing) {
      //   if (recipeModel.isNew())
      //   Ingredients.create({
      //     ingredient: ing
      //   }) // returns newly created model (see following)
      //   .then( function (ingredientModel) { // update join table w/ recipeId
      //     console.log('Ingredient Model:', ingredientModel);
      //     // POTENTIAL ERROR HERE WITH ASYNC
      //     ingredientId = ingredientModel.attributes.id;
      //     Ingredients_Recipes.create({
      //       ingredient_id: ingredientId,
      //       recipe_id: recipeId
      //     })
      //   })
      // })
    // }).catch(function(error) {
    //   console.log('ERROR: ', error);
    // })
  }
}

        //   ingredientId = ingredientModel.attributes.id;
        //   return {
        //     target: ingredientModel,
        //     model: recipeModel // is visible from this scope
        //   }
        // })
        // .then( function(targetModelObj) {
        //   console.log('WHAT???', targetModelObj);
        //   // console.log('---------------');
        //   // console.log(this);
        //   // console.log('---------------');
        //   // console.log(targetModelObj.model.ingredient.toString());
        //   console.log('----->>>', targetModelObj.model.ingredient().attach(targetModelObj.target));
        //   return targetModelObj.model.ingredient().attach(targetModelObj.target);
        // })
        // .then( function (whoknows) {console.log('WHOKNOWS', whoknows)})
        // .catch(function(e) {
        //   console.log(e);
        // });
          // ingredientModel.user();
          // .attach(User)
          // .then( (relation) => {console.log('WTF???', relation)})
    //   })
    // })
  // }) // end addRecipe function 
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
// } // end module exports