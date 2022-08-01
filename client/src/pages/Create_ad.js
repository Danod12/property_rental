import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function Create_ad() {
  const [adDescription, setAdDescription] = useState("");
  const [adRent, setAdRent] = useState("");
  const [dbIDA, setDbIDA] = useState(null);
  const [image, setImage] = useState({ preview: "", data: "" });

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbIDA(response.data.user[0].id);
      }
    });
  }, []);

  const viewState = () => {
    console.log(dbIDA);
  };

  const submitAd = async (e) => {
    let formData = new FormData();
    formData.append("file", image.data);

    Axios.post("http://localhost:3001/create", formData, {
      description: adDescription,
      rent: adRent,
      rental_agency_id: dbIDA,
    }).then(() => {});
    console.log(adDescription);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  return (
    <div>
      <div className="RentAd">
        <label>Description </label>
        <input
          type="text"
          name="description"
          onChange={(e) => {
            setAdDescription(e.target.value);
          }}
        ></input>{" "}
        <br></br>
        <label>Rent </label>
        <input
          type="number"
          name="rent"
          onChange={(e) => {
            setAdRent(e.target.value);
          }}
        ></input>
        <label>Photos</label>
        <form>
          <input type="file" name="file" onChange={handleFileChange} />
        </form>
        <button onClick={submitAd}>Place Ad</button>
      </div>
    </div>
  );
}

export default Create_ad;
