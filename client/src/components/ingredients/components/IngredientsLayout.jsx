import React from 'react';
import SearchBar from './SearchBar.jsx';
import IngredientView from './IngredientView.jsx';

const mapIngredients = (ingredientsArray, selectOrSuggest, updateIngredients) => (
  ingredientsArray.map( (ingredient, key) => (
    <IngredientView 
      ingredient={ingredient} 
      updateIngredients={updateIngredients}
      key={key}
      selectOrSuggest={selectOrSuggest}
    />
  ))
)

const IngredientsLayout = (props) => (
  <div>
    <SearchBar handleSubmit={props.updateIngredients}/>
    {mapIngredients(props.ingredients.selected, 'selected', props.updateIngredients)}
    {mapIngredients(props.ingredients.suggested, 'suggested', props.updateIngredients)}
  </div>
);

IngredientsLayout.propTypes = {
  ingredients: React.PropTypes.object,
  updateIngredients: React.PropTypes.func,
};

export default IngredientsLayout;