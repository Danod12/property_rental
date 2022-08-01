import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LoginContext } from "./components/Contexts/LoginContext";
import { AdContext } from "./components/Contexts/AdContext";

import React, { useState } from "react";
import LandingMain from "./pages/Landing_main";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Update from "./pages/Update";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Create_ad from "./pages/Create_ad";
import MyAd from "./pages/MyAd";
import Registration_Landing from "./pages/Registration_Landing";
import Ad_Highlight from "./pages/Ad_highlight";
import Footer from "./components/footer/index";
import Registration_Customer from "./pages/Registration_Customer";

/*
Bootstrap Components
*/
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar_Home from "./components/navbar/Navbar_Home";
import Navbar_Customer from "./components/navbar/Navbar_Customer";
import Navbar_Rental from "./components/navbar/Navbar_Rental";
import Ad_Indv from "./pages/Ad_indv";
import Logo from "../src/assets/images/main_logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
/*thhis is is */

/* */
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [adId, setAdId] = useState(null);

  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <div>
      <Router>
        <Switch>
          <LoginContext.Provider
            value={{ isAuth, setIsAuth, userId, setUserId }}
          >
            {" "}
            <Nav
              className="justify-content-center py-4 ms-auto navbar-color"
              activeKey="1"
              onSelect={handleSelect}
            >
              <Nav.Item>
                <Nav.Link class="navbar-brand" href="#">
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to={"/rent"}>
                  Rent
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to={"/create"}>
                  Create Ad
                </Nav.Link>
              </Nav.Item>

              <NavDropdown title="Login" id="nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link as={Link} to={"/login"}>
                    {" "}
                    Renter
                  </Nav.Link>
                </NavDropdown.Item>

                <NavDropdown.Item>Rental Agency</NavDropdown.Item>
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
            <Route exact path="/" component={LandingMain}></Route>
            <Route path="/rent" component={Rent}></Route>
            <Route path="/create" component={Create_ad}></Route>
            <Route
              path="/registration"
              component={Registration_Customer}
            ></Route>
            <Route path="/login" component={Login}></Route>
            {/* <Route path="/myadverts" component={MyAd}></Route> */}
            <ProtectedRoutes
              path="/profile/:userId"
              component={Profile}
              isAuth={isAuth}
            />
            <ProtectedRoutes
              path="/update"
              component={Update}
              isAuth={isAuth}
            />
            <AdContext.Provider value={{ userId, setUserId, adId, setAdId }}>
              <Route exact={true} path="/myadverts">
                <MyAd />
              </Route>

              <Route path={`/myadverts/:adId`}>
                <Ad_Highlight id_property_ad={adId} />
              </Route>
            </AdContext.Provider>
          </LoginContext.Provider>
        </Switch>
      </Router>
      <Footer></Footer>
      <h1>{isAuth}</h1>
    </div>
  );
}
export default App;
