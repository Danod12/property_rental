import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function Create_ad() {
  const [adDescription, setAdDescription] = useState("");
  const [adRent, setAdRent] = useState("");
  const [dbIDA, setDbIDA] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbIDA(response.data.user[0].id);
      }
    });
  }, []);

  const viewState = () => {
    console.log(dbIDA);
  };

  const submitAd = () => {
    Axios.post("http://localhost:3001/create", {
      description: adDescription,
      rent: adRent,
      rental_agency_id: dbIDA,
    }).then(() => {
      alert("succesfull insert");
    });
  };

  return (
    <div>
      <div className="RentAd">
        <label>Description </label>
        <input
          type="text"
          name="description"
          onChange={(e) => {
            setAdDescription(e.target.value);
          }}
        ></input>{" "}
        <br></br>
        <label>Rent </label>
        <input
          type="number"
          name="rent"
          onChange={(e) => {
            setAdRent(e.target.value);
          }}
        ></input>
        <button onClick={submitAd}>Place Ad</button>
        <button onClick={viewState}>Check No</button>
      </div>
    </div>
  );
}

export default Create_ad;
