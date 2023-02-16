import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

const NavBar = () => {
    return (
        <Navbar collapseOnSelect variant="dark" bg="dark" expand="sm" className="rounded">
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              <img src={logo} alt="logo" className="rounded" height={50}></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default NavBar;