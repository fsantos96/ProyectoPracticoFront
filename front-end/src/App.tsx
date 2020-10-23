import React, { useState } from 'react';
import Navbar from './components/common/UI/navbar/navBar';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import ListResults from './components/listResults/listResults';
import DetailItem from './components/detailItem/detailItem';
import { withRouter } from 'react-router-dom'
import './App.scss';

export default function App(props : any) {
    console.log(props)
    const [categories, setCategories] = useState([]);
    const handlerSubmit = () => {
      
    }
    return (
      <div className="">
        <header className="nav-bar">
          <Navbar></Navbar>
        </header>
        <main>
          <Router>
            <Switch>
            <>
              {/* <Route exact path="/:search" component={SearchResults}></Route> */}
              {/* <Route exact path="/"></Route> */}
              <Route exact path="/items" render={(props => <ListResults categories={categories} setCategories={setCategories} {...props} />)}></Route>
              <Route exact path="/items/:id" render={(props => <DetailItem categories={categories} {...props} />)}></Route>
              </>
            </Switch>
          </Router>
        </main>
      </div>
    );
}


