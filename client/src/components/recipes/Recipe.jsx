import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import { bindActionCreators } from 'redux'


const Recipe = (props) => {

  return (
    <div>
      <li>
        <div>
          <h3>Name: {props.recipe.name}</h3>
          <img src={props.recipe.photo} />
        </div>
      </li>
    </div>
  );
};

function mapStateToProps(state) {

  return {
    recipes: state.recipes,
    // recipeName: state.recipe.name,
    // recipeUrl: state.recipe.url,
    // recipePhoto: state.recipe.photo,
    // recipeLikes: state.recipe.likes
  }

}

// function mapDispatchToProps(dispatch) {
//
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
export default connect(mapStateToProps)(Recipe);
