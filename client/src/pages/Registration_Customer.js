import React, { useState } from "react";
import Axios from "axios";
import { Google, Facebook } from "react-bootstrap-icons";

import companyLogo from "../assets/images/main_logo.png";

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
      <div class="container bg-white base-sign-container col-6">
        <div class="row justify-content-center mt-3">
          <div class="col-md-3"></div>
        </div>

        <div class="row justify-content-center mt-3">
          <div class="col-md-4">
            <img class="companyLogo" src={companyLogo}></img>
            <br></br>
          </div>
        </div>

        <div class="row justify-content-center mt-3">
          <div class="col-md-8 text-center ">
            <p class="social-sign link-style">
              <Google color="red" size={30} />
              <a
                class="link-style"
                style={{ textDecoration: "none" }}
                href="https://accounts.google.com/login"
              >
                Sign-up with Google{" "}
              </a>
            </p>
          </div>
        </div>

        <div class="row justify-content-center mt-3">
          <div class="col-md-8 text-center ">
            <p class="social-sign link-style">
              <Google color="royalblue" size={30} />
              <a
                class="link-style"
                style={{ textDecoration: "none" }}
                href="www.facebook.come"
              >
                Sign-up with Facebook{" "}
              </a>
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid lightgrey ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <br></br>

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
