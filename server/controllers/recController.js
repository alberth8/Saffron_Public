const FavRecipes = require('../models/recipe_user.js');

// sends database data to recommendation engine, so it can make recommendations
module.exports = {
  // gets data from recipe_users table
  fetchData: (req, res) => {
    const getRecords = (callback) => {
      let recordsList;
      FavRecipes.fetchAll().then((records) => {
        recordsList = records.models;
        callback(recordsList);
      });
    };
    // creates two objects for the recommendation engine
    getRecords((recordsList) => {
      let results = {};
      let recipeNames = [];
      let favRecipesCount = {};
      let userFavs = {};
      // object created to put together most popular items
      recordsList.forEach((record) => {
        if (favRecipesCount[record.attributes.recipeTitle] === undefined) {
          favRecipesCount[record.attributes.recipeTitle] = 1;
        } else {
          favRecipesCount[record.attributes.recipeTitle]++;
        }
      });
      // object create to figue out what to recommend to each user
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
    });
  },
};
