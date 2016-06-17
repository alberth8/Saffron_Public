import { combineReducers } from 'redux';
import * as sharedReducers from './ducks';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
​
export default combineReducers({
  ...sharedReducers,
  form: formReducer,
  routing: routerReducer
});