import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import CreateProfile from "./Components/CreateProfile";


// rendering app
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
        Hello World!   
        </Route>
        <Route exact path="/createProfile">
          <CreateProfile />
        </Route>
      </div>
    </Router>
  );
}

export default App;
