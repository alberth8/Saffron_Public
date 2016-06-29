const Recipe = require('../models/recipe.js');
const RecipesUsers = require('../models/recipe_user.js');
// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID

// Shows the recipes which contain all
// Note: filtering (re-sorting) should be done with redux store
module.exports = {
  saveFav: function (req, res) {
    const userID = req.body.user;
    const recipeUrl = req.body.url;
    Recipe.where('recipeUrl', recipeUrl).fetch().then((rescipe) => {
      const favedRescipe = {
        rescipe_id: rescipe.attributes.id,
        user_id: userID,
      };
      new RecipesUsers(favedRescipe).save();
      res.status(200).send();
    })
    .catch((err) => {
      console.error(err);
    });
  },

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
    })

  },

};
