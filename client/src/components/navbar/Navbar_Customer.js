import React from "react";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { useState } from "react";
import Login from "../../pages/Login";
import Rent from "../../pages/Rent";
import Update from "../../pages/Update";
import ProtectedRoutes from "../../pages/ProtectedRoutes";

import Profile from "../../pages/Profile";

function Navbar_Customer({ userId, isAuth, setUserId, setIsAuth }) {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  console.log(userId + "Hello");
  return (
    <Router>
      <div>
        <Nav bg="dark" variant="pills" activeKey="1" onSelect={handleSelect}>
          <Nav.Item>
            <Nav.Link as={Link} to={"/rent"}>
              Rent
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to={`/profile/${userId}`}>
              Profile
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to={"/update"}>
              Update Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </Router>
  );
}

export default Navbar_Customer;
