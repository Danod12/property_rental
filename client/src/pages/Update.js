import React, { useEffect, useState } from "react";
import Axios from "axios";
import IncomeData from "../data/income_data.json";
import { Upload } from "react-bootstrap-icons";

function Update() {
  const url = "http://localhost:3001/update";
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [incomeVer, setIncomeVer] = useState([]);
  const [dbID, setDbID] = useState(null);

  const [workReferenceName, setWorkReferenceName] = useState("");
  const [landlordReferenceName, setLandlordReferenceName] = useState("");
  const [photoReferenceName, setPhotoReferenceName] = useState("");

  const [workPreviewName, setWorkPreviewName] = useState("");
  const [landlordPreviewName, setLandlordPreviewName] = useState("");
  const [photoPreviewName, setPhotoPreviewName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [displayIncome, setDisplayIncome] = useState(null);
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  const firstNameUpdate = () => {
    Axios.post("http://localhost:3001/update_first_name", {
      id: dbID,
      first_name: firstName,
    }).then((response) => {
      console.log(response);
      alert("First Name Updated!");
    });
  };

  const lastNameUpdate = () => {
    Axios.post("http://localhost:3001/update_last_name", {
      id: dbID,
      last_name: lastName,
    }).then((response) => {
      console.log(response.data);
      alert("Last Name Updated!");
    });
  };

  const contactUpdate = () => {
    Axios.post("http://localhost:3001/update_contact", {
      id: dbID,
      contact_no: contactNo,
    }).then((response) => {
      console.log(response.data);
      alert("Contact Number Updated!");
    });
  };

  /* Work Reference Update */

  const handleWorkReference = async (e) => {
    const workRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    console.log(workRef.data);
    setWorkPreviewName(workRef.data.name);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", workRef.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_workref",
      formData
    );
    setWorkReferenceName(result.data);
    alert("Work Reference Updated!");
  };

  /* Landlord Reference */

  const handleLandlordReference = async (e) => {
    const landlordRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    console.log(landlordRef.data);
    setLandlordPreviewName(landlordRef.data.name);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", landlordRef.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_landlord_ref",
      formData
    );

    alert("Landlord Reference Updated!");
    setLandlordReferenceName(result.data);
  };

  /*Photo Reference */

  const handlePhotoReference = async (e) => {
    const photoRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setPhotoPreviewName(photoRef.data.name);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", photoRef.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_photo_ref",
      formData
    );

    console.log(result.data);

    setPhotoReferenceName(result.data);
  };

  /*Photo ID */

  /* Update Profile */

  const updateWorkRef = async (e) => {
    Axios.post("http://localhost:3001/work_update", {
      workReference: workReferenceName,

      profileId: dbID,
    }).then(() => {});
    alert("Work Reference Updated!");
  };

  const updateLandlordRef = async (e) => {
    Axios.post("http://localhost:3001/landlord_update", {
      landlordReference: landlordReferenceName,

      profileId: dbID,
    }).then(() => {});
    alert("Landlord Reference Updated!");
  };

  const updatePhotoID = async (e) => {
    Axios.post("http://localhost:3001/photo_update", {
      photoReference: photoReferenceName,
      profileId: dbID,
    }).then(() => {});
    alert("Photo ID Updated!");
  };

  /* Income Verification*/

  const transactionData = IncomeData.transactions; //transaction data array
  let monthlyIncome = [];
  let totalIncome = 0;
  let averageMonthlyIncome = 0;
  let janIncome = 0;
  let febIncome = 0;
  let marIncome = 0;
  let aprIncome = 0;
  let mayIncome = 0;
  let junIncome = 0;
  let julyIncome = 0;
  let augIncome = 0;
  let septIncome = 0;
  let octIncome = 0;
  let novIncome = 0;
  let decIncome = 0;

  const incomeCalc = () => {
    transactionData.forEach(pullTransactionAmount); //cycling through array with pullTransactionAmount
    setIncomeVer(monthlyIncome);
  };

  const averageMonthCalc = () => {
    for (let i = 0; i < incomeVer.length; i++) {
      totalIncome = totalIncome + incomeVer[i];
    }
    averageMonthlyIncome = totalIncome / 12;
  };

  const calculations = () => {
    incomeCalc();
    averageMonthCalc();
    const cutNum = averageMonthlyIncome.toFixed(2);
    setDisplayIncome(cutNum);
  };

  const submitIncome = () => {
    Axios.post("http://localhost:3001/verifyIncome", {
      verification_token: averageMonthlyIncome,
      id: dbID,
    }).then(() => {});
  };

  function pullTransactionAmount(item) {
    const objectHolder = item;

    const amounts = objectHolder.amount;
    const dates = objectHolder.date;
    let trimmedDate = "";
    let trimmedYearDate = "";
    const testString = "0";
    let intDate = null;

    if (dates[5] === testString) {
      trimmedYearDate = dates.substring(6); //removing the year
    } else {
      trimmedYearDate = dates.substring(5); //removing the year
    }
    trimmedDate = trimmedYearDate.slice(0, -3); //removing day
    intDate = parseInt(trimmedDate);

    if (intDate === 1 && amounts > 0) {
      janIncome = janIncome + amounts;
      monthlyIncome[0] = janIncome;
    } else if (intDate === 2 && amounts > 0) {
      febIncome = febIncome + amounts;
      monthlyIncome[1] = febIncome;
    } else if (intDate === 3 && amounts > 0) {
      marIncome = marIncome + amounts;
      monthlyIncome[2] = marIncome;
    } else if (intDate === 4 && amounts > 0) {
      aprIncome = aprIncome + amounts;
      monthlyIncome[3] = aprIncome;
    } else if (intDate === 5 && amounts > 0) {
      mayIncome = mayIncome + amounts;
      monthlyIncome[4] = mayIncome;
    } else if (intDate === 6 && amounts > 0) {
      junIncome = junIncome + amounts;
      monthlyIncome[5] = junIncome;
    } else if (intDate === 7 && amounts > 0) {
      julyIncome = julyIncome + amounts;
      monthlyIncome[6] = julyIncome;
    } else if (intDate === 8 && amounts > 0) {
      augIncome = augIncome + amounts;
      monthlyIncome[7] = augIncome;
    } else if (intDate === 9 && amounts > 0) {
      septIncome = septIncome + amounts;
      monthlyIncome[8] = septIncome;
    } else if (intDate === 10 && amounts > 0) {
      octIncome = octIncome + amounts;
      monthlyIncome[9] = octIncome;
    } else if (intDate === 11 && amounts > 0) {
      novIncome = novIncome + amounts;
      monthlyIncome[10] = novIncome;
    } else if (intDate === 12 && amounts > 0) {
      decIncome = decIncome + amounts;
      monthlyIncome[11] = decIncome;
    } else {
      console.log("Error in validation");
    }
  }

  return (
    <div>
      <div class="hero-create-ad vh-120 d-flex align-items-center ">
        <div class="container base-sign-container-create-ad bg-white col-6">
          <div class="row create-header title-padding">
            <h3>Update Profile</h3>
          </div>

          <div class="row">
            <div class="col-md-8 form-title mt-3">
              <label>First Name</label>
            </div>
          </div>

          <div class="row d-flex">
            <div class="col-md-7 form-title mt-3">
              <input
                class="form-control description-input longInput"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
              <br></br>
            </div>

            <div class="col-md-4 name-updates ">
              <button
                class="upload-label-profile-name button-postion"
                onClick={firstNameUpdate}
              >
                Update First Name
              </button>

              <br></br>
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
            <div class="col-md-8 form-title mt-3">
              <label>Last Name</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-7 form-title mt-3">
              <input
                class="form-control description-input longInput"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
              <br></br>
            </div>

            <div class="col-md-4 name-updates ">
              <button
                class="upload-label-profile-name button-postion"
                onClick={lastNameUpdate}
              >
                Update Last Name
              </button>

              <br></br>
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
            <div class="col-md-8 form-title mt-3">
              <label>Contact Number</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-7 form-title mt-3">
              <input
                class="form-control description-input longInput"
                type="text"
                placeholder="Contact Number"
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
              ></input>
              <br></br>
            </div>

            <div class="col-md-4 name-updates ">
              <button
                class="upload-label-profile-name button-postion"
                onClick={contactUpdate}
              >
                Update Contact Number
              </button>

              <br></br>
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

          <div class="row justify-content-center">
            <div class="col-md-12 form-title mb-4 title-padding justify-content-center">
              <label>Work Reference</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-title">
              <form>
                <input
                  type="file"
                  id="fileDesc1"
                  name="file1"
                  onChange={handleWorkReference}
                />
                <label class="upload-label-profile" for="fileDesc1">
                  <Upload />
                  <div>&nbsp;</div>
                  Work Reference
                </label>
              </form>

              <br></br>
            </div>

            <div class="col-md-4 form-title ">
              <p class="link-style upload-preview-title">
                {workPreviewName}
                &nbsp;
              </p>

              <br></br>
            </div>

            <div class="col-md-4 form-title">
              <p>
                <button
                  class="upload-label-profile-submit"
                  onClick={updateWorkRef}
                >
                  Update Work Reference
                </button>
              </p>

              <br></br>
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

          <div class="row justify-content-center mt-3">
            <div class="col-md-12 form-title mb-4">
              <label>Landlord Reference</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-title">
              <form>
                <input
                  type="file"
                  id="fileDesc2"
                  name="file2"
                  onChange={handleLandlordReference}
                />
                <label class="upload-label-profile" for="fileDesc2">
                  <Upload />
                  <div>&nbsp;</div>
                  Landlord Reference
                </label>
              </form>

              <br></br>
            </div>

            <div class="col-md-4 form-title ">
              <p class="link-style upload-preview-title">
                {landlordPreviewName}
                &nbsp;
              </p>

              <br></br>
            </div>

            <div class="col-md-4 form-title">
              <p>
                <button
                  class="upload-label-profile-submit"
                  onClick={updateLandlordRef}
                >
                  Update Landlord Reference
                </button>
              </p>

              <br></br>
            </div>
          </div>

          <div
            style={{
              borderTop: "2px solid lightgrey ",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>

          <div class="row justify-content-center mt-3">
            <div class="col-md-12 form-title mb-4">
              <label>Photo ID</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-title">
              <form>
                <input
                  type="file"
                  id="fileDesc3"
                  name="file3"
                  onChange={handlePhotoReference}
                />
                <label class="upload-label-profile" for="fileDesc3">
                  <Upload />
                  <div>&nbsp;</div>
                  Landlord Reference
                </label>
              </form>

              <br></br>
            </div>

            <div class="col-md-4 form-title ">
              <p class="link-style upload-preview-title">
                {photoPreviewName}
                &nbsp;
              </p>

              <br></br>
            </div>

            <div class="col-md-4 form-title">
              <p>
                <button
                  class="upload-label-profile-submit"
                  onClick={updatePhotoID}
                >
                  Update Photo ID Reference
                </button>
              </p>

              <br></br>
            </div>
          </div>

          <div
            style={{
              borderTop: "2px solid lightgrey ",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>

          <div class="row justify-content-center mt-3">
            <div class="col-md-12 form-title mb-4">
              <label>Income Verification</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-title">
              <button class="upload-label-profile" onClick={calculations}>
                {" "}
                Verify Income
              </button>

              <br></br>
            </div>

            <div class="col-md-4 form-title">
              <p class="upload-preview-title">{displayIncome}</p>
            </div>

            <div class="col-md-4 form-title">
              <p>
                <button
                  class="upload-label-profile-submit"
                  onClick={submitIncome}
                >
                  {" "}
                  Submit Income
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
