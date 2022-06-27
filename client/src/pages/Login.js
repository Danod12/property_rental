import { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

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

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };
  return (
    <>
      <div className="login_reg">
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

        <div className="login">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>

          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button onClick={login}>Login</button>
        </div>
      </div>
      <h1>{loginStatus}</h1>
    </>
  );
}
