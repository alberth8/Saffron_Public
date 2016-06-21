// TODO: Once we have reducers in ./ducks, make sure to uncomment sharedReducers
// import and ...deconstruction

import { combineReducers } from 'redux';
// import * as sharedReducers from './ducks';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/AuthReducer.js';

export default combineReducers({
  // ...sharedReducers,
  authenticated: authReducer,
  form: formReducer,
  routing: routerReducer
});
