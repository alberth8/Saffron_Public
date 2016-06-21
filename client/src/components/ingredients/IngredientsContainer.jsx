import React from 'react';
import { connect } from 'react-redux';
import Ingredients from './components/IngredientsLayout.jsx';

class IngredientsContainer extends React.Component {
  constructor() {
    super(props);
    this.state = {
      ingredients: this.props.ingredients,
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
        <h1>IngredientsContainer</h1>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  }
}

IngredientsContainer.propTypes = {
  ingredients: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsContainer);

//         <IngredientLayout 
//           selectedIngredients={this.props.ingredients}
//           updateIngredients={updateIngredients} // handed additions/deletions from ingredient search
//         />
// const mapDispatchToProps = (/* dispatch */) => {
//   return {
//     onClick: () => { console.log('Listing was clicked'); },
//   };
// };
