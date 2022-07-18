import React from "react";
import { useState } from "react";
import Axios from "axios";

function Registration_Rental_Agency() {
  const [userNameRegAgent, setUserNameRegAgent] = useState("");
  const [passwordRegAgent, setPasswordRegAgent] = useState("");
  const [nameRegAgent, setNameRegAgent] = useState("");
  const [emailRegAgent, setEmailRegAgent] = useState("");
  const [regNumAgent, setRegNumAgent] = useState("");

  const registerAgency = () => {
    Axios.post("http://localhost:3001/register_rental_agency", {
      username: userNameRegAgent,
      password: passwordRegAgent,
      name: nameRegAgent,
      registration: regNumAgent,
      email: emailRegAgent,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="registration">
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUserNameRegAgent(e.target.value);
        }}
      ></input>
      <br></br>
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPasswordRegAgent(e.target.value);
        }}
      ></input>
      <br></br>
      <label>Agency Name</label>
      <input
        type="text"
        onChange={(e) => {
          setNameRegAgent(e.target.value);
        }}
      ></input>
      <br></br>
      <label>Registration Number</label>
      <input
        type="text"
        onChange={(e) => {
          setRegNumAgent(e.target.value);
        }}
      ></input>
      <br></br>
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => {
          setEmailRegAgent(e.target.value);
        }}
      ></input>

      <br></br>

      <button onClick={registerAgency}>Register</button>
    </div>
  );
}

export default Registration_Rental_Agency;
