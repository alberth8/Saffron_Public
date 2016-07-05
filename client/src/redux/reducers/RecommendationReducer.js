export default function (state = {}, action) {
  switch (action.type) {
    case 'RECOMMONDATION':
      return action.recom;
    default:
      return state;
  }
}
