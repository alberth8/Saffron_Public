// send new set of ingredients to server
// reset state with selected ingredients,
// suggested ingredients
// and recipes
export function updateIngredients(ingredients) {
  return {
    type: 'UPDATE_INGREDIENTS',
    payload: ingredients,
  };
}
