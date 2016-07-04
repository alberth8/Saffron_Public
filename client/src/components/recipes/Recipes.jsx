import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Recipe from './Recipe.jsx';

const Recipes = ({ recipes }) => {
  console.log('hi');
  return (
    <div>
      <ul>
        {recipes.map((recipe, i) =>
          <a href={recipe.recipeUrl} key={i} target="_blank">
            <Recipe recipe={recipe} key={i} />
          </a>
        )}
      </ul>
    </div>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps)(Recipes);
