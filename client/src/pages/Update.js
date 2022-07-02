import React, { useEffect } from "react";
import Axios from "axios";

import { useState } from "react";

function Update() {
  const url = "http://localhost:3001/update";
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

  const [dbID, setDbID] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Send Image</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  );
}

export default Update;
