import React from 'react';
import { Route, IndexRoute } from 'react-router';
import TestLayout from '../../sharedLayouts/Test/TestLayout.jsx';
import Test from './components/Test.jsx'


export const makeTestRoutes = () => {
  return (

    <Route path="/" component={TestLayout} >
      <IndexRoute component={Test} />
      {/*<Route path="/test" component={Test} />*/}
    </Route>
  );
};

export default makeTestRoutes;
