export default function (state = '', action) {
  switch (action.type) {
    case 'AUTH_ERROR':
      return action.payload;
    default:
      return state;
  }
}
