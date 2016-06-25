import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index.js';

class IngredientsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      selectedIngredients: ['egg', 'milk', 'honey'],
    };
  }
  // when the user types in the input box, capture that text in e.target.value
  onIngredientChange(e) {
    this.setState({
      ingredient: e.target.value,
    });
  }
  onAddIngredient(addedIngredient, key) {
    // if key is defined, it means the user clicked on a suggested ingredient
    // so remove it from state, and rerender the list
    if (key !== undefined) {
      const newSuggested = this.props.suggestedIngredients.slice();
      newSuggested.splice(key, 1);
      this.props.updateSuggestedIngredients(newSuggested);
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
    this.props.sendIngredientsToServer(this.state.selectedIngredients);
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
        {this.mapIngredients(this.props.suggestedIngredients, 'suggested')}
      </div>
    );
  }
}
// replace ['bread', 'cinnomen', 'beer']; with this.props.suggestedIngredients


const mapStateToProps = (state) => ({
  suggestedIngredients: state.suggestedIngredients,
});

IngredientsView.propTypes = {
  sendIngredientsToServer: PropTypes.func,
  updateSuggestedIngredients: PropTypes.func,
  suggestedIngredients: PropTypes.array,
};

export default connect(mapStateToProps, actions)(IngredientsView);
