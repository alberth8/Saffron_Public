const Recipe = require('../models/recipe.js');
const RecipesUsers = require('../models/recipe_user.js');
const async = require('async');
// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID

// Shows the recipes which contain all
// Note: filtering (re-sorting) should be done with redux store
module.exports = {
  saveFav: function (req, res) {
    const favedRescipe = {
      recipe_id: req.body.recipeId,
      user_id: req.body.user,
      recipeTitle: req.body.recipe,
    };
    console.log(favedRescipe);
    new RecipesUsers(favedRescipe).save();
    res.status(200).send();
  },
  // gets the users favorite recipes and sends them to client
  getFavs: function (req, res) {
    let results = [];
    let i = 0;
    const userId = req.body.user;
    RecipesUsers.where('user_id', userId).fetchAll().then((favs) => {
      favs.models.forEach((favRecipe) => {
        Recipe.where('id', favRecipe.attributes.recipe_id).fetch().then((recipeInfo) => {
          results.push(recipeInfo.attributes);
          i++;
          if (i === favs.length) {
            res.status(200).send(results);
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },
  // gets the recipe details based on what is returned from recommendation engine
  getRecipeInfo: (req, res) => {
    const recipes = [
      req.body.first,
      req.body.second,
      req.body.third,
      req.body.fourth,
    ];
    let results = [];
    async.each(recipes, (rescipe, cb) => {
      Recipe.where('recipeTitle', rescipe).fetch().then((recipeObj) => {
        if (recipeObj) {
          results.push(recipeObj.attributes);
        }
        cb();
      });
    }, () => { res.status(200).send(results); });
  },


};
