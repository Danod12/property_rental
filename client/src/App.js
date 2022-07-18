import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

const Nav = ({ userId }) => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/rent">Rent</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to={`/profile/${userId}`}>Profile</Link>
    </li>
    <li>
      <Link to={"/update"}>Update Profile</Link>
    </li>
    <li>
      <Link to={"/create"}>Create Ad</Link>
    </li>
    <li>
      <Link to={"/registration"}>Register</Link>
    </li>
    <li>
      <Link to={"/myadverts"}>My Ads</Link>
    </li>
  </ul>
);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [adId, setAdId] = useState(null);

  return (
    <div>
      <Router>
        <Nav userId={userId} />
        <Route exact path="/" component={LandingMain}></Route>
        <Route path="/rent" component={Rent}></Route>
        <Route path="/create" component={Create_ad}></Route>
        <Route path="/registration" component={Registration_Landing}></Route>
        <Route path="/myadverts" component={MyAd}></Route>

        <LoginContext.Provider value={{ isAuth, setIsAuth, userId, setUserId }}>
          <Route path="/login" component={Login}></Route>

          <ProtectedRoutes
            path="/profile/:userId"
            component={Profile}
            isAuth={isAuth}
          />
          <ProtectedRoutes path="/update" component={Update} isAuth={isAuth} />
        </LoginContext.Provider>

        <AdContext.Provider value={{ adId, setAdId }}>
          <Route path="/myadverts/:adId">
            <Ad_Highlight id_property_ad={adId} />
          </Route>
        </AdContext.Provider>
      </Router>
      <h1>{isAuth}</h1>
    </div>
  );
}
export default App;
