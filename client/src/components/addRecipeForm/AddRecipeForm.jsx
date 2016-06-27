import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';

class AddRecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { // NEED USER EMAIL
      recipeTitle: '',
      recipeUrl: '',
      recipeImgUrl: '',
      recipeIngredients: [],
    };
  }

  handleChange(name, e) {
    console.log('HANDLINGCHANGE');
    console.log('handlechangetargetvalue:', e.target.value);
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleSubmit() {
    console.log(this.state.recipeTitle);
    console.log(this.state);
    this.props.addRecipe(this.state);
    this.setState({
      recipeTitle: '',
      recipeUrl: '',
      recipeImgUrl: '',
      recipeIngredients: '',
    });
  }

  render() {
    return (
      <div>
        <form>
          Title:
          <input
            onChange={(e) => this.handleChange('recipeTitle', e)}
              // this.handleChange.bind(this, 'recipeTitle')
            value={this.state.recipeTitle}
            type="text"
          /><br />
          URL:
          <input
            onChange={(e) => this.handleChange('recipeUrl', e)}
            // this.handleChange.bind(this, 'recipeTitle')
            // onChange={this.handleChange.bind(this, 'recipeUrl')}
            value={this.state.recipeUrl}
            type="text"
          /><br />
          Image URL:
          <input
            onChange={(e) => this.handleChange('recipeImgUrl', e)}
            // this.handleChange.bind(this, 'recipeImgUrl')
            // onChange={this.handleChange.bind(this, 'recipeImgUrl')}
            value={this.state.recipeImgUrl}
            type="text"
          /><br />
          Ingredients:
          <input
            onChange={(e) => this.handleChange('recipeIngredients', e)}
            // this.handleChange.bind(this, 'recipeIngredients')
            // onChange={this.handleChange.bind(this, 'recipeIngredients')}
            value={this.state.recipeIngredients}
            type="text"
          /><br />
        </form>
        <button onClick={() => this.handleSubmit()} type="submit">Submit</button>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  addRecipe: PropTypes.func,
};

export default connect(null, actions)(AddRecipeForm);
