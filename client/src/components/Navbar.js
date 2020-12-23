import React, { useState } from 'react';
import {
  Container,
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

  return (
    <Container fluid>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Orimage</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/about">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
          </NavItem>
        </Nav>
        <NavLink href="/about">Login</NavLink>
      </Navbar>
    </Container>
  );
}

export default Example;