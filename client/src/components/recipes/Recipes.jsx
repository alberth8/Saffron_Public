import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Recipe from './Recipe.jsx';

const Recipes = ({ recipes }) => (
  <div>
    <h2 className="recipes-title">Recipes</h2>
    <div className="pure-g">
      <ul className="recipes">
        {recipes.map((recipe, i) =>
          <a href={recipe.recipeUrl} key={i} target="_blank">
            <Recipe recipe={recipe} key={i} />
          </a>
        )}
      </ul>
    </div>
  </div>
);

Recipes.propTypes = {
  recipes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps)(Recipes);
