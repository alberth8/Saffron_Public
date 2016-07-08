import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import AddRecipeForm from './components/addRecipeForm/AddRecipeForm.jsx';
import ProfilePage from './components/userprofile/ProfilePage.jsx';
import requireAuth from './components/RequireAuth.jsx';
import IngredientsView from './components/ingredients/IngredientsView.jsx';
import splash from './components/splash.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={splash} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={requireAuth(ProfilePage)} />
    <Route path="ingredients" component={IngredientsView} />
    <Route path="recipes" component={Recipes} />
    <Route path="addrecipe" component={requireAuth(AddRecipeForm)} />
  </Route>
);
