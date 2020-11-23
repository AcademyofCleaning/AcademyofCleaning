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
  DropdownItem,
  NavbarText
} from 'reactstrap';
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
              <NavLink href="/getCertified/">Get Certified</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>
                Learn More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Cleaner
                </DropdownItem>
                <DropdownItem>
                  Company
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                My Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/profiles/:id">
                  Edit info
                </DropdownItem>
                <DropdownItem href="/profiles/preferences/:id">
                  View preferences
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/signout/:id">
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
