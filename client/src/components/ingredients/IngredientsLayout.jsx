import React from 'react';
import SearchBar from './components/SearchBar.jsx';
import IngredientsView from './components/IngredientsView.jsx';

const IngredientsLayout = () => (
  <div>
    <SearchBar />
    <IngredientsView />
  </div>
);

export default IngredientsLayout;
