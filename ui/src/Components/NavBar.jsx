import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import NavBarAuthenticationButton from './NavBarAuthenticationButton';
import './App.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar-dark navbar-custom" light expand="md">
        <h1>
        <NavbarBrand href="/">Academy of Cleaning</NavbarBrand>
        </h1>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/search/">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/learn/">Learn</NavLink>
            </NavItem>
            <UncontrolledDropdown>
              <NavBarAuthenticationButton />
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
