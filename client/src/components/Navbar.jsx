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
      <nav className="navbar navbar-light bg-faded">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/ingredients">Ingredients</Link>
          </li>
          <li className="nav-item">
            <Link to="recipes">Recipes</Link>
          </li>
           {this.props.authenticated ?
             <li className="nav-item">
               <Link to="profile">Profile</Link>
             </li> : null}
          <li className="nav-item">
            {this.props.authenticated ?
              <Link to="/" onClick={this.onLogout} >Logout</Link>
              : <Link to="login">Login</Link>}
          </li>
           {!	this.props.authenticated ?
             <li className="nav-item">
               <Link to="signup">Signup</Link>
             </li> : null}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  user: state.user,
});

Navbar.propTypes = {
  authenticated: PropTypes.func,
  signoutUser: PropTypes.func,
  user: PropTypes.string,
};

export default connect(mapStateToProps, actions)(Navbar);
