import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
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
           <li class="nav-item">
           	 <Link to="login">Login</Link>
           </li>
           <li class="nav-item">
           	 <Link to="signup">Signup</Link>
           </li>
          </ul>
        </nav>
	  )
	}
}

const mapStateToProps = function(state, ownProps) {
	return {

	};
}

const mapDispatchToprops = function(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToprops)(Navbar)
