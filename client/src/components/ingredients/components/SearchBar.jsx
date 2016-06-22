import React, { Component, PropTypes }  from 'react';
import { TextField } from 'material-ui';

// injectTapEventPlugin();
// To be added: 
// Every time ingredient is added, update store
// Also, send it to database to get updated
// suggested ingredients & recipes


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      }
  };

  render() {
    return (
      <div>
        <input
          value={this.state.ingredient}
          onChange={this.props.handleSubmit}
        />
      </div>
    )
  }
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
};

export default SearchBar;
