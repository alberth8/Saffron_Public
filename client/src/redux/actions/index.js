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
        type: 'USER_INFO',
        user: {
          id: response.data.userId,
          email: response.data.userEmail,
        },
      });
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
  return (dispatch) => {
    axios.post('/api/userInfo', { email })
    .then((response) => {
      dispatch({
        type: 'USER_INFO',
        user: {
          id: response.data.userId,
          email: response.data.userEmail,
        },
      });
    });
  };
}

// export function saveFav() {
//   return (dispatch) => {
//     axios.post('/api/saveFav', {})
//     .then((response) => {
//       dispatch({
//         type: 'FAVED',
//       });
//     }).catch((respone) => {
//       dispatch({
//         type: 'FAVED_ERROR',
//       });
//     });
//   };
// }

export function updateSuggestedIngredients(suggestedIngredients) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_SUGGESTED_INGREDIENTS',
      suggestedIngredients,
    });
  };
}

export function sendIngredientsToServer(selectedIngredients, userID) {
  return (dispatch) => {
    axios.post('/api/updateIngredients', { selectedIngredients, userID })
      .then((response) => {
        dispatch({
          type: 'UPDATE_RECIPES',
          recipes: response.data.recipes,
        });
        dispatch({
          type: 'UPDATE_SUGGESTED_INGREDIENTS',
          suggestedIngredients: response.data.suggestedIngredients,
        });
      })
      .catch((error) => {
        console.log('error in client ', error);
      });
  };
}

export function updateSelectedIngredients(selectedIngredients, callback) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_SELECTED_INGREDIENTS',
      selectedIngredients,
    }, callback());
  };
}

// sendIngredientsToServer(selectedIngredients);

// Post recipe to db. Used in addRecipeForm
export function addRecipe(addRecipeObj) {
  console.log('addRecipeObj:', addRecipeObj);
  return () => {
    axios.post('/api/addrecipe', addRecipeObj).then((response) => {
      console.log('THEN > RESPONSE', response);
    }).catch((error) => {
      console.log('ERROR:', error);
    });
  };
}
