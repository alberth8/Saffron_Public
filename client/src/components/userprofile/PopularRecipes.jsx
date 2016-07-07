import React, { PropTypes } from 'react';


const PopularRecipes = (props) => (
  <div className="col s1 m2 l4">
    <div className="card small hoverable">
      <div className="card-image">
        <img alt="recipe" src={props.popRecipe.recipeImgUrl} />
      </div>
      <div className="card-content">
        {props.popRecipe.recipeTitle}
      </div>
    </div>
  </div>
);

PopularRecipes.propTypes = {
  popRecipe: PropTypes.object,
};

export default PopularRecipes;
