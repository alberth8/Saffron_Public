import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router';
import AuthAction from '../redux/actions/AuthAction.js';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	
	onLogout() {
	}

	authCheck() {
		if (this.props.authenticated) {
			return <Link to="/" onClick={this.onLogout} >Logout</Link>
		} else {
      return <Link to="login">Login</Link>
		}
	}

	render() {
	  return (
		<nav class="navbar navbar-light bg-faded">
          <ul class="nav navbar-nav">
           <li class="nav-item">
             <Link to="/">Home</Link>
           </li>
           <li class="nav-item">
             <a class="nav-link" href="#">Ingredients</a>
           </li>
           <li class="nav-item">
             <Link to="recipes">Recipes</Link>
           </li>
           {this.props.authenticated ? 
           <li class="nav-item">
           	 <Link to="profile">Profile</Link>
           </li>           
           : null}
           <li class="nav-item">
           	 { this.authCheck() }
           </li>
           {!	this.props.authenticated ? 
           <li class="nav-item">
           	 <Link to="signup">Signup</Link>
           </li>
           : null}           
          </ul>
        </nav>
	  )
	}
}

const mapStateToProps = function(state, ownProps) {
	return {
		authenticated: state.authenticated
	};
}

const mapDispatchToprops = function(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToprops)(Navbar)
