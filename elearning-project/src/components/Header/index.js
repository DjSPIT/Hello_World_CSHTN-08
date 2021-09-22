import React, {useContext} from 'react';
// We have to create a link for the logos like an a tag in HTML

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Images for the logos
import HeaderLogo from '../../images/logo.png';

// Styles for the header
import {Wrapper, Content, LogoImg } from './Header.styles';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (

<Navbar bg="dark" variant={"dark"} expand="lg">
  <Navbar.Brand href="#"><LogoImg src={HeaderLogo} /></Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#">About Us</Nav.Link>
      <Nav.Link href="#">Login</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

);

export default Header;