import React, { useEffect, useState } from "react";
import Axios from "axios";

function Application({ id_property_ad }) {
  const [dbID, setDbID] = useState(null);

  let responseTokenData = [];
  let responseMonthlyRent = [];
  let monthlyRent = 0;
  let tokenValue = 0;

  const verificationGet = `http://localhost:3001/application/${dbID}`;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  //submiting application
  const submitApplication = () => {
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
  const verificationData = async () => {
    const response = await Axios.get(verificationGet);
    responseTokenData = response.data[0];
    tokenValue = responseTokenData.verification_token;

    console.log(tokenValue);
  };

  const rentGet = `http://localhost:3001/monthlyRent/${id_property_ad}`;

  const monthlyRentCalc = async () => {
    const rentResponse = await Axios.get(rentGet);
    responseMonthlyRent = rentResponse.data[0];
    monthlyRent = responseMonthlyRent.rent;

    console.log(monthlyRent);
  };

  return (
    <div>
      <h1> {id_property_ad}</h1>
      <button onClick={submitApplication}>Submit Application</button>
      <button onClick={verificationData}>Find Token</button>
      <button onClick={monthlyRentCalc}>Find Rent</button>
    </div>
  );
}

export default Application;
