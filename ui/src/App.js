import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from './Components/HomePage';
import CreateProfile from "./Components/CreateProfile";
import SearchCandidates from './Components/SearchCandidates';

// rendering app
function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/createProfile">
          <CreateProfile />
        </Route>
        <Route exact path="/search">
          <SearchCandidates />
        </Route>
      </Switch>
       
       </div>
    </Router>
  );
}


export default App;
