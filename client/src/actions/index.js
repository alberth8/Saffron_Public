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

// Post recipe to db. Used in addRecipeForm
export function addRecipe(addRecipeObj) {
  console.log('IN ACTIONS/INDEX.JS');
  console.log('addRecipeObj', addRecipeObj);
  return () => {
    axios.post('/api/addrecipe', addRecipeObj)
    .then(function(response) {
        console.log('THEN > RESPONSE')
        console.log(response);
      }).catch(function(error) {
        console.log('ERROR:', error);
    });
   }
}