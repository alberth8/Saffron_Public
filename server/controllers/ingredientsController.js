// import { Ingredient } from '../models/ingredient';
// import { Ingredients } from '../collections/ingredients';
// const Ingredient = require('../models/ingredient.js');
// const Ingredients = require('../collections/ingredients.js');

// Note to team: try to do these relationally. If not,
// make use of the req object to obtain userID

module.exports = {
  updateIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    console.log('ingredients controller!!!!', ingredients);
    res.send('POST to /api/ingredients, this is ingredients');
  },
  getIngredients: (req, res) => {
    const ingredients = req.body.selectedIngredients;
    console.log('GET: ', ingredients);
    res.send('get to /api/updateingredients, this is ingredients');
  },
};
