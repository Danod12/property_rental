import React from "react";
import { useRouteMatch } from "react-router";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Registration_Customer from "./Registration_Customer";
import Registration_Rental_Agency from "./Registration_Rental_Agency";

function Registration_Landing() {
  let { url } = useRouteMatch();

  return (
    <div>
      <h1>Registration Landing</h1>
      <nav>
        <ul>
          <li>
            <Link to={`${url}/rental_agency`}> Rental Agency Registration</Link>
          </li>
          <li>
            <Link to={`${url}/customer`}>Customer Registration</Link>
          </li>
        </ul>
      </nav>

      <Route
        path="/registration/customer"
        component={Registration_Customer}
      ></Route>
      <Route
        path="/registration/rental_agency"
        component={Registration_Rental_Agency}
      ></Route>
    </div>
  );
}
export default Registration_Landing;
