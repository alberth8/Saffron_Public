import React, { Component, PropTypes }  from 'react';
import { reduxForm } from 'redux-form';
// To be added: 
// Every time ingredient is added, update store
// Also, send it to database to get updated
// suggested ingredients & recipes

class SearchBar extends Component {
  render() {
    const {
      fields: {ingredient}, handleSubmit, resetForm, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Add Ingredient</label>
          <div>
            <input type="text" placeholder="Ingredient" {...ingredient}/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting} onClick={resetForm}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
};

SearchBar.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

SearchBar = reduxForm({
  form: 'search',
  fields: ['ingredient']
})(SearchBar);

export default SearchBar;
