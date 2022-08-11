import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext } from "./components/Contexts/LoginContext";
import { AdContext } from "./components/Contexts/AdContext";

import React, { useState } from "react";
import LandingMain from "./pages/Landing_main";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import LoginAgency from "./pages/Login_Agency";
import Profile from "./pages/Profile";
import Update from "./pages/Update";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Create_ad from "./pages/Create_ad";
import MyAd from "./pages/MyAd";

import Footer from "./components/footer/index";
import Registration_Customer from "./pages/Registration_Customer";
import Registration_Rental_Agency from "./pages/Registration_Rental_Agency";

/*
Bootstrap Components
*/

import Navbar_Home from "./components/navbar/Navbar_Home";
import Navbar_Customer from "./components/navbar/Navbar_Customer";
import Applicants from "./pages/Applicants";
import Work_Reference_View from "./components/work_reference_view/Work_Reference_View";
import Landlord_Reference_View from "./components/landlord_ref_view/Landlord_Reference_View";
import Navbar_Rental from "./components/navbar/Navbar_Rental";

/*thhis is is */

/* */
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [adId, setAdId] = useState(null);
  const [userIdentity, setUserIdentity] = useState(null);
  console.log(adId);
  return (
    <div>
      <Router>
        <Switch>
          <LoginContext.Provider
            value={{
              isAuth,
              setIsAuth,
              userId,
              setUserId,
              userIdentity,
              setUserIdentity,
            }}
          >
            <AdContext.Provider value={{ userId, setUserId, adId, setAdId }}>
              {isAuth ? (
                userIdentity ? (
                  <Navbar_Customer userId={userId} />
                ) : (
                  <Navbar_Rental userId={userId} />
                )
              ) : (
                <Navbar_Home userId={userId} />
              )}
              <Route exact path="/" component={LandingMain}></Route>
              <Route path="/rent" component={Rent}></Route>
              <Route path="/create" component={Create_ad}></Route>
              <Route
                path="/registration/customer"
                component={Registration_Customer}
              ></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/login_agency" component={LoginAgency}></Route>

              <Route
                path="/registration/rental_agency"
                component={Registration_Rental_Agency}
              ></Route>

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
              <Route exact={true} path="/myadverts">
                <MyAd />
              </Route>
              <Route path={`/myadverts/:adId`}>
                <Applicants id_property_ad={adId} />
              </Route>

              <Route path={`/work_reference/:work_reference`}>
                <Work_Reference_View />
              </Route>

              <Route path={`/landlord_reference/:landlord_reference`}>
                <Landlord_Reference_View />
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
