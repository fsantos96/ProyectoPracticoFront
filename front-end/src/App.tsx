import React, { useState } from 'react';
import Navbar from './components/common/UI/navbar/navBar';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import ListResults from './components/listResults/listResults';
import DetailItem from './components/detailItem/detailItem';
import Home from './components/home/home';
import { withRouter } from 'react-router-dom'
import './App.scss';

export default function App(props : any) {
    return (
      <div>
        <Router>
          <Switch>
          <>
            {/* <Route exact path="/:search" component={SearchResults}></Route> */}
            <Route exact path="/" render={(props => <Home {...props} />)}></Route>
            <Route exact path="/items" render={(props => <ListResults {...props} />)}></Route>
            <Route exact path="/items/:id" render={(props => <DetailItem {...props} />)}></Route>
            </>
          </Switch>
        </Router>
      </div>
    );
}


