import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/AuthReducer.js';

export default combineReducers({
  // ...sharedReducers,
  authenticated: authReducer,
  form: formReducer,
  routing: routerReducer,
});
