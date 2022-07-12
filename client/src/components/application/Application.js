import React, { useEffect, useState } from "react";
import Axios from "axios";

function Application({ id_property_ad }) {
  const [dbID, setDbID] = useState(null);
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  const submitApplication = () => {
    Axios.post("http://localhost:3001/rent", {
      id_property_ad: id_property_ad,
      applicant_id: dbID,
    }).then(() => {
      alert("Success!");
    });
  };

  return (
    <div>
      <h1> {id_property_ad}</h1>
      <button onClick={submitApplication}>Submit Application</button>
    </div>
  );
}

export default Application;
