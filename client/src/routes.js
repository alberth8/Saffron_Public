import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import ProfilePage from './components/userprofile/ProfilePage.jsx';
import requireAuth from './components/RequireAuth.jsx';

export default (
	<Route path='/' component={ App }>
	  <Route path='login' component={ Login }></Route>
	  <Route path='signup' component={ Signup }></Route>
	  <Route path='profile' component={ requireAuth(ProfilePage) } />	  
    <Route path='recipes' component={ Recipes }></Route>
	</Route>
)
