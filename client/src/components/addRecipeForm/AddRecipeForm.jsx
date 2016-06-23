import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js'

class AddRecipeForm extends React.Component {

  constructor(props){
    super(props);
    this.state = { // NEED USER EMAIL
      recipeTitle: '',
      recipeUrl: '',
      recipeImgUrl: '',
      recipeIngredients: []
    }
  }

  // getInitialState () {
  //   return {

  //   }
  // }


  handleChange (name, e) {
    console.log('HANDLINGCHANGE')
    console.log('handlechangetargetvalue:', e.target.value);
    var change = {};
    change[name] = e.target.value
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
      recipeIngredients:''
    })
  }

  render() {
    return ( 
      <div>
        <form>
          Title:
          <input onChange={this.handleChange.bind(this, 'recipeTitle')} value={this.state.recipeTitle} type="text"/><br/>
          URL:
          <input onChange={this.handleChange.bind(this, 'recipeUrl')} value={this.state.recipeUrl} type="text"/><br/>
          Image URL:
          <input onChange={this.handleChange.bind(this, 'recipeImgUrl')} value={this.state.recipeImgUrl} type="text"/><br/>
          Ingredients:
          <input onChange={this.handleChange.bind(this, 'recipeIngredients')} value={this.state.recipeIngredients} type="text"/><br/>
        </form>
        <button onClick={() => this.handleSubmit()} type="submit">Submit</button>
      </div>
    );
  }
}

export default connect(null, actions)(AddRecipeForm);