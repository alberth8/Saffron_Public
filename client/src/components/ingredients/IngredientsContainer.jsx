import React, { Component} from 'react';
import { connect } from 'react-redux';
import IngredientsLayout from './components/IngredientsLayout.jsx';
// To be added:
// connect component to redux

class IngredientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: 
        {selected: ['SALT', 'CHICKEN', 'Other stuff'],
         suggested: ['PEPPER', 'hotdogs', 'chicken thighs']
      }
      //this.props.ingredients,
    };
    this.updateIngredients.bind(this);
  }

  componentWillMount() {
    this.getIngredients('load', 'null');
  }

  updateIngredients (event, ingredient) {

    console.log('updateIngredients!!!!!!!', event, ingredient);
    // exists in selected ingredients & searchbox containers sends updated ingredients list to server updates state
    // event === 'Add' ? add(ingredient): remove(ingredient);
  }
  
  render() {
    return (
      <div>
        <IngredientsLayout 
          ingredients={this.state.ingredients}
          updateIngredients={this.updateIngredients}
        />
      </div>
    )
  };
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    ingredients: state.ingredients,
  }
}

IngredientsContainer.propTypes = {
  ingredients: React.PropTypes.object,
};

export default connect(mapStateToProps)(IngredientsContainer);
// const mapDispatchToProps = (/* dispatch */) => {
//   return {
//     onClick: () => { console.log('Listing was clicked'); },
//   };
// };
