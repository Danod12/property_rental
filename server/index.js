const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors");

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

  db.query(
    "INSERT INTO user_customer (username, password, first_name, last_name, email) VALUES (?,?,?,?,?)",
    [username, password, firstName, lastName, email],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log("SERVER ACTIVATED");
});
