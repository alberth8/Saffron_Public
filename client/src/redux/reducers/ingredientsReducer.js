// reducers take in actions and a copy of current state
export default function (state = {}, action) {
  console.log(state, action);
  switch (action.type) {
    case 'UPDATE_INGREDIENTS':
      return action.updateIngredients;
    default:
      return state;
  }
  // default:
  //   return state;
  // }
}
