import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="container-saffron">
    <div className="title-saffron">
      Saffron
      <div className="subheading">
        Ingredient Pairing & Recipe Finder
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="card-panel splash-panel center-align">
          <h3>Let's get cooking!</h3>
          <div className="button-splash-container">
            <Link
              to="/login"
              className="waves-effect waves-light btn-large btn-splash"
            >
              Login
            </Link>
            <p></p>
            <Link
              to="/signup"
              className="waves-effect waves-light btn-large btn-splash"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
