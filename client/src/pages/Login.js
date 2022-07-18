import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { LoginContext } from "../components/Contexts/LoginContext";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const { setIsAuth } = useContext(LoginContext);
  const { setUserId } = useContext(LoginContext);

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        setIsAuth(true);
        setUserId(response.data[0].id);
        console.log(response.data[0].id);
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
    <>
      <div className="login_reg">
        <div className="login">
          <h1> Customer Login</h1>
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
