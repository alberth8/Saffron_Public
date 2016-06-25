export default function (state = ['a', 'b', 'c'], action) {
  // remove ['a', 'b', 'c'] once we have a working server
  switch (action.type) {
    case 'UPDATE_SUGGESTED_INGREDIENTS':
      return action.suggestedIngredients;
    case 'SEND_INGREDIENTS_TO_SERVER':
      return action.sendIngredientsToServer;

    default:
      return state;
  }
}
