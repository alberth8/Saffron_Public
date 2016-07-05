import axios from 'axios';
import { browserHistory } from 'react-router';
const URL = 'http://localhost:3500/';

// send back error is signup/login fail
export function authError(error) {
  return {
    type: 'AUTH_ERROR',
    payload: error,
  };
}
// verify password and login user in
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
// signup user and hash password
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
// siging user out and destroying token
export function signoutUser() {
  localStorage.removeItem('token');

  return { type: 'UNAUTH_USER' };
}
// getting user id to use for other
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

// call to get recommondations
export function getRecommondation(user) {
  return (dispatch) => {
    axios.post(`${URL}recommondation`, { user }).then((response) => {
      axios.post('/api/getRecipeInfo', {
        first: response.data.first,
        second: response.data.second,
        third: response.data.third,
        fourth: response.data.fourth,
      }).then((recRecipes) => {
        dispatch({
          type: 'RECOMMONDATION',
          recom: recRecipes.data,
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}
// call to get popular items
export function popular() {
  return (dispatch) => {
    axios.get(`${URL}popular`).then((response) => {
      axios.post('/api/getRecipeInfo', {
        first: response.data.first,
        second: response.data.second,
        third: response.data.third,
        fourth: response.data.fourth,
      }).then((popRecipes) => {
        dispatch({
          type: 'POPULAR',
          pop: popRecipes.data,
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
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

// these are our actions
export function updateSuggestedIngredients(suggestedIngredients) {
  console.log(suggestedIngredients);
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
      // update selected, suggested and receipes w/ response
        console.log('index.js response: ', response.data);
        dispatch({
          type: 'UPDATE_INGREDIENTS',
          selectedIngredients: response.data.selectedingredients,
          suggestedIngredients: response.data.suggestedIngredients,
        });
      })
      .catch((error) => {
        console.log('error in client ', error);
      });
  };
}

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
