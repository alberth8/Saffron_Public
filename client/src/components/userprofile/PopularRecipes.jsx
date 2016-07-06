import React, { PropTypes } from 'react';


const PopularRecipes = (props) => (
  <div>
    <li>
      <div>
        <h3>{props.popRecipe.recipeTitle}</h3>
      </div>
    </li>
  </div>
);

PopularRecipes.propTypes = {
  popRecipe: PropTypes.object,
};

export default PopularRecipes;
