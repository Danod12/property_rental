const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json()); //automattically parsing everything that is sent from the front end
app.use(cors());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "oyo8Doro16!",
  database: "property_rental",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  //passing the hashed password to post request to the database

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user_customer (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)",
      [username, hash, firstName, lastName, email],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_customer WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }

      if (result.length > 0) {
        bycrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Wrong username combo" });
          }
        });
      } else {
        res.send({ message: "User Does Not Exist" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("SERVER ACTIVATED");
});
