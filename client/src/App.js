import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LandingMain from "./pages/Landing_main";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Share from "./pages/Share";
import Login from "./pages/Login";

import { useState } from "react";
import Axios from "axios";

function App() {
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
      console.log(response);
    });
  };

  return (
    <>
      <Navbar />
      <div className="my-navbar">
        <Routes>
          <Route path="/" element={<LandingMain />}></Route>
          <Route path="/buy" element={<Buy />}></Route>
          <Route path="/rent" element={<Rent />}></Route>
          <Route path="/share" element={<Share />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      <div className="App">
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
          <input type="text" placeholder="username"></input>
          <input type="password" placeholder="password"></input>
          <button>Login</button>
        </div>
      </div>
    </>
  );
}

export default App;
