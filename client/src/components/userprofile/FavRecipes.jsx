import React, { PropTypes } from 'react';


const FavRecipe = (props) => (
  <div className="col s1 m2 l4">
    <div className="card small hoverable">
      <div className="card-image">
        <img alt="recipe" src={props.favRecipe.recipeImgUrl} />
      </div>
      <div className="card-content">
        {props.favRecipe.recipeTitle}
      </div>
    </div>
  </div>
);

FavRecipe.propTypes = {
  favRecipe: PropTypes.object,
};

export default FavRecipe;
