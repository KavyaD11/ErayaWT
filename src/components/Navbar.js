import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BootstrapNavbar 
      expand="lg" 
      fixed="top" 
      className={`${scrolled ? 'shadow-sm' : ''}`}
      variant="dark"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          <img 
            src="Group 2.png" 
            alt="ERAYA Logo" 
            height="50" 
            className="d-inline-block align-top me-2"
          />
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/customize">Customize</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            className="ms-3"
            as={Link}
            to="/signin"
          >
            Sign Up
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;