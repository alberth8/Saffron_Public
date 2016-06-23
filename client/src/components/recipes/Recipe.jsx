import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';


const Recipe = (props) => (
  <div>
    <li>
      <div>
        <h3>Name: {props.recipe.name}</h3>
        <img alt="error" src={props.recipe.photo} />
      </div>
    </li>
  </div>
);


// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes,
    // recipeName: state.recipe.name,
    // recipeUrl: state.recipe.url,
    // recipePhoto: state.recipe.photo,
    // recipeLikes: state.recipe.likes
//   };
// }

Recipe.propTypes = {
  recipe: PropTypes.object,
};

// export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
// export default connect(mapStateToProps)(Recipe);
export default Recipe;
