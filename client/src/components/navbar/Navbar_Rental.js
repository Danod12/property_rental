import React from "react";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { AdContext } from "../Contexts/AdContext";
import ProtectedRoutes from "../../pages/ProtectedRoutes";

import Rent from "../../pages/Rent";
import Login from "../../pages/Login";
import Update from "../../pages/Update";
import MyAd from "../../pages/MyAd";
import Ad_Highlight from "../../pages/Ad_highlight";
import Create_ad from "../../pages/Create_ad";

import Profile from "../../pages/Profile";

function Navbar_Rental({
  userId,
  isAuth,
  setUserId,
  setIsAuth,
  adId,
  setAdId,
}) {
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

          <Nav.Item>
            <Nav.Link as={Link} to={"/create"}>
              Create Ad
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to={"/myadverts"}>
              My Ads
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </Router>
  );
}

export default Navbar_Rental;
