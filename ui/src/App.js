import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CreateProfile from "./Components/CreateProfile";
import HomePage from './Components/HomePage';


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
      </Switch>
        
      </div>
    </Router>
  );
}

export default App;
