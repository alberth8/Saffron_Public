import React from 'react';
import IngredientsView from '../ingredients/IngredientsView.jsx';
import Recipes from '../recipes/Recipes.jsx';

export default () => (
  <div className="container">
    <div className="row">
      <div className="col s4 left">
        <IngredientsView />
      </div>
      <div className="col s8 right">
        <Recipes />
      </div>
    </div>
  </div>
);
