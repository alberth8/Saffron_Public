import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Login from './components/login-signup/Login.jsx';
import Signup from './components/login-signup/Signup.jsx';

export default (
	<Route path='/' component={ App }>
	  <Route path='login' component={ Login }></Route>
	  <Route path='signup' component={ Signup }></Route>	  
	</Route>
)