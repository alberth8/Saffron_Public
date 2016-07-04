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
      <div>
        <li>
          <div>
            <h3>Name: {this.props.recipe.recipeTitle}</h3>
            <img alt="error" src={this.props.recipe.recipeImgUrl} />
          </div>
          {!this.state.faved ?
            <button onClick={(e) => { this.saveFav(e); }}>heart</button>
          : null}
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
