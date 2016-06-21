import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Recipe from './Recipe.jsx'

const Recipes = (prop) => {
  const testData = {
    recipes: [
      {
        name: 'Pea Soup',
        photo: 'http://www.101cookbooks.com/mt-static/images/food/split_pea_soup_recipe.jpg',
        url: 'http://www.101cookbooks.com/archives/vegetarian-split-pea-soup-recipe.html'
      },
      {
        name: 'Pea Soup',
        photo: 'http://www.101cookbooks.com/mt-static/images/food/split_pea_soup_recipe.jpg',
        url: 'http://www.101cookbooks.com/archives/vegetarian-split-pea-soup-recipe.html'
      }
    ]
  };

  return (
    <div>
      <ul>
        {testData.recipes.map((recipe, i) =>
          <a href={testData.recipes[i].url} key={i} target="_blank">
            <Recipe recipe={recipe} key={i}/>
          </a>
        )}
      </ul>
    </div>
  );
};

// const Recipes = (props) => {
//
//   return (
//     <div>
//       <h1>Recipes</h1>
//       <ul>
//         {props.recipes.map(recipe =>
//           <Recipe recipe={recipe} />
//         )}
//       </ul>
//     </div>
//   );
// };

function mapStateToProps(state) {

  return {
    // recipes: state.recipes,
    // recipeName: state.recipe.name,
    // recipeUrl: state.recipe.url,
    // recipePhoto: state.recipe.photo,
    // recipeLikes: state.recipe.likes
  }

}

export default connect(mapStateToProps)(Recipes);
