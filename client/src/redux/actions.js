const actions = {
  updateIngredients(newSelectedIngredients) {
    return {
      type: 'UPDATE_INGREDIENTS',
      newSelectedIngredients,
    };
  },
};

export default actions;
