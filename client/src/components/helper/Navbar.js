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

const NavigationBar = ({user, loginStatusChange}) => {

  const login = () => {
    fetch(`/user/login`)
    .then(res => res.json())
    .then(res => {
      window.location = `${res.redirectUrl}`;
    })
  }

  const logout = () => {
    fetch(`/user/logout`)
    .then(res => res.json())
    .then(res => {
      loginStatusChange();
      window.location = `${res.redirectUrl}`;
    })
    .catch(err => {
      console.log(err)
    });
  }


  return (
    <Container fluid>
      <Navbar className="sticky-nav" color="dark" dark expand="md">
        <NavbarBrand href="/">Orimage</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/explore">Explore</NavLink>
          </NavItem>
          {/* {<NavItem>
            <NavLink href="/personal">Personal</NavLink>
          </NavItem>} */}
          {user && <NavItem>
            <NavLink href="/personal">Personal</NavLink>
          </NavItem>}
        </Nav>
        {!user && process.env.NODE_ENV === "development" && <NavLink onClick={login}>Login</NavLink>}
        {!user && process.env.NODE_ENV === "production" && <NavLink href={'/login'}>Login</NavLink>}
        {user && <NavbarText> Hi {user.firstName} {user.lastName} </NavbarText> }
        {user && <NavLink onClick={logout}>Logout</NavLink> }
      </Navbar>
      {/* <pre>
      {JSON.stringify(user, null, 2)}
      {process.env.NODE_ENV}
      </pre> */}
    </Container>
  );
}

export default NavigationBar;