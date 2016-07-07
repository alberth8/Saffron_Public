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
      // adds token to user
      localStorage.setItem('token', response.data.token);
      // reroutes user to home page
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
      // adds token to user
      localStorage.setItem('token', response.data.token);
      // reroutes user to home page
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
    // first gets recommondations from recommondation engine
    axios.post(`${URL}recommondation`, { user }).then((response) => {
    // then gets the details for the recommondations that were retrived
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
  // first gets most popular recipes from recommondation engine
    axios.get(`${URL}popular`).then((response) => {
      // then gets the details for the recommondations that were retrived
      axios.post('/api/getRecipeInfo', {
        first: response.data[0],
        second: response.data[1],
        third: response.data[2],
        fourth: response.data[3],
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
        }, dispatch({
          type: 'UPDATE_SUGGESTED_INGREDIENTS',
          suggestedIngredients: response.data.suggestedIngredients,
        }));
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

// Post recipe to db. Used in addRecipeForm
export function addRecipe(addRecipeObj) {
  console.log('addRecipeObj:', addRecipeObj);
  return () => {
    axios.post('/api/addrecipe', addRecipeObj).then((response) => {
      console.log('helooooo');
      console.log(response.status);
    }).catch((error) => {
      console.log('ERROR:', error);
    });
  };
}
