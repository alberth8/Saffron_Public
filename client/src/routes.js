import React from 'react';
import { Route } from 'react-router';
import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import AddRecipeForm from './components/addRecipeForm/AddRecipeForm.jsx';
import ProfilePage from './components/userprofile/ProfilePage.jsx';
import requireAuth from './components/RequireAuth.jsx';
import IngredientsLayout from './components/ingredients/IngredientsLayout.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={requireAuth(ProfilePage)} />
    <Route path="ingredients" component={IngredientsLayout} />
    <Route path="recipes" component={Recipes} />
    <Route path="addrecipes" component={AddRecipeForm} />
  </Route>
);
