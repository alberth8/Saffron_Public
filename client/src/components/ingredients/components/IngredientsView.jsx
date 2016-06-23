import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index.js';


class IngredientsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
    };
    this.mapIngredients = (ingredientsArray, selectOrSuggest) => (
      <ul>
        {ingredientsArray.map((ingredient, key, array) => (
          selectOrSuggest === 'selected' ?
            <li>
              <div
                onClick={() => this.onRemoveIngredient(ingredient, array, key)}
                key={key}
                value={ingredient}
              >{ingredient}
              </div>
            </li> :
            <li>
              <div
                onClick={() => this.onAddIngredient(ingredient, array)}
                key={key}
                value={ingredient}
              >{ingredient}
              </div>
            </li>
        ))}
      </ul>
    );
  }
  onAddIngredient(addedIngredient, array) {
    array.push(addedIngredient);
    console.log(array);
    this.props.updateIngredients(array);
  }
  onRemoveIngredient(removedIngredient, array, key) {
    array.splice(key, 1);
    console.log(array);
    this.props.updateIngredients(array);
  }
  render() {
    return (
      <div>
        {this.mapIngredients(['SALT', 'CHICKEN', 'Other stuff'], 'selected')}
        {this.mapIngredients(['PEPPER', 'hotdogs', 'chicken thighs'], 'suggested')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.selected,
});

IngredientsView.propTypes = {
  ingredient: PropTypes.string,
  ingredients: PropTypes.array,
  updateIngredients: PropTypes.func,
};

export default connect(mapStateToProps, actions)(IngredientsView);
