import React, { PropTypes } from 'react';


const RecommendedRecipes = (props) => (
  <div className="col s1 m2 l4">
    <div className="card small hoverable">
      <div className="card-image">
        <img alt="recipe" src={props.recRecipe.recipeImgUrl} />
      </div>
      <div className="card-content">
        {props.recRecipe.recipeTitle}
      </div>
    </div>
  </div>
);

RecommendedRecipes.propTypes = {
  recRecipe: PropTypes.object,
};

export default RecommendedRecipes;
