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
              <NavLink href="/preview/">Preview</NavLink>
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
          <NavbarText>Get Hired!</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
