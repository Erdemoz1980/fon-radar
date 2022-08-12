import React, {useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  }


  return (
    <Navbar bg="dark"  variant="dark" expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Fon Radar Home</Navbar.Brand>
        </LinkContainer>
     
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.companyName} id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
              </NavDropdown>
              
              <LinkContainer to='userlist'>
                  <Nav.Link>Musteri Listesi</Nav.Link>
              </LinkContainer>
              </>
              
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Giris Yap
                  </Nav.Link>
                </LinkContainer>
              )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header