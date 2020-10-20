import React from 'react';
import Navbar from './components/navbar/navBar';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import SearchResults from './components/searchResults/searchResult'
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <header className="nav-bar">
          <Navbar></Navbar>
        </header>
        <main>
          <Router>
            <Switch>
              {/* <Route exact path="/:search" component={SearchResults}></Route> */}
              <Route exact path="/:search" component={SearchResults}></Route>
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
