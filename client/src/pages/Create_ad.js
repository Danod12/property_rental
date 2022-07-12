import React from "react";
import { useState } from "react";
import Axios from "axios";

function Create_ad() {
  const [adDescription, setAdDescription] = useState("");
  const [adRent, setAdRent] = useState("");

  const submitAd = () => {
    Axios.post("http://localhost:3001/create", {
      description: adDescription,
      rent: adRent,
    }).then(() => {
      alert("succesfull insert");
    });
  };

  return (
    <div>
      <div className="RentAd">
        <lable>Description </lable>
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
      </div>
    </div>
  );
}

export default Create_ad;
