import React from 'react';
import SearchItems from '../searchItems/searchItem'
import './navBar.scss';

export default  function Navbar() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-brand">
          <div className="logo"></div>
        </div>
        <div className="search-input-container">
          <SearchItems></SearchItems>
        </div>
      </div>
    );
    
}

