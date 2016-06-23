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

  render() {
    return (
      <div>
        <input
          value={this.state.ingredient}
          onSubmit={this.props.addIngredient(this.state.ingredient)}
        />
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
  addIngredient: PropTypes.func,
};

export default connect(mapStateToProps, actions)(SearchBar);
