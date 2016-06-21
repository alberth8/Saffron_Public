import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import ProfilePage from './components/userprofile/ProfilePage.jsx';
import requireAuth from './components/RequireAuth.jsx';
import IngredientsContainer from './components/ingredients/IngredientsContainer.jsx';

export default (
<<<<<<< 09ddab256799ec4b41eef2026136870a56d1a490
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={requireAuth(ProfilePage)} />
    <Route path="recipes" component={Recipes} />
    <Route path='ingredients' component={ IngredientsContainer } /> 
  </Route>
);
