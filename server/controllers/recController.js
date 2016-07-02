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
      let favRecipes = {};
      let userFavs = {};
      recordsList.forEach((record) => {
        if (results[record.attributes.recipeTitle] === undefined) {
          results[record.attributes.recipeTitle] = {};
          results[record.attributes.recipeTitle].id = record.attributes.recipe_id;
          recipeNames.push(record.attributes.recipeTitle);
        }
      });
      recipeNames.forEach((names) => {
        for (const key in results) {
          results[key][names] = 0;
        }
      });
      recordsList.forEach((record) => {
        if (favRecipes[record.attributes.recipeTitle] === undefined) {
          favRecipes[record.attributes.recipeTitle] = [];
          favRecipes[record.attributes.recipeTitle].push(record.attributes.user_id.toString());
        } else {
          favRecipes[record.attributes.recipeTitle].push(record.attributes.user_id.toString());
        }
      });
      recordsList.forEach((userRecord) => {
        if (userFavs[userRecord.attributes.user_id] === undefined) {
          userFavs[userRecord.attributes.user_id] = [];
          userFavs[userRecord.attributes.user_id].push(userRecord.attributes.recipeTitle);
        } else {
          userFavs[userRecord.attributes.user_id].push(userRecord.attributes.recipeTitle);         
        }
      });
      for (const key in favRecipes) {
        favRecipes[key].forEach((next) => {
          userFavs[next].forEach((recipe) => {
            results[key][recipe] ++;
          })
        })
      }
      res.send(results);
    })
  },
};
