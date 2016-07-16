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
      let ing = this.state.ingredient;
      ing = ing.replace(/[^a-zA-Z ]/g, '');
      this.onAddIngredient(ing);
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
        this.props.updateSelectedIngredients(
          [...this.props.selectedIngredients, addedIngredient],
          () => (this.onSubmitIngredients));
      }
    }
    this.setState({ ingredient: '' }, () => (this.onSubmitIngredients())); // reset input box to ''
  }
  onRemoveIngredient(addedIngredient, key) { // removes ingredient from user's selected ingredients
    const newState = this.props.selectedIngredients.slice();
    newState.splice(key, 1);
    this.props.updateSelectedIngredients(newState, () => (this.onSubmitIngredients()));
    this.onSubmitIngredients();
  }
  onSubmitIngredients() { // send ingredients to server
    this.props.sendIngredientsToServer(
      this.props.selectedIngredients,
      this.props.user.id,
      this.props.feelingLucky
    );
  }
  mapIngredients(ingredientsArray, selectOrSuggest) {
    return (
      <ul className="spacer">
        <h5>{selectOrSuggest === 'selected' ? 'Selected' : 'Suggested'}</h5>
        {ingredientsArray.map((ingredient, key) => (
          <li className="chip">
            <div
              onClick={selectOrSuggest === 'selected' ?
              () => this.onRemoveIngredient(ingredient, key) :
              () => this.onAddIngredient(ingredient[0], key)
              }
              key={`${key}${selectOrSuggest}`}
              value={selectOrSuggest === 'selected' ? ingredient :
                ingredient[0]
              }
            >
            {selectOrSuggest === 'selected' ? ingredient :
            `${ingredient[0]} (${ingredient[1]} recipes)`}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div className="container fixed">
        <h2>Ingredients</h2>
        <div className="row">
          <div className="col s3 m3 l3">
            <div className="switch">
              <label>
                Default
                <input
                  type="checkbox"
                  onChange={() => {
                    this.props.updateFeelingLucky(!this.props.feelingLucky);
                  }}
                />
                <span className="lever"></span>
                I'm feeling lucky
              </label>
            </div>
            <input
              className="input-field"
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
  feelingLucky: state.feelingLucky,
});

IngredientsView.propTypes = {
  searchType: PropTypes.string,
  feelingLucky: PropTypes.boolean,
  user: PropTypes.object,
  sendIngredientsToServer: PropTypes.func,
  updateSuggestedIngredients: PropTypes.func,
  updateSelectedIngredients: PropTypes.func,
  suggestedIngredients: PropTypes.array,
  selectedIngredients: PropTypes.array,
  updateFeelingLucky: PropTypes.func,
};

export default connect(mapStateToProps, actions)(IngredientsView);
