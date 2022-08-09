import React, { useEffect, useState } from "react";
import Axios from "axios";

function Application({ id_property_ad }) {
  const [dbID, setDbID] = useState(null);

  let responseTokenData = [];
  let responseMonthlyRent = [];
  let monthlyRent = 0;
  let tokenValue = 0;

  const verificationGet = `http://localhost:3001/application/${dbID}`;
  const rentGet = `http://localhost:3001/monthlyRent/${id_property_ad}`;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  //submiting application
  const submitApplication = async () => {
    const response = await Axios.get(verificationGet);
    responseTokenData = response.data[0];
    tokenValue = responseTokenData.verification_token;

    console.log(tokenValue);

    const rentResponse = await Axios.get(rentGet);
    responseMonthlyRent = rentResponse.data[0];
    monthlyRent = responseMonthlyRent.rent;

    console.log(monthlyRent);

    if (tokenValue >= monthlyRent) {
      Axios.post("http://localhost:3001/rent", {
        id_property_ad: id_property_ad,
        applicant_id: dbID,
        verification: true,
      }).then(() => {
        alert("Success!");
      });
    } else {
      Axios.post("http://localhost:3001/rent", {
        id_property_ad: id_property_ad,
        applicant_id: dbID,
        verification: false,
      }).then(() => {
        alert("Success!");
      });
    }
  };

  //finding verification token value

  return (
    <div class="d-flex justify-content-center">
      <button class="submit-application-button" onClick={submitApplication}>
        Submit Application
      </button>
    </div>
  );
}

export default Application;
