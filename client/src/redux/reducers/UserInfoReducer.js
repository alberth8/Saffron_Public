export default function (state = {}, action) {
  switch (action.type) {
    case 'USER_INFO':
      return action.user;
    default:
      return state;
  }
}
