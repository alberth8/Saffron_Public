const updateIngredient = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'UPDATE_INGREDIENTS':
      return Object.assign({}, action.updateIngredients);

    default:
      return state;
  }
};

export default updateIngredient;
