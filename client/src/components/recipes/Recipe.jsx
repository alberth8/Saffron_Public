import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faved: false,
    };
  }

  saveFav(e) {
    e.preventDefault();
    axios.post('/api/saveFav', {
      recipe: this.props.recipe.recipeTitle,
      user: this.props.user.id,
      recipeId: this.props.recipe.id,
    }).then(() => {
      this.setState({
        faved: true,
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="col s1 m2 l3">
        <div className="card small hoverable">
          <div className="card-image">
            <img alt="recipe" src={this.props.recipe.recipeImgUrl} />
          </div>
          <div className="card-content">
            {this.props.recipe.recipeTitle}
            {!this.state.faved ?
              <img
                className="btn-heart"
                onClick={(e) => { this.saveFav(e); }}
                alt="recipe"
                src="./oie_transparent.png"
              />
            : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

Recipe.propTypes = {
  recipe: PropTypes.object,
  recipeUrl: PropTypes.string,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Recipe);
