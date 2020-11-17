import React from 'react';
import './App.css';
import {
  Route,
  Switch,
} from "react-router-dom";
import HomePage from './Components/HomePage';
import ProfilePage from './Components/ProfilePage';
import SearchCandidates from './Components/SearchCandidates';
import NavBar from './Components/NavBar';
import { Loading } from './Components/auth/Loading';
import Profile from './views/profile';
import ProtectedRoute from './auth/ProtectedRoute';

/* Auth0 dependency */
import { useAuth0 } from '@auth0/auth0-react';

// rendering app
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      {/* <NavBar /> */}
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <ProtectedRoute exact path="/profiles/:id" component={ProfilePage} />
          <ProtectedRoute exact path="/search" component={SearchCandidates} />
          <ProtectedRoute path="/auth0-profile" component={Profile} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
