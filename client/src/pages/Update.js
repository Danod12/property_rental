import React, { useEffect, useState } from "react";
import Axios from "axios";
import IncomeData from "../data/income_data.json";

function Update() {
  const url = "http://localhost:3001/update";
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [incomeVer, setIncomeVer] = useState([]);
  const [dbID, setDbID] = useState(null);

  const [workReferenceName, setWorkReferenceName] = useState("");
  const [landlordReferenceName, setLandlordReferenceName] = useState("");
  const [photoReferenceName, setPhotoReferenceName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  /* Work Reference Update */

  const handleWorkReference = async (e) => {
    const workRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    console.log(workRef.data);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", workRef.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_workref",
      formData
    );

    console.log(result.data);
    setWorkReferenceName(result.data);
  };

  /* Landlord Reference */

  const handleLandlordReference = async (e) => {
    const landlordRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    console.log(landlordRef.data);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", landlordRef.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_landlord_ref",
      formData
    );

    console.log(result.data);
    setLandlordReferenceName(result.data);
  };

  const handlePhotoReference = async (e) => {
    const photoRef = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    console.log(photoRef.data);
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
    console.log("you made it ");
  };

  const updateLandlordRef = async (e) => {
    Axios.post("http://localhost:3001/landlord_update", {
      landlordReference: landlordReferenceName,

      profileId: dbID,
    }).then(() => {});
    console.log("you made it ");
  };

  const updatePhotoID = async (e) => {
    Axios.post("http://localhost:3001/photo_update", {
      photoReference: photoReferenceName,
      profileId: dbID,
    }).then(() => {});
    console.log("you made it ");
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

  const submitIncome = () => {
    for (let i = 0; i < incomeVer.length; i++) {
      totalIncome = totalIncome + incomeVer[i];
    }
    averageMonthlyIncome = totalIncome / 12;
    console.log(totalIncome);
    console.log(averageMonthlyIncome);

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
      <form>
        <input
          type="file"
          id="fileDesc1"
          name="file1"
          onChange={handleWorkReference}
        />
        <label class="upload-label" for="fileDesc1">
          <div>&nbsp;</div>
          Work Reference
        </label>
      </form>

      <form>
        <input
          type="file"
          id="fileDesc2"
          name="file2"
          onChange={handleLandlordReference}
        />
        <label class="upload-label" for="fileDesc2">
          <div>&nbsp;</div>
          Landlord Reference
        </label>
      </form>

      <form>
        <input
          type="file"
          id="fileDesc3"
          name="file3"
          onChange={handlePhotoReference}
        />
        <label class="upload-label" for="fileDesc3">
          <div>&nbsp;</div>
          Photo Reference
        </label>
      </form>

      <button onClick={updateWorkRef}>Update Work Reference</button>
      <button onClick={updateLandlordRef}>Update Landlord Reference</button>
      <button onClick={updatePhotoID}>Update PhotoID</button>
      {status && <h4>{status}</h4>}

      <button onClick={incomeCalc}> Verify Income</button>

      <button onClick={submitIncome}> Submit Income</button>
    </div>
  );
}

export default Update;
