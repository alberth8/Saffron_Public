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
      dispatch(authError('Bad Login Info'));
    });
  };
}

export function signupUser(email, password) {
  return () => {
    axios.post('/api/signup', { email, password });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: 'UNAUTH_USER' };
}

export function userInfo(email) {
  return (dispatch) => {
    dispatch({
      type: 'USER_INFO',
      payload: { email },
    });
  };
}

export const addIngredient = (ingredients, dispatch) => (
	axios.post('/api/updateIngredients',
    dispatch({
      ingredients,
      // payload,
    })
  )
);

export const removeIngredient = (ingredients, dispatch) => (
  axios.post('/api/updateIngredients',
    dispatch({
      ingredients,
      // payload,
    })
  )
);
