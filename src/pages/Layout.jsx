import { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useAuth } from "../service/authProvider";

export function Layout() {
  let auth = useAuth();
  let navigate = useNavigate();
  const logout = () => {
    auth.signout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
      navigate("/");
    });
  };

  return (
    <Container>
      {/* <AuthStatus /> */}
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">HORIZON BUILDERS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                ABOUT
              </Nav.Link>
              <Nav.Link as={Link} to="/build">
                BUILDINGS
              </Nav.Link>
              <Nav.Link as={Link} to="/apartment">
                APARTMENT
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                CONTACT
              </Nav.Link>
              {auth.user ? (
                <Fragment>
                  <Nav.Link as={Link} to="/settings">
                    Settings
                  </Nav.Link>
                  {auth.user.position.name === "admin" ? (
                    <NavDropdown title="Admin" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/user">
                        User
                      </NavDropdown.Item>                 
                      <NavDropdown.Item as={Link} to="/position">
                        Position
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addBuild">
                        Add Building
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addApartment">
                        Add Apartment
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/purcase">
                        Check purcase
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addNews">
                        Add news
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/global">
                        Global type
                      </NavDropdown.Item>
                      
                      <NavDropdown.Item as={Link} to="/product">
                        Product
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                </Fragment>
              ) : null}
            </Nav>
            <Nav>
              {auth.user ? (
                <Fragment>
                  <Nav.Link eventKey={2} href="#">
                    {auth.user.firstName}
                  </Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                </Fragment>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>

        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul> */}

      <Outlet />
    </Container>
  );
}
