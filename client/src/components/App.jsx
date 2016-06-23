import React, { PropTypes } from 'react';

import Navbar from './Navbar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: '',
    };
  }

  render() {
    return (
      <div>
        <Navbar />
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};
