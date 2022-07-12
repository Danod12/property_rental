import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginContext } from "./components/Contexts/LoginContext";

import React, { useState } from "react";
import LandingMain from "./pages/Landing_main";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Update from "./pages/Update";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Create_ad from "./pages/Create_ad";

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
  </ul>
);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <div>
      <Router>
        <Nav userId={userId} />
        <Route exact path="/" component={LandingMain}></Route>
        <Route path="/rent" component={Rent}></Route>
        <Route path="/create" component={Create_ad}></Route>

        <LoginContext.Provider value={{ isAuth, setIsAuth, userId, setUserId }}>
          <Route path="/login" component={Login}></Route>

          <ProtectedRoutes
            path="/profile/:userId"
            component={Profile}
            isAuth={isAuth}
          />

          <ProtectedRoutes path="/update" component={Update} isAuth={isAuth} />
        </LoginContext.Provider>
      </Router>
      <h1>{isAuth}</h1>
    </div>
  );
}
export default App;
