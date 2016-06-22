import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapIngredients = (ingredientsArray, selectOrSuggest) => (
  <ul>
    {ingredientsArray.map((ingredient, key) => (
      selectOrSuggest === 'selected' ?
        <li>
          <div onClick={this.props.removeIngredient} key={key} value={this.props.ingredient}>
            {ingredient}
          </div>
        </li> :
        <li>
          <div onClick={this.props.addIngredient} key={key} value={this.props.ingredient}>
            {ingredient}
          </div>
        </li>
    ))}
  </ul>
);

const IngredientsView = () => (
  <div>
    {mapIngredients(['SALT', 'CHICKEN', 'Other stuff'], 'selected')}
    {mapIngredients(['PEPPER', 'hotdogs', 'chicken thighs'], 'suggested')}
  </div>
);

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.selected,
});

IngredientsView.propTypes = {
  ingredient: PropTypes.string,
  ingredients: PropTypes.array,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
};

export default connect(mapStateToProps)(IngredientsView);
