import axios from 'axios';
import { browserHistory } from 'react-router';

export function authError(error) {
  return {
    type: 'AUTH_ERROR',
    payload: error,
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    axios.post('/login', { email, password })
    .then((response) => {
      dispatch({
        type: 'AUTH_USER',
      });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(() => {
      dispatch(authError('Must enter a valid email and password'));
    });
  };
}

export function signupUser(email, password) {
  return (dispatch) => {
    axios.post('/api/signup', { email, password })
    .then((response) => {
      dispatch({
        type: 'AUTH_USER',
      });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch((response) => {
      dispatch(authError(response.data));
    });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: 'UNAUTH_USER' };
}

export function userInfo(email) {
  console.log(email);
  return (dispatch) => {
    dispatch({
      type: 'USER_INFO',
      email,
    });
  };
}

export function updateIngredients(ingredients) {
  return (dispatch) => {
    axios.post('/api/updateIngredients', { ingredients })
      .then((response) => {
      // update selected, suggested and receipes w/ response
        console.log('index.js data', response);
        dispatch({
          type: 'UPDATE_INGREDIENTS',
          payload: { ingredients },
        });
      })
      .catch((error) => {
        console.log('error in client ', error);
      });
  };
}
