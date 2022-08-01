import React, { useState } from "react";
import Axios from "axios";

import companyLogo from "../assets/images/logo.png";

function Registration_Customer() {
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: userNameReg,
      password: passwordReg,
      firstName: firstNameReg,
      lastName: lastNameReg,
      email: emailReg,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div class="hero-registration-customer vh-100 d-flex align-items-center hero-sign-up-background">
      <div class="container base-sign-container col-6">
        <div class="row justify-content-center mt-3">
          <div class="col-md-3"></div>
        </div>

        <div class="row justify-content-center mt-3">
          <div class="col-md-3">
            <img class="companyLogo" src={companyLogo}></img>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 form-title">
            <label>Username</label>
            <br></br>
            <input
              class="form-control"
              type="text"
              onChange={(e) => {
                setUserNameReg(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 form-title">
            <label>Password</label>
            <br></br>
            <input
              class="form-control"
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 form-title">
            <label>First Name</label>
            <br></br>
            <input
              class="form-control"
              type="text"
              onChange={(e) => {
                setFirstNameReg(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 form-title">
            <label> Last Name</label>
            <br></br>
            <input
              class="form-control"
              type="text"
              onChange={(e) => {
                setLastNameReg(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 form-title">
            <label> E-mail</label>
            <br></br>
            <input
              class="form-control"
              type="text"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>
        <br></br>
        <button class="form-control submit-tag" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration_Customer;
