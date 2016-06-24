import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index.js';

class IngredientsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      selectedIngredients: ['egg', 'milk', 'honey'],
      suggestedIngredients: ['bread', 'cinnomen', 'beer'],
    };
  }
  // when the user types in the input box, capture that text in e.target.value
  onIngredientChange(e) {
    this.setState({
      ingredient: e.target.value,
    });
  }
  onAddIngredient(addedIngredient, key) {
    if (key !== undefined) {
      // if key is defined, it means the user clicked on a suggested ingredient
      // so remove it from state, and rerender the list
      const newState = this.state.suggestedIngredients.slice();
      newState.splice(key, 1);
      this.setState({ suggestedIngredients: newState });
    }
    // if key isn't defined, then just add the ingredient to state
    this.setState({
      selectedIngredients: [...this.state.selectedIngredients, addedIngredient],
    });
  }
  onRemoveIngredient(addedIngredient, key) {
    const newState = this.state.selectedIngredients.slice();
    newState.splice(key, 1);
    this.setState({
      selectedIngredients: newState,
    });
  }
  onSubmitIngredients() {
    this.props.updateIngredients(this.state.selectedIngredients);
  }
  mapIngredients(ingredientsArray, selectOrSuggest) {
    return (
      <ul>
        <h3>{selectOrSuggest === 'selected' ? 'Selected' : 'Suggested'}</h3>
        {ingredientsArray.map((ingredient, key) => (
          <li>
            <div
              onClick={selectOrSuggest === 'selected' ?
              () => this.onRemoveIngredient(ingredient, key) :
              () => this.onAddIngredient(ingredient, key)
              }
              key={key}
              value={ingredient}
            >{ingredient}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div>
        <input
          onChange={(e) => { this.onIngredientChange(e); }}
          value={this.state.ingredient}
        />
        <button
          onClick={() => this.onAddIngredient(this.state.ingredient)}
        >Add Ingredient</button>
        <button
          onClick={() => this.onSubmitIngredients()}
        >Get Suggestions</button>
        {this.mapIngredients(this.state.selectedIngredients, 'selected')}
        {this.mapIngredients(this.state.suggestedIngredients, 'suggested')}
      </div>
    );
  }
}

IngredientsView.propTypes = {
  updateIngredients: PropTypes.func,
};

export default connect(null, actions)(IngredientsView);
