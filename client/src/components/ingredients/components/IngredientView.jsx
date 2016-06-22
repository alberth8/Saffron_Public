import React, { PropTypes } from 'react';
// To be added:
// Every time selected ingredient is click, remove it
// then update update store, get updated suggested list
// and updated recipes from the database

const IngredientView = (props) => (
  <div>
    <ul>
      {props.selectOrSuggest === 'selected' ?
        <li>Selected: {props.ingredient}</li>
        :
        <li>Suggested: {props.ingredient}</li>
      }
    </ul>
  </div>
);

IngredientView.propTypes = {
  ingredient: PropTypes.object,
  selectOrSuggest: PropTypes.string,
};

export default IngredientView;
