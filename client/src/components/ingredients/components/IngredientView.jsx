import React from 'react';

const IngredientView = (props) => (
  <div>
    <ul>
      {props.selectOrSuggest === 'selected' ? 
        <li>Selected: { props.ingredient }</li>
        :
        <li>Suggested: { props.ingredient }</li>
      }
    </ul>
  </div>
);

IngredientView.propTypes = {
  ingredients: React.PropTypes.object,
};

export default IngredientView;