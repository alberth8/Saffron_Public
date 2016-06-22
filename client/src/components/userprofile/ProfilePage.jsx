import React from 'react';
import { connect } from 'react-redux';
import FavRecipes from './FavRecipes.jsx';

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
			 PROFILE
			  <FavRecipes savedRecipes={ this.props.savedRecipes }/> 
			</div>
		)
	}

}

const mapStateToProps = function(state, ownProps) {
	return {

	};
}

const mapDispatchToProps = function(dispatch) {
	return {

	};
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)