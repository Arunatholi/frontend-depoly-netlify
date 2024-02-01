import React from 'react'
import{Container, Nav, Navbar, } from 'react-bootstrap';
import"./Header.css"
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userLogout } from './redux/userAuth';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';
function Header() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = ()=>{
    dispatch(userLogout());
    cookies.remove("token")
    Navigate("/login")
  }
  return (
    
    <Navbar expand="lg" className="bg-dark ">
    <Container>
      <Navbar.Brand as={Link}to="/">New-Resturent</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link}to="/">Home</Nav.Link>
          <Nav.Link as={Link}to="/about">About</Nav.Link>
          <Nav.Link as={Link}to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link}to="/Add">Add</Nav.Link>
          <Nav.Link as={Link}to="/register">Register</Nav.Link>
          
          <Nav.Link as={Link}to="/users">Users</Nav.Link>
          
         


        </Nav>

        <nav className='ms-auto'>
          {isAuthenticated ?<button onClick={handleLogout}>Logout</button>:
          <Nav.Link as={Link}to="/login"><button>Login</button></Nav.Link>}
        

        </nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
