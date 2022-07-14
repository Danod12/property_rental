import React, { useEffect, useState } from "react";
import Axios from "axios";

function Application({ id_property_ad }) {
  const [dbID, setDbID] = useState(null);
  const [verification, setVerification] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  const submitApplication = () => {
    Axios.get("http://localhost:3001/appSubmit", {});

    Axios.post("http://localhost:3001/rent", {
      id_property_ad: id_property_ad,
      applicant_id: dbID,
    }).then(() => {
      alert("Success!");
    });
  };

  const verificationGet = `http://localhost:3001/application/${dbID}`;

  const verificationData = () => {
    Axios.get(verificationGet).then((response) => {
      setVerification(response.data);

      const dataHolder = verification[0];

      const tokenValue = dataHolder.verification_token;
    });
  };

  return (
    <div>
      <h1> {id_property_ad}</h1>
      <button onClick={submitApplication}>Submit Application</button>
      <button onClick={verificationData}>Find Token</button>
    </div>
  );
}

export default Application;
