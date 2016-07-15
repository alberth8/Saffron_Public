import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Recipe from './Recipe.jsx';
import * as actions from '../../redux/actions/index.js';


class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.sendIngredientsToServer([]);
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Recipes</h2>
        <div className="row">
          {this.props.recipes.map((recipe, i) =>
            <a href={recipe.recipeUrl} key={i} target="_blank">
              <Recipe recipe={recipe} key={i} />
            </a>
          )}
        </div>
      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array,
  sendIngredientsToServer: PropTypes.func,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    user: state.user,
  };
}

export default connect(mapStateToProps, actions)(Recipes);
