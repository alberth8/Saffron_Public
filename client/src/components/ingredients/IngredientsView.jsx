import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';
import ReactDOM from 'react-dom';

/*  This component collects user's ingredients through an input box
    and by suggesting other ingredients that are often used in conjunction
    Selected & suggested ingredients are persisted in store, so user can
    traverse through other components.

    After every selected ingredient add/deletion, the component sends
    a post request to the server, which saves the user's search and
    returns suggested ingredients
*/

class IngredientsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '', // used to collect user input
    };
  }
  componentDidMount() { // auto-select input box
    ReactDOM.findDOMNode(this.refs.searchBox).focus();
    this.onSubmitIngredients();
  }
  onIngredientChange(e) { // captures user's input after each keystroke
    this.setState({
      ingredient: e.target.value,
    });
  }
  onKeyPress(e) { // listen for & submit on return statement in user input
    if (e.keyCode === 13) {
      this.onAddIngredient(this.state.ingredient);
    }
  }
  onAddIngredient(addedIngredient, key) { // add selected ingredients
    if (this.props.selectedIngredients.indexOf(addedIngredient) < 0) {
      if (key !== undefined) { // if key is defined, ingredient was a suggested ingredient
        let newSuggested = this.props.suggestedIngredients.slice();
        newSuggested = newSuggested.splice(key, 1)[0][0];
        this.props.updateSelectedIngredients(
          [...this.props.selectedIngredients, newSuggested],
          () => (this.onSubmitIngredients));
      } else { // if key undefined, the added ingredient is from input box
        this.props.updateSelectedIngredients([...this.props.selectedIngredients, addedIngredient],
          () => (this.onSubmitIngredients));
      }
    }
    this.setState({ ingredient: '' }, () => (this.onSubmitIngredients())); // reset input box to ''
  }
  onRemoveIngredient(addedIngredient, key) { // removes ingredient from user's selected ingredients
    const newState = this.props.selectedIngredients.slice();
    newState.splice(key, 1);
    this.props.updateSelectedIngredients(newState, () => (this.onSubmitIngredients));
    // get updated suggestions from database
  }
  onSubmitIngredients() { // send ingredients to server
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
        <h2>Ingredients</h2>
        <div className="row">
          <div className="input-field col s10 m10 l10">
            <input
              ref="searchBox"
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
