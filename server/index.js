const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors"); //cross origin resource sharing. Necessary for communication between front and back ends
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session"); //creating session
const path = require("path");

//What is a req and what is a res
//req is getting information from the front end
//res is sending information to the front end

//Database connection

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "oyo8Doro16!",
  database: "property_rental",
});

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
app.use(bodyParser.urlencoded({ extended: true })); //allow us to do everything related to json format
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

//Customer Register //

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

//Rental Agency Registration

app.post("/register_rental_agency", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const registration_number = req.body.registration;
  const email = req.body.email;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    const agencyReg =
      "INSERT INTO user_rental_agency (username, password, name, registration_number,email) VALUES (?,?,?,?,?) ";

    db.query(
      agencyReg,
      [username, hash, name, registration_number, email],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

//Login Handling Customer

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
    "SELECT id, password, username FROM user_customer WHERE username = ? UNION SELECT id, password,username FROM user_rental_agency WHERE username =? ;", //first checking to see if a user name is in the database
    [username, username],
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      // if a result is returned - compared passwords
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result; //creating a session with the name user set by the result we get from the database
            console.log(result);
            console.log(req.session.user);
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

// Work Reference Upload

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

///////Property Ad Creation/////////
const storagePhoto = multer.diskStorage({
  destination: "../client/src/assets/property_photos",

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); //where the specification of the file is determined

const uploadPhoto = multer({ storage: storagePhoto });

app.set("view engine", "ejs");

app.get("/upload_prop_photo", (req, res) => {
  res.render("file");
});

app.post("/upload_prop_photo", uploadPhoto.single("file"), (req, res) => {
  console.log("here");
  const fileN = req.file.filename;
  console.log("here too");
  res.send(fileN);
});

app.post("/create", (req, res) => {
  const description = req.body.description;
  const rent = req.body.rent;
  const rental_agency_id = req.body.rental_agency_id;
  const fileNamePhoto = req.body.fileNamePhoto;

  const sqlInsert =
    "INSERT INTO property_ad (description, rent, rental_agency_id, property_photo) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [description, rent, rental_agency_id, fileNamePhoto],
    (err, res) => {
      console.log(err);
    }
  );
});

////Property Ad Display///////

app.get("/rent", (req, res) => {
  const sqlGet = "SELECT * FROM property_rental.property_ad";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

//Ad Application
//*******NEED TO MAKE A DUPLICATE ERROR MESSAGE

app.post("/rent", (req, res) => {
  const id_property_ad = req.body.id_property_ad;
  const applicant_id = req.body.applicant_id;
  const verification = req.body.verification;

  const adApply =
    "INSERT INTO property_ad_application (id_property_ad, id_user_customer, verification) VALUES (?,?,?)";
  db.query(
    adApply,
    [id_property_ad, applicant_id, verification],
    (err, res) => {
      console.log(err);
    }
  );
});

//Income Verification

app.post("/verifyIncome", (req, res) => {
  const verification_token = req.body.verification_token;
  console.log(verification_token);
  const userID = req.body.id;
  console.log(userID);

  const addIncome =
    "UPDATE user_customer SET verification_token = (?) WHERE (id) = (?)";

  db.query(addIncome, [verification_token, userID], (err, res) => {
    console.log(err);
  });
});

app.get("/application/:dbID", (req, res) => {
  const id = req.params.dbID;

  const pullVerificationToken =
    " SELECT verification_token FROM property_rental.user_customer WHERE (id) = ?";

  db.query(pullVerificationToken, [id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

//Finding Monthly Rent

app.get("/monthlyRent/:id_property_ad", (req, res) => {
  const id_property_ad = req.params.id_property_ad;

  const pullMonthlyRent =
    "SELECT (rent) FROM property_rental.property_ad WHERE (id_property_ad) = (?)";
  db.query(pullMonthlyRent, [id_property_ad], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

////MyAds Display

app.get("/adverts/:id_property_ad", (req, res) => {
  const rental_agency_id = req.params.id_property_ad;

  const myAds =
    "SELECT * FROM property_rental.property_ad WHERE rental_agency_id = (?)";
  db.query(myAds, [rental_agency_id], (err, result) => {
    res.send(result);
    console.log(err);
  });
});

///Applicant Display

app.get("/advert/:id_property_ad", (req, res) => {
  const id_property_ad = req.params.id_property_ad;

  const getIndAd =
    "SELECT id_user_customer, verification  FROM property_rental.property_ad_application WHERE id_property_ad = (?)";
  db.query(getIndAd, [id_property_ad], (err, result) => {
    console.log(id_property_ad);
    res.send(result);
    console.log(err);
  });
});

//Applicant List

app.post("/application_profiles", (req, res) => {
  const id = req.body.customerNumber;

  const getApplicantProfile = "SELECT * from user_customer WHERE id = ?";

  db.query(getApplicantProfile, [id], (err, resu) => {
    console.log(err);
    res.send(resu);
  });
});

app.listen(PORT, () => {
  console.log("SERVER ACTIVATED");
});

/*Work Reference Update */

const storageWorkRef = multer.diskStorage({
  destination: "../client/src/assets/work_references",

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); //where the specification of the file is determined

const uploadWorkRef = multer({ storage: storageWorkRef });

app.set("view engine", "ejs");

app.get("/upload_workref", (req, res) => {
  res.render("file");
});

app.post("/upload_workref", uploadWorkRef.single("file"), (req, res) => {
  const fileWorkRef = req.file.filename;

  res.send(fileWorkRef);
});

/* LandLord Reference */

const storageLandlordRef = multer.diskStorage({
  destination: "../client/src/assets/landlord_references",

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); //where the specification of the file is determined

const uploadLandlordRef = multer({ storage: storageLandlordRef });

app.set("view engine", "ejs");

app.get("/upload_landlord_ref", (req, res) => {
  res.render("file");
});

app.post(
  "/upload_landlord_ref",
  uploadLandlordRef.single("file"),
  (req, res) => {
    const fileLandlordRef = req.file.filename;

    res.send(fileLandlordRef);
  }
);

/*Photo ID */

const storagePhotoRef = multer.diskStorage({
  destination: "../client/src/assets/photo_references",

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); //where the specification of the file is determined

const uploadPhotoRef = multer({ storage: storagePhotoRef });

app.set("view engine", "ejs");

app.get("/upload_photo_ref", (req, res) => {
  res.render("file");
});

app.post("/upload_photo_ref", uploadPhotoRef.single("file"), (req, res) => {
  const filePhotoRef = req.file.filename;

  res.send(filePhotoRef);
});

/* Profile Updates */

app.post("/work_update", (req, res) => {
  const work_ref = req.body.workReference;

  const id = req.body.profileId;

  db.query(
    "UPDATE user_customer SET work_ref = (?) WHERE id = (?)",
    [work_ref, id],
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );
});

app.post("/landlord_update", (req, res) => {
  const landlord_ref = req.body.landlordReference;

  const id = req.body.profileId;

  db.query(
    "UPDATE user_customer SET  landlord_ref = (?) WHERE id = (?)",
    [landlord_ref, id],
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );
});

app.post("/photo_update", (req, res) => {
  const photo_id = req.body.photoReference;
  const id = req.body.profileId;

  db.query(
    "UPDATE user_customer SET  photo_id = (?) WHERE id = (?)",
    [photo_id, id],
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );
});

/*Full Profile */

app.get("/personal_profile/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM user_customer WHERE id = (?)",
    [id],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

/* First Name Update */

app.post("/update_first_name", (req, res) => {
  id = req.body.id;
  first_name = req.body.first_name;

  db.query(
    "UPDATE user_customer SET first_name = (?) WHERE id = (?)",
    [first_name, id],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

/* Last Name Update */

app.post("/update_last_name", (req, res) => {
  id = req.body.id;
  last_name = req.body.last_name;

  db.query(
    "UPDATE user_customer SET last_name = (?) WHERE id = (?)",
    [last_name, id],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

/* Contact Update */

app.post("/update_contact", (req, res) => {
  id = req.body.id;
  contact_no = req.body.contact_no;

  db.query(
    "UPDATE user_customer SET contact_no = (?) WHERE id = (?)",
    [contact_no, id],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});
