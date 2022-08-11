import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { LoginContext } from "../components/Contexts/LoginContext";
import companyLogo from "../assets/images/main_logo.png";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const { setIsAuth } = useContext(LoginContext);
  const { setUserId } = useContext(LoginContext);
  const { setUserIdentity } = useContext(LoginContext);

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Welcome" + " " + response.data[0].username + "!");
        setIsAuth(true);
        setUserId(response.data[0].id);
        console.log(response.data[0].id);
        setUserIdentity(true);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data[0].username);
      }
    });
  }, []);

  return (
    <div class="hero-login  vh-120 d-flex align-items-center">
      <div class="container base-sign-container-login bg-white col-6">
        <div class="row justify-content-center mt-3">
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
            <label>Username</label>
            <br></br>
            <input
              class="form-control"
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUserName(e.target.value);
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
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <br></br>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 login-status-text mb-4">
            <div class="col-md-12 login-status-text">{loginStatus}</div>
          </div>
        </div>

        <button class="form-control submit-tag" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
