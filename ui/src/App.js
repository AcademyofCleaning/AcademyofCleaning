import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CreateProfile from "./Components/CreateProfile";
import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar';


// rendering app
function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/">
          <NavBar />
          <HomePage />
        </Route>
        <Route exact path="/createProfile">
          <NavBar />
          <CreateProfile />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
