import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import makeStore from './src/makeStore.js';
import makeRoutes from './src/makeRoutes.jsx';
import { syncHistoryWithStore } from 'react-router-redux';

const store = makeStore();
const history = syncHistoryWithStore(browserHistory, store);
const routes = makeRoutes();

class App extends React.Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <Router
            routes={routes} 
            history={history}
          >
          </Router>
        </Provider>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
