import React from 'react';
import './App.css';
import LoginButton from './auth/LoginButton';
import Dropdown from './Dropdown';
import { useAuth0 } from "@auth0/auth0-react";


const NavBarAuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Dropdown /> : <LoginButton />;
};

export default NavBarAuthenticationButton;
