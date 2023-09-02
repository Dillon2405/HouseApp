//Imports
import React from "react";

// BootStrap Imports
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Function to display navbar
export default function Menu() {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary justify-content-between ">
      <Container fluid>
        
        <Navbar.Brand href="/">House App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 ml-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/create">
               Add Item
             </NavLink>
            <NavDropdown title="Manage Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/createProduct">Create New Product</NavDropdown.Item>
              <NavDropdown.Item href="/productList">
                Product List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/categoryList">
                Product Categories
              </NavDropdown.Item>
              <NavDropdown.Item href="/createCategory">
                Create Categories
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Inventory"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}


