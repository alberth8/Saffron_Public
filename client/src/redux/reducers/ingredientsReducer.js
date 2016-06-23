export default function (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_INGREDIENTS':
      return { ingredients: action.payload };

    default:
      return state;
  }
}
