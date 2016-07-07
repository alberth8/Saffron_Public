import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FavRecipes from './FavRecipes.jsx';
import RecommendedRecipes from './RecommendedRecipes.jsx';
import PopularRecipes from './PopularRecipes.jsx';
import * as actions from '../../redux/actions/index.js';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favRecipes: null,
      showAll: false,
      newPass: '',
    };
    this.toggleFavs = this.toggleFavs.bind(this);
    this.renderFavs = this.renderFavs.bind(this);
  }

  componentWillMount() {
    // gets users favorite recipes before component mounts
    axios.post('/api/getFavs', { user: this.props.user.id })
    .then((response) => {
      this.setState({
        favRecipes: response.data,
      });
    }).catch((error) => {
      console.error(error);
    });
    // gets recommondations for current user
    this.props.getRecommondation(this.props.user.id);
  }

  toggleFavs() {
    // toggels how many of the users favorite recipes are show
    // from just four or less to all of them
    if (this.state.showAll) {
      this.setState({
        showAll: false,
      });
    } else {
      this.setState({
        showAll: true,
      });
    }
  }

  renderFavs() {
    // function that decides how many favorite recipes to show when user first goes to profile page
    if (this.state.favRecipes.length > 3 && this.state.showAll) {
      return (
        <div className="container">
          <h2 className="recipes-title">Favorites</h2>
          <div className="row">
            {this.state.favRecipes.map((recipe, index) =>
              <a href={recipe.recipeUrl} key={index} target="_blank">
                <FavRecipes favRecipe={recipe} key={index} />
              </a>
            )}
          </div>
        </div>
      );
    }

    if (this.state.favRecipes.length >= 3 && !this.state.showAll) {
      return (
        <div className="container">
          <h2 className="recipes-title">Favorites</h2>
          <div className="row">
            <a href={this.state.favRecipes[0].recipeUrl} target="_blank">
              <FavRecipes favRecipe={this.state.favRecipes[0]} />
            </a>
            <a href={this.state.favRecipes[1].recipeUrl} target="_blank">
              <FavRecipes favRecipe={this.state.favRecipes[1]} />
            </a>
            <a href={this.state.favRecipes[2].recipeUrl} target="_blank">
              <FavRecipes favRecipe={this.state.favRecipes[2]} />
            </a>
          </div>
        </div>
      );
    }

    if (this.state.favRecipes.length < 3) {
      return (
        <div className="container">
          <h2 className="recipes-title">Favorites</h2>
          <div className="row">
            {this.state.favRecipes.map((recipe, index) =>
              <a href={recipe.recipeUrl} key={index} target="_blank">
                <FavRecipes favRecipe={recipe} key={index} />
              </a>
            )}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.state.favRecipes ?
          this.renderFavs()
          : null}
        {!this.state.showAll ?
          <button onClick={this.toggleFavs}>Show all</button>
          : <button onClick={this.toggleFavs}>Close</button>
        }
        {Object.keys(this.props.recom).length > 0 ?
          <div className="container">
            <h2 className="recipes-title">Recipes you might like</h2>
            <div className="row">
              {this.props.recom.map((recipe, index) =>
                <a href={recipe.recipeUrl} key={index} target="_blank">
                  <RecommendedRecipes recRecipe={recipe} key={index} />
                </a>
              )}
            </div>
          </div>
        : null}
        <div className="container">
          <h2 className="recipes-title">Popular recipes</h2>
          <div className="row">
            {this.props.pops.map((recipe, index) =>
              <a href={recipe.recipeUrl} key={index} target="_blank">
                <PopularRecipes popRecipe={recipe} key={index} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    recom: state.recom,
    pops: state.pops,
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  getRecommondation: PropTypes.func,
  recom: PropTypes.object,
  pops: PropTypes.object,
};


export default connect(mapStateToProps, actions)(ProfilePage);
