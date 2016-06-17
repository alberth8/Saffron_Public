import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './src/makeStore.js';

const store = makeStore();

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <h1>Hello, world!</h1>
        </Provider>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
