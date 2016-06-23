import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/AuthReducer.js';
import userInfoReducer from './reducers/UserInfoReducer.js';

export default combineReducers({
  // ...sharedReducers,
  userInfo: userInfoReducer,
  authenticated: authReducer,
  form: formReducer,
  routing: routerReducer,
});
