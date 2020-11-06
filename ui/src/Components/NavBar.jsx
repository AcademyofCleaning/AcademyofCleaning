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

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Academy of Cleaning</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/search/">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/getCertified/">Get Certified</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/AcademyofCleaning/AcademyofCleaning">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More Info
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
          </Nav>
<<<<<<< HEAD
          <NavbarText>
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                My Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/profilePage/:id">
                  Edit info
                </DropdownItem>
                <DropdownItem href="/preferences/:id">
                  View preferences
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/signout/:id">
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavbarText>
=======
          <NavbarText>Get Hired!</NavbarText>
>>>>>>> added NavBar component and added Jumbotron to homepage
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
