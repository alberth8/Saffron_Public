import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faved: false,
    };
  }

  saveFav() {
    this.setState({
      faved: true,
    });
    // axios.post('/api/saveFav', {})
  }


  render() {
    return (
      <div>
        <li>
          <div>
            <h3>Name: {this.props.recipe.name}</h3>
            <img alt="error" src={this.props.recipe.photo} />
          </div>
          <button onClick={this.saveFav}>heart</button>
        </li>
      </div>
    );
  }

}


// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes,
    // recipeName: state.recipe.name,
    // recipeUrl: state.recipe.url,
    // recipePhoto: state.recipe.photo,
    // recipeLikes: state.recipe.likes
//   };
// }

Recipe.propTypes = {
  recipe: PropTypes.object,
};

export default Recipe;
// export default connect(mapStateToProps)(Recipe);
