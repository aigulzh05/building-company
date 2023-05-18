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
                OUR BUILDINGS
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                CONTACT
              </Nav.Link>
              <Nav.Link as={Link} to="/user">
                User
              </Nav.Link>
              <Nav.Link as={Link} to="/position">
                Position
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {auth.user ? (
                <Fragment>
                  <Nav.Link eventKey={2} href="#">
                    {auth.user.name}
                  </Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                </Fragment>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
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
