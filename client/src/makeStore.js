import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducer from './redux/reducer';

export const makeStore = initialState => {
  const devtoolsExt = global.devToolsExtension && global.devToolsExtension();
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(browserHistory)
  ];

  // if (__NODE_ENV__ !== 'production') {
    if (!devtoolsExt) {
      // We don't have the Redux extension in the browser, show the Redux logger
      const createLogger = require('redux-logger');
      const logger = createLogger({
        level: 'info',
        collapsed: true
      });
      middlewares.push(logger);
    }
  // }

  const mw = compose(
    applyMiddleware(...middlewares),
    devtoolsExt || (f => f)
  );

  const store = createStore(reducer, initialState, mw);
  return store;
};

export default makeStore;
