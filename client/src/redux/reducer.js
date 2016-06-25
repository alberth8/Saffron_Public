import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/AuthReducer.js';
import userInfoReducer from './reducers/UserInfoReducer.js';
import authErrorReducer from './reducers/AuthErrorReducer.js';

export default combineReducers({
  // ...sharedReducers,
  user: userInfoReducer,
  authenticated: authReducer,
  authErrorMessage: authErrorReducer,
  form: formReducer,
  routing: routerReducer,
});
