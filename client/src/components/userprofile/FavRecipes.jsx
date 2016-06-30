import React, { PropTypes } from 'react';


const FavRecipe = (props) => (
  <div>
    <li>
      <div>
        <h3>{props.favRecipe.recipeTitle}</h3>
      </div>
    </li>
  </div>
);

FavRecipe.propTypes = {
  favRecipe: PropTypes.object,
};

export default FavRecipe;
