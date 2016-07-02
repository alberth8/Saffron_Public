export default function (state = ['oranges', 'pears', 'tofu'], action) {
  switch (action.type) {
    case 'UPDATE_SUGGESTED_INGREDIENTS':
      return action.suggestedIngredients;
    case 'UPDATE_INGREDIENTS':
      return action.recipes;
    case 'SEND_INGREDIENTS_TO_SERVER':
      return action.sendIngredientsToServer;

    default:
      return state;
  }
}
