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

  handleSubmit(e) {
    console.log(this.state.recipeTitle);
    console.log(this.state);
    e.preventDefault();
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
      <div className="container">
        <h2>Add Recipe</h2>
        <div className="row">
          <form className="col s10 m10 l10">
            <input
              className="input-field"
              placeholder="Recipe Title"
              onChange={(e) => this.handleChange('recipeTitle', e)}
                // this.handleChange.bind(this, 'recipeTitle')
              value={this.state.recipeTitle}
              type="text"
            /><br />
            <input
              className="input-field"
              placeholder="Recipe URL"
              onChange={(e) => this.handleChange('recipeUrl', e)}
              // this.handleChange.bind(this, 'recipeTitle')
              // onChange={this.handleChange.bind(this, 'recipeUrl')}
              value={this.state.recipeUrl}
              type="text"
            /><br />
            <input
              className="input-field"
              placeholder="Recipe Image URL"
              onChange={(e) => this.handleChange('recipeImgUrl', e)}
              // this.handleChange.bind(this, 'recipeImgUrl')
              // onChange={this.handleChange.bind(this, 'recipeImgUrl')}
              value={this.state.recipeImgUrl}
              type="text"
            /><br />
            <input
              className="input-field"
              placeholder="Ingredients"
              onChange={(e) => this.handleChange('recipeIngredients', e)}
              // this.handleChange.bind(this, 'recipeIngredients')
              // onChange={this.handleChange.bind(this, 'recipeIngredients')}
              value={this.state.recipeIngredients}
              type="text"
            /><br />
            <button
              className="btn waves-effect waves-light btn-login"
              onClick={(e) => this.handleSubmit(e)} type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  addRecipe: PropTypes.func,
};

export default connect(null, actions)(AddRecipeForm);
