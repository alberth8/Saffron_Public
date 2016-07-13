const ingredientsRecipes = {
  recipeReducer: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_RECIPES':
        return action.recipes;

      default:
        return state;
    }
  },

  selectedIngredientsReducer: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_SELECTED_INGREDIENTS':
        return action.selectedIngredients;

      default:
        return state;
    }
  },

  suggestedIngredientsReducer: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_SUGGESTED_INGREDIENTS':
        return action.suggestedIngredients;

      default:
        return state;
    }
  },

  updateFeelingLucky: (state = false, action) => {
    switch (action.type) {
      case 'UPDATE_FEELING_LUCKY':
        return action.feelingLucky;

      default:
        return state;
    }
  },
};

export default ingredientsRecipes;
