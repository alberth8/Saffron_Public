import React from 'react';
import { connect } from 'react-redux';
import IngredientsLayout from './components/IngredientsLayout.jsx';

class IngredientsContainer extends React.Component {
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

  updateIngredients (event, ingredient) {
    // exists in selected ingredients & searchbox containers sends updated ingredients list to server updates state
    // event === 'Add' ? add(ingredient): remove(ingredient);
  }
  
  render() {
    return (
      <div>
        <IngredientsLayout 
          ingredients={this.state.ingredients}
          updateIngredients={this.updateIngredients} // handed additions/deletions from ingredient search
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
