import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class MyNavbar extends Component {
  render() {
    const links = this.props.links.map((link) => (
      <Nav.Link as={NavLink} key={link.href} to={link.href} exact>
        {link.title}
      </Nav.Link>
    ));
    let dropdownMenu = null;
    if (this.props.dropdown) {
      dropdownMenu = (
        <NavDropdown title={this.props.dropdown.title}>
          {this.props.dropdown.items.map((item) => (
            <NavDropdown.Item as={NavLink} key={item.href} to={item.href} exact>
              {item.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      );
    }
    return (
      <Navbar collapseOnSelect variant="light" expand="md">
        <Container>
          <Navbar.Brand
            className="text-primary header"
            style={{ fontWeight: 800 }}
          >
            TEST
            <span className="text-secondary" style={{ fontWeight: 500 }}>
              HUB
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {links}
              {dropdownMenu}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default MyNavbar;
