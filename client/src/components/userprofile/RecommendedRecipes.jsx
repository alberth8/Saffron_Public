import React, { PropTypes } from 'react';


const RecommendedRecipes = (props) => (
  <div>
    <li>
      <div>
        <h3>{props.recRecipe.recipeTitle}</h3>
      </div>
    </li>
  </div>
);

RecommendedRecipes.propTypes = {
  recRecipe: PropTypes.object,
};

export default RecommendedRecipes;
