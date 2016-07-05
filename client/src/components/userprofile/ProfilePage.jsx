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
      changePass: false,
      newPass: '',
    };
    this.toggleFavs = this.toggleFavs.bind(this);
    this.toggleNewPass = this.toggleNewPass.bind(this);
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

  onPasswordChange(e) {
    this.setState({
      newPass: e.target.value,
    });
  }

  onKeyPress() {
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

  toggleNewPass() {
    if (this.state.changePass) {
      this.setState({
        changePass: false,
      });
    } else {
      this.setState({
        changePass: true,
      });
    }
  }

  changePassword() {
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
        <div>
          <button onClick={this.toggleNewPass}>Change password</button>
          {this.state.changePass ?
            <div>
              <form>
                <fieldset>
                  <label>New Password</label>
                  <input
                    type="text"
                    value={this.state.newPass}
                    onChange={(e) => { this.onPasswordChange(e); }}
                    onKeyDown={(e) => { this.onKeyPress(e); }}
                  />
                </fieldset>
              </form>
              <button onClick={this.changePassword}>Change password</button>
            </div>
          : null}
        </div>
        <h3>Your Favorites</h3>
        {this.state.favRecipes ?
          this.renderFavs()
          : null}
        {!this.state.showAll ?
          <button onClick={this.toggleFavs}>Show all</button>
          : <button onClick={this.toggleFavs}>Close</button>
        }
        <h3>Recommendations</h3>
        <h3>Most Popular</h3>
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
