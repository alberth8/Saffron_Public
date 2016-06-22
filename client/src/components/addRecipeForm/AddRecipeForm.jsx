import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {

  // constructor(props){
  //   super(props);
  // }


  // handleSubmit(data) {
  //   console.log('HEY THERE');
  //   // axios.post('/api/addRecipe', {

  //   //   })
  //   //   .then(function (res) {
  //   //     console.log(res);
  //   //   })
  //   //   .catch(function (err) {
  //   //     console.log(error);
  //   //   });
  // }


  render() {
    const {fields: {recipeTitle, recipeUrl, recipeImgUrl, recipeIngredients}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Title</label>
          <input type="text" placeholder="Recipe title" {...recipeTitle}/>
        </div>
        <div>
          <label>Recipe Link:</label>
          <input type="text" placeholder="Recipe URL" {...recipeUrl}/>
        </div>
        <div>
          <label>Image Link:</label>
          <input type="text" placeholder="Image URL" {...recipeImgUrl}/>
        </div>
        <div>
          <label>Recipe Ingredients</label>
          <input type="email" placeholder="Enter all ingredients associated with the above recipe" {...recipeIngredients}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ContactForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm);

export default ContactForm;