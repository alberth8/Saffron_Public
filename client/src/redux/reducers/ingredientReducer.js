//reducers take in actions and a copy of current state

function ingredients (state = {}, action) {
  console.log(state, action);
  switch (action.type) {
    case 'XXXXXXXXX':
      return Object.assign({}, action.XXXXXXXXX);

    default:
      return state;
  }
};

export default ingredients;