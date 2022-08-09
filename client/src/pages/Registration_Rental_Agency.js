import React from "react";
import { useState } from "react";
import Axios from "axios";
import companyLogo from "../assets/images/main_logo.png";

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
    <div>
      <div class="hero-registration-rental-agency vh-100 d-flex align-items-center ">
        <div class="container bg-white base-sign-container col-6">
          <div class="row justify-content-center mt-20">
            <div class="col-md-3"></div>
          </div>

          <div class="row justify-content-center mt-3">
            <div class="col-md-4">
              <img class="companyLogo" src={companyLogo}></img>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label class="form-title">Username</label>
              <input
                class="form-control"
                type="text"
                onChange={(e) => {
                  setUserNameRegAgent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label class="form-title">Password</label>
              <input
                class="form-control"
                type="password"
                onChange={(e) => {
                  setPasswordRegAgent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label class="form-title">Agency Name</label>
              <input
                class="form-control"
                type="text"
                onChange={(e) => {
                  setNameRegAgent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label class="form-title">Registration Number</label>
              <input
                class="form-control"
                type="text"
                onChange={(e) => {
                  setRegNumAgent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label class="form-title">Email</label>
              <input
                class="form-control"
                type="text"
                onChange={(e) => {
                  setEmailRegAgent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>
          <button class="form-control submit-tag" onClick={registerAgency}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration_Rental_Agency;
