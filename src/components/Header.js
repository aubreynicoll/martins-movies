import React from 'react'
import logo from '../assets/images/logo.png'
import hero from '../assets/images/hero2.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const Header = ({ searchQuery, handleSearchFieldChange }) => {
  return (
    <header className="Header-root">
      <Navbar className="Header-navbar" expand="lg">
        <Navbar.Brand href="#"><img className="Header-navbar-logo" src={logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#">Your</Nav.Link>
            <Nav.Link href="#">Links</Nav.Link>
            <NavDropdown title="Here" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Link 1</NavDropdown.Item>
              <NavDropdown.Item href="#">Link 2</NavDropdown.Item>
              <NavDropdown.Item href="#">Link 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>     
          <Form inline>
            <FormControl 
              onChange={({target}) => handleSearchFieldChange(target.value)} 
              value={searchQuery} 
              type="text" 
              placeholder="Search" 
              className="mr-sm-2" 
            />
          </Form>
        </Navbar.Collapse>   
      </Navbar>
      
      <div className="Header-hero">
        <img className="Header-hero-img" src={hero} alt="" />
      </div>
    </header>
  )
}

export default Header