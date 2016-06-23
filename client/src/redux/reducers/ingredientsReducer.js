import { combineReducers } from 'redux';

const addIngredient = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return action.addIngredient;

    default:
      return state;
  }
};

const removeIngredient = (state = {}, action) => {
  switch (action.type) {
    case 'REMOVE_INGREDIENT':
      return action.removeIngredient;

    default:
      return state;
  }
};

export default combineReducers({
  addIngredient,
  removeIngredient,
});
