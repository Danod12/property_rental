const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors"); //cross origin resource sharing. Necessary for communication between front and back ends
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session"); //creating session
const path = require("path");

//Login Handling

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
); //verification for front end origin

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json()); //automattically parsing everything that is sent from the front end
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//variables for session
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 24 * 24,
    },
  })
);

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
        setdbID(result.data.id);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_customer WHERE username = ?;", //first checking to see if a user name is in the database
    username,
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      // if a result is returned - compared passwords
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result; //creating a session with the name user set by the result we get from the database
            res.send(result);
            console.log(req.session.user);
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

// Image Uploading

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Work_Refs");
  }, //first argument is for errors during sending

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); //where the specification of the file is determined

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/update", (req, res) => {
  res.render("file");
});

app.post("/update", upload.single("file"), (req, res) => {
  res.send("Image Uploaded");
  const fileNameDB = req.file.filename;
  const currentUser = req.header("userID");

  db.query(
    "UPDATE user_customer SET work_ref = ? WHERE id = ?;",
    [fileNameDB, currentUser],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log("SERVER ACTIVATED");
});
