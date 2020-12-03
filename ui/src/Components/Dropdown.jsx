import React from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Dropdown = () => (
    <React.Fragment>
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
              </React.Fragment>
);

export default Dropdown;