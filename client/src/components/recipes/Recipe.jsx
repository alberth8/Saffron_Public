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
      url: this.props.recipeUrl,
      user: this.props.user.id,
    }).then(() => {
      this.setState({
        faved: true,
      });
    }).catch((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="pure-u-1-3">
        <li>
          <div className="recipe-img-container">
            <div className="recipe-img">
              <img className="pure-img" alt="recipe" src={this.props.recipe.recipeImgUrl} />
            </div>
            <div className="recipe-txt">
              {this.props.recipe.recipeTitle}
            </div>
            {!this.state.faved ?
              <button className="recipe-fave" onClick={(e) => { this.saveFav(e); }}>&#9829;</button>
            : null}
          </div>
        </li>
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
