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
    <h1>IngredientsLayout</h1>
    <SearchBar updateIngredients={props.updateIngredients}/>
    {mapIngredients(props.ingredients.selected, 'selected', props.updateIngredients)}
    {mapIngredients(props.ingredients.selected, 'suggested', props.updateIngredients)}
  </div>
);

IngredientsLayout.propTypes = {
  ingredients: React.PropTypes.object,
  updateIngredients: React.PropTypes.func,
};

export default IngredientsLayout;