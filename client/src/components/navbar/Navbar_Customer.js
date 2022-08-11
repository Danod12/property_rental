import React from "react";
import Nav from "react-bootstrap/Nav";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Logo from "../../assets/images/main_logo.png";

import Profile from "../../pages/Profile";

function Navbar_Customer({ isAuth, setIsAuth, userId, setUserId }) {
  return (
    <div>
      <header>
        <nav class="navbar sticky-nav navbar-expand-md  navbar-light bg-white ml-3 ">
          <div class="container navbar.center .navbar-inner ">
            <a href="/" class="navbar-brand mb-0 h1">
              <img src={Logo} height="100"></img>
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
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

                  <Nav.Item>
                    <Nav.Link as={Link} to={"/update"}>
                      Update Profile
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link as={Link} to={`/profile/${userId}`}>
                      Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar_Customer;
