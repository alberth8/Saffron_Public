import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FavRecipes from './FavRecipes.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favRecipes: null,
      showAll: false,
    };
    this.toggleFavs = this.toggleFavs.bind(this);
    this.renderFavs = this.renderFavs.bind(this);
  }

  componentWillMount() {
    axios.post('/api/getFavs', { user: this.props.user.id })
    .then((response) => {
      this.setState({
        favRecipes: response.data,
      });
    }).catch((response) => {
      console.log(response);
    });
  }

  toggleFavs() {
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
    if (this.state.favRecipes.length > 4 && this.state.showAll) {
      return (
        <ul>
          {this.state.favRecipes.map((recipe, index) =>
            <FavRecipes favRecipe={recipe} key={index} />
          )}
        </ul>
      );
    }

    if (this.state.favRecipes.length >= 4 && !this.state.showAll) {
      return (
        <ul>
          <FavRecipes favRecipe={this.state.favRecipes[0]} />
          <FavRecipes favRecipe={this.state.favRecipes[1]} />
          <FavRecipes favRecipe={this.state.favRecipes[2]} />
          <FavRecipes favRecipe={this.state.favRecipes[3]} />
        </ul>
      );
    }

    if (this.state.favRecipes.length < 4) {
      return (
        <ul>
          {this.state.favRecipes.map((recipe, index) =>
            <FavRecipes favRecipe={recipe} key={index} />
          )}
        </ul>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <h3>Your Favorites</h3>
        {this.state.favRecipes ?
          this.renderFavs()
          : null}
        {!this.state.showAll ?
          <button onClick={this.toggleFavs}>Show all</button>
          : <button onClick={this.toggleFavs}>Close</button>
        }
      </div>
		);
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object,
};


export default connect(mapStateToProps)(ProfilePage);
