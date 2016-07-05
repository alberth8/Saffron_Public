const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');
const User = require('../models/user.js');
const FavRecipes = require('../models/recipe_user.js');
const async = require('async');

module.exports = {
  fetchData: (req, res) => {
    
    const getRecords = (callback) => {
      let recordsList;
      FavRecipes.fetchAll().then((records) => {
        recordsList = records.models;
        callback(recordsList);
      });
    }
    getRecords((recordsList) => {
      let results = {};
      let recipeNames = [];
      let favRecipesCount = {};
      let userFavs = {};
      
      recordsList.forEach((record) => {
        if (favRecipesCount[record.attributes.recipeTitle] === undefined) {
          favRecipesCount[record.attributes.recipeTitle] = 1;
        } else {
          favRecipesCount[record.attributes.recipeTitle]++;
        }
      });
      recordsList.forEach((userRecord) => {
        if (userFavs[userRecord.attributes.user_id] === undefined) {
          userFavs[userRecord.attributes.user_id] = {};
          userFavs[userRecord.attributes.user_id][userRecord.attributes.recipe_id] = userRecord.attributes.recipeTitle; 
        } else {
          userFavs[userRecord.attributes.user_id][userRecord.attributes.recipe_id] = userRecord.attributes.recipeTitle; 
        }
      });
      res.send({
        recipeCount: favRecipesCount,
        UserFavs: userFavs,
      });
      console.log(userFavs, favRecipesCount);
    })
  },
};
