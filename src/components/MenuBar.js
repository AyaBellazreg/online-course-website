import React, { useState, useEffect } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory} from 'react-router-dom'
import { Container } from "react-bootstrap"
import Logo from '../img/logo.jpg'

function MenuBar() {

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("")
    const history = useHistory()

    //Handle Logout
    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    //Conditioning SIGN IN and LOGOUT in Navbar
    const signInNav = currentUser ?  
        <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
    :
        <Nav.Link as={Link} to="/login">Log In</Nav.Link>;
    //Conditioning Dashboard in Menu
    const dashboardMenu = currentUser ? 
    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
      :
    null;

    return (
        <div>
        <Navbar scrolling expand="md" bg="white" variant="light">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="electricity"
                    />
                    Electricity Courses
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="">Our School</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        <Nav.Link as={Link} to="">Contact</Nav.Link>
                        {dashboardMenu}
                        {signInNav}       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}

export default MenuBar
