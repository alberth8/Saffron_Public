import React from 'react';
import { Route } from 'react-router';
import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import ProfilePage from './components/userprofile/ProfilePage.jsx';
import requireAuth from './components/RequireAuth.jsx';
<<<<<<< 4c1b923bcd211dc2a7cc4bff09f4c0818dff6bc8
import IngredientsLayout from './components/ingredients/IngredientsLayout.jsx';
||||||| merged common ancestors
=======
import AddRecipeForm from './components/addRecipeForm/addRecipeForm.jsx';
>>>>>>> minor changes, need to rebase

export default (
<<<<<<< 4c1b923bcd211dc2a7cc4bff09f4c0818dff6bc8
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={requireAuth(ProfilePage)} />
    <Route path="ingredients" component={IngredientsLayout} />
    <Route path="recipes" component={Recipes} />
  </Route>
);
||||||| merged common ancestors
	<Route path='/' component={ App }>
	  <Route path='login' component={ Login }></Route>
	  <Route path='signup' component={ Signup }></Route>
	  <Route path='profile' component={ requireAuth(ProfilePage) } />	  
    <Route path='recipes' component={ Recipes }></Route>
	</Route>
)
=======
	<Route path='/' component={ App }>
    // IndexRoute???
	  <Route path='login' component={ Login }></Route>
	  <Route path='signup' component={ Signup }></Route>
	  <Route path='profile' component={ requireAuth(ProfilePage) } />	  
    <Route path='recipes' component={ Recipes }></Route>>
    <Route path='addrecipe' component={ AddRecipeForm }></Route>
	</Route>
)
>>>>>>> minor changes, need to rebase
