import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import { Upload } from "react-bootstrap-icons";

function Create_ad() {
  const [adDescription, setAdDescription] = useState("");
  const [adRent, setAdRent] = useState("");
  const [dbIDA, setDbIDA] = useState(null);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbIDA(response.data.user[0].id);
      }
    });
  }, []);

  const submitAd = async (e) => {
    Axios.post("http://localhost:3001/create", {
      description: adDescription,
      rent: adRent,
      rental_agency_id: dbIDA,
      fileNamePhoto: imageName,
    }).then(() => {});
    console.log(adDescription);
  };

  const handleFileChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setPreviewImage(img.preview);
    setImage(img);

    console.log(image.data);
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", img.data);
    const result = await Axios.post(
      "http://localhost:3001/upload_prop_photo",
      formData
    );

    console.log(result.data);
    setImageName(result.data);
  };

  return (
    <div>
      <div class="hero-create-ad vh-120 d-flex align-items-center ">
        <div class="container base-sign-container-create-ad bg-white col-6">
          <div class="row justify-content-center mt-3">
            <div class="col-md-3"></div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label>Property Description</label>

              <textarea
                class="form-control description-input longInput"
                cols="30"
                rows="10"
                size="200"
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setAdDescription(e.target.value);
                }}
              ></textarea>
              <br></br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-title">
              <label>Rent</label>
              <br></br>
              <input
                class="form-control rent-input"
                type="number"
                placeholder="Set Monthly Rent"
                onChange={(e) => {
                  setAdRent(e.target.value);
                }}
              ></input>
              <br></br>
            </div>
          </div>

          <div class="row mb-4 mt-4">
            <div class="col-md-4 form-title">
              <label>Property Photos</label>
            </div>
          </div>

          <div class="row  mb-4 mt-4">
            <div class="col-md-6 form-title">
              <br></br>
              <form class="form-control-file ">
                <input
                  type="file"
                  id="fileDesc"
                  name="file"
                  onChange={handleFileChange}
                />
                <label class="upload-label" for="fileDesc">
                  <Upload />
                  <div>&nbsp;</div>
                  Choose a Photo
                </label>
              </form>
              <br></br>
            </div>

            <div class="col-md-6 ">
              <div>
                <img class="image-preview" src={previewImage}></img>
                <p class="preview-paragraph">Preview</p>
              </div>
            </div>
          </div>

          <button class="form-control submit-tag" onClick={submitAd}>
            Place Ad
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create_ad;
