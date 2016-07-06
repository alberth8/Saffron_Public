export default function (state = {}, action) {
  switch (action.type) {
    case 'POPULAR':
      return action.pop;
    default:
      return state;
  }
}
