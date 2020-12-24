import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

const NavigationBar = ({user}) => {

  const login = () => {
    fetch(`/user/login`)
    .then(res => res.json())
    .then(res => {
      window.location = `${res.redirectUrl}`;
    })
  }

  const logout = () => {
    fetch(`/logout`, {
      method: 'POST',
    })
    .then(res => res.json())
    .then(res => {
      // window.location = `${res.redirectUrl}`;
    })
  }


  return (
    <Container fluid>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Orimage</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/about">Explore</NavLink>
          </NavItem>
          {user && <NavItem>
            <NavLink href="/personal">Personal</NavLink>
          </NavItem>}
        </Nav>
        {/* {!user && <NavLink onClick={login}>Login</NavLink>} */}
        {!user && <NavLink href={'/login'}>Login</NavLink>}
        {user && <NavbarText> hi {user.firstName} {user.lastName} </NavbarText> }
        {user && <NavLink onClick={logout}>Logout</NavLink>}
      </Navbar>
      <pre>
      {JSON.stringify(user, null, 2)}
      </pre>
    </Container>
  );
}

export default NavigationBar;