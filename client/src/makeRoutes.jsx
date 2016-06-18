import React from 'react';
import { Route } from 'react-router';
import { makeTestRoutes } from './pages/testPage/routes.jsx';

export const makeRoutes = () => {

  const Test = makeTestRoutes();

  return (
    <Route path="">
      {Test}
    </Route>
  )
}

export default makeRoutes;
