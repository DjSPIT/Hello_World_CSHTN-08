import React, {useContext} from 'react';
// We have to create a link for the logos like an a tag in HTML

import PropTypes from 'prop-types';

// Routing
import { Link } from "react-router-dom";

// Images for the logos
import HeaderLogo from '../../images/logo.png';

// Styles for the header
import {Wrapper, Content, LogoImg } from './Header.styles';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (

  <Wrapper>
    <Navbar bg="dark" variant={"dark"} expand="lg">
      <Navbar.Brand href="/"><LogoImg src={HeaderLogo} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Link to='/' ><Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item></Link>
          <Link to='/about'><Nav.Item><Nav.Link href="/">About</Nav.Link></Nav.Item></Link>
          <Link to='/courses'><Nav.Item><Nav.Link href="/">My Courses</Nav.Link></Nav.Item></Link>
          <Link to='/login'><Nav.Item><Nav.Link href="/">Login</Nav.Link></Nav.Item></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Wrapper>

);

export default Header;