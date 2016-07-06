import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index.js';

class IngredientsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
    };
  }
  // when the user types in the input box, capture that text in e.target.value
  onIngredientChange(e) {
    this.setState({
      ingredient: e.target.value,
    });
  }
  onKeyPress(e) {
    if (e.keyCode === 13) {
      this.onAddIngredient(this.state.ingredient);
    }
  }
  onAddIngredient(addedIngredient, key) {
    // if key is defined, it means the user clicked on a suggested ingredient
    // so remove it from state, and rerender the list
    if (key !== undefined) {
      let newSuggested = this.props.suggestedIngredients.slice();
      newSuggested = newSuggested.splice(key, 1)[0][0];
      this.props.updateSelectedIngredients(
        [...this.props.selectedIngredients, newSuggested]);
    } else {
      this.props.updateSelectedIngredients([...this.props.selectedIngredients, addedIngredient]);
    }
    // if key isn't defined, then just add the ingredient to state
    this.setState({ ingredient: '' },
      () => (this.onSubmitIngredients()));
  }
  onRemoveIngredient(addedIngredient, key) {
    const newState = this.props.selectedIngredients.slice();
    newState.splice(key, 1);
    this.props.updateSelectedIngredients(newState);
    this.onSubmitIngredients();
  }
  onSubmitIngredients() {
    this.props.sendIngredientsToServer(this.props.selectedIngredients, this.props.user.id);
  }
  mapIngredients(ingredientsArray, selectOrSuggest) {
    return (
      <ul className="collection">
        <h5>{selectOrSuggest === 'selected' ? 'Selected' : 'Suggested'}</h5>
        {ingredientsArray.map((ingredient, key) => (
          <li className="chip">
            <div
              onClick={selectOrSuggest === 'selected' ?
              () => this.onRemoveIngredient(ingredient, key) :
              () => this.onAddIngredient(ingredient[0], key)
              }
              key={key}
              value={selectOrSuggest === 'selected' ? ingredient :
                ingredient[0]
              }
            >
            {selectOrSuggest === 'selected' ? ingredient :
            `${ingredient[0]} (${ingredient[1]} matching recipes)`}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s10 m10 l10">
            <input
              onChange={(e) => { this.onIngredientChange(e); }}
              onKeyDown={(e) => { this.onKeyPress(e); }}
              value={this.state.ingredient}
              placeholder="Add Ingredients"
            />
            {this.mapIngredients(this.props.selectedIngredients, 'selected')}
            {this.mapIngredients(this.props.suggestedIngredients, 'suggested')}
          </div>
        </div>
      </div>
    );
  }
}
// replace ['bread', 'cinnomen', 'beer']; with this.props.suggestedIngredients

const mapStateToProps = (state) => ({
  suggestedIngredients: state.suggestedIngredients,
  selectedIngredients: state.selectedIngredients,
  user: state.user,
});

IngredientsView.propTypes = {
  user: PropTypes.object,
  sendIngredientsToServer: PropTypes.func,
  updateSuggestedIngredients: PropTypes.func,
  updateSelectedIngredients: PropTypes.func,
  suggestedIngredients: PropTypes.array,
  selectedIngredients: PropTypes.array,
};

export default connect(mapStateToProps, actions)(IngredientsView);
