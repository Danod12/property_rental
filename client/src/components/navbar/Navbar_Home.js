import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Logo from "../../assets/images/main_logo.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Navbar({ userId }) {
  return (
    <div>
      <header>
        <nav class="navbar sticky-nav navbar-expand-md bg-white ml-3 ">
          <div class="container  navbar.center .navbar-inner ">
            <div class="collapse navbar-collapse " id="navbarNav">
              <a href="/" class="navbar-brand mb-0 h1">
                <img src={Logo} height="100" width="150"></img>
              </a>
              <ul class="navbar-nav ms-auto">
                <Nav
                  className="justify-content-center py-4 ms-auto "
                  activeKey="1"
                >
                  <Nav.Item>
                    <Nav.Link as={Link} to={"/"}>
                      Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link as={Link} to={"/rent"}>
                      Rent
                    </Nav.Link>
                  </Nav.Item>

                  <NavDropdown title="Login" id="nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={"/login"}>
                        Renter
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={"/login_agency"}>
                        Rental Agency
                      </Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Register" id="nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={"/registration/customer"}>
                        Renter
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={"/registration/rental_agency"}>
                        Rental Agency
                      </Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
