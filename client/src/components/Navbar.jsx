import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../redux/actions/index.js';


class Navbar extends React.Component {

  onLogout() {
    this.props.signoutUser();
  }
  
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="navbar navbar-light bg-faded">
          <Link to="/app" className="brand-logo">Saffron</Link>
          <ul className="nav navbar-nav right">
            <li className="nav-item">
              <Link to="/app">Ingredients & Recipes</Link>
            </li>
             {this.props.authenticated ?
               <li className="nav-item">
                 <Link to="profile">Profile</Link>
               </li> : null}
            {this.props.authenticated ?
              <li className="nav-item">
                <Link to="addrecipe">Add Recipe</Link>
              </li> : null}
            <li className="nav-item">
              {this.props.authenticated ?
                <Link to="/" onClick={this.onLogout} >Logout</Link>
                : <Link to="login">Login</Link>}
            </li>
              {!this.props.authenticated ?
                <li className="nav-item">
                  <Link to="signup">Signup</Link>
                </li> : null}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  user: state.user,
  recom: state.recom,
});

Navbar.propTypes = {
  authenticated: PropTypes.object,
  signoutUser: PropTypes.func,
  user: PropTypes.object,
};

export default connect(mapStateToProps, actions)(Navbar);
