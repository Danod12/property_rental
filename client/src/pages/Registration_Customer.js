import React, { useState } from "react";
import Axios from "axios";

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
    <div className="registration">
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUserNameReg(e.target.value);
        }}
      ></input>
      <br></br>
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      ></input>
      <br></br>
      <label>First Name</label>
      <input
        type="text"
        onChange={(e) => {
          setFirstNameReg(e.target.value);
        }}
      ></input>
      <br></br>
      <label> Last Name</label>
      <input
        type="text"
        onChange={(e) => {
          setLastNameReg(e.target.value);
        }}
      ></input>
      <br></br>
      <label> E-mail</label>
      <input
        type="text"
        onChange={(e) => {
          setEmailReg(e.target.value);
        }}
      ></input>
      <br></br>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Registration_Customer;
