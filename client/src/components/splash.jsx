import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container-saffron">
        <div className="title-saffron">
          Saffron
          <div className="subheading">
            Ingredient Pairing & Recipe Finder
          </div>
        </div>
          {!this.props.authenticated ?
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
          : null}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});

Splash.propTypes = {
  authenticated: PropTypes.object,
};

export default connect(mapStateToProps)(Splash);

