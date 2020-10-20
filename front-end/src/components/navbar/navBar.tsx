import React from 'react';
import './navBar.scss';

class Navbar extends React.Component {
    render() {
      return (
        <div className="nav-bar-container">
          <div className="nav-bar-brand">
            <div className="logo"></div>
          </div>
          <div className="search-input-container">
            <form role="search">
              <input type="text" className="search-input" placeholder="Nunca dejes de buscar"/>
              <button className="search-input-button" type="submit"><div role="img" aria-label="Buscar"></div></button>
            </form>
          </div>
        </div>
      );
    }
}

export default Navbar;
