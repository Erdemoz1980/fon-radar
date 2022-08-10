import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="dark"  variant="dark" expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Fon Radar Home</Navbar.Brand>
        </LinkContainer>
     
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          
         
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={()=>dispatch(logout())}>Logout</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header