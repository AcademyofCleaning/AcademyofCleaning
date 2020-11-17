import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  ProtectedRoute,
  Route,
  Switch,
} from "react-router-dom";
// import { CreateProfile, HomePage, ProfilePage, SearchCandidates } from './Components';
import { NavBar } from './Components/auth/NavBar';
import { Loading } from './Components/auth/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './views/profile';

// rendering app
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <ProtectedRoute path="/profile" component={Profile} /> */}
          {/* <ProtectedRoute path="/external-api" component={ExternalApi} /> */}
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
    // <Router>
    //   <div className="App">
    //   <Switch>
    //     <Route exact path="/">
    //       <HomePage />
    //     </Route>
    //     <Route exact path="/profiles/create">
    //       <CreateProfile />
    //     </Route>
    //     <Route exact path="/profiles/:id" component={ProfilePage}/>
    //     <Route exact path="/search">
    //       <SearchCandidates />
    //     </Route>
    //   </Switch>
    //   </div>
    // </Router>
  );
}


export default App;
