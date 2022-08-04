import React, { useEffect, useState } from "react";
import Axios from "axios";
import IncomeData from "../data/income_data.json";

function Update() {
  const url = "http://localhost:3001/update";
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [incomeVer, setIncomeVer] = useState([]);

  const [dbID, setDbID] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  /* Work Reference Update */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", image.data);
    const response = await Axios.post(url, formData, {
      userID: dbID,
    });

    if (response) setStatus(response.statusText);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
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
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Send Image</button>
      </form>
      {status && <h4>{status}</h4>}

      <button onClick={incomeCalc}> Verify Income</button>

      <button onClick={submitIncome}> Submit Income</button>
    </div>
  );
}

export default Update;
