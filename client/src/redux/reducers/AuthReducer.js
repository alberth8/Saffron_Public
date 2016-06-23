export default function (state = false, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return { authenticated: true };
    case 'UNAUTH_USER':
      return { authenticated: false };
    default:
      return state;
  }
}
