import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
    };
  }
  onIngredientChange(e) {
    this.setState({
      ingredient: e.target.value,
    });
  }
  onAddIngredient() {
    const array = ['salt', 'pepper', 'chicken'];
    array.push(this.state.ingredient);
    console.log(array);
    this.props.updateIngredients(array);
  }
  render() {
    return (
      <div>
        <input
          onChange={(e) => { this.onIngredientChange(e); }}
          value={this.state.ingredient}
        />
        <button
          onClick={() => this.onAddIngredient()}
        >Submit</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.selected,
});

SearchBar.propTypes = {
  ingredient: PropTypes.string,
  ingredients: PropTypes.array,
  updateIngredients: PropTypes.func,
};

export default connect(mapStateToProps, actions)(SearchBar);
