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
    console.log(this.props.recipe.url);
    console.log(this.props.user.id);
    axios.post('/api/saveFav', {
      url: this.props.url,
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
            <h3>Name: {this.props.recipe.name}</h3>
            <img alt="error" src={this.props.recipe.photo} />
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
  url: PropTypes.string,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Recipe);
