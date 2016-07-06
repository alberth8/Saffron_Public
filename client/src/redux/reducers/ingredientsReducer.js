const ingredientsRecipes = {
  recipeReducer: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_RECIPES':
        return action.recipes;

      default:
        return state;
    }
  },

  selectedIngredientsReducer: (state = ['eggs', 'sugar'], action) => {
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
};

export default ingredientsRecipes;
