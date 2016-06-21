import React from 'react';

export default IngredientView = (props) => (
  <div>
    <h3>IngredientView</h3>
    <ul>
      {props.selected ? 
        <li> {props.selected} </li>
        :
        <li>{props.suggested} </li>
      }
    </ul>
  </div>

);

IngredientView.propTypes = {
  ingredients: React.PropTypes.object,
};