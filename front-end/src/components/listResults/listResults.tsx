import React from 'react';
import ItemCard from './itemCard/itemCard'
import './listResults.scss';

class ListResults extends React.Component {
  render() {
    return (
      <div className="main-container">
        <div className="breadcrumb-container">
          <span>Componente Breadcrumb</span>
        </div>
        <div className="result-search-container">
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          
          {/* <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard> */}
        </div>
      </div>
    );
  }
}

export default ListResults;