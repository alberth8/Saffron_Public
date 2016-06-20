import React, { Component } from 'react';
import { Route, Link } from 'react-router';
// var Link = Router.Link;

import Navbar from './Navbar.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
      <Navbar />
      {this.props.children}      
      </div>
    );
  }
}