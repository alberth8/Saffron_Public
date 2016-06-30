const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');
const User = require('../models/user.js');
const FavRecipes = require('../models/recipe_user.js');
const each = require('async-each');

module.exports = {
  fetchData: (req, res) => {
    console.log('hello');
    let results = {};
    
    Recipe.fetchAll().then((recipe) => {
      recipe.models.forEach((rec) => {
        results[rec.attributes.recipeTitle] = {};
        FavRecipes.where('recipe_id', rec.attributes.id).fetchAll().then((userRec) => {
          userRec.models.forEach((users) => {
            FavRecipes.where('user_id', users.attributes.user_id).fetchAll().then((userFav) => {
              userFav.forEach((otherRec) => {
              //console.log(rec.attributes.recipeTitle, results[rec.attributes.recipeTitle][otherRec.attributes.recipeTitle]);
                if(results[rec.attributes.recipeTitle][otherRec.attributes.recipeTitle] === undefined){
                  results[rec.attributes.recipeTitle][otherRec.attributes.recipeTitle] = 1;
                } else {
                  results[rec.attributes.recipeTitle][otherRec.attributes.recipeTitle] ++;

                }
                console.log(results);
            //console.log(rec.attributes.recipeTitle, users.attributes.user_id, otherRec.attributes.recipeTitle);
              //console.log(results);
              })
            });
          });
        });
      });
    });
  },

};
