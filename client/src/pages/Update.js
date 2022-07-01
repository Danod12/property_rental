import React from "react";
import Axios from "axios";
import { useState } from "react";

function Update() {
  return (
    <div>
      <div>
        <h1>Profile Updates</h1>
      </div>
      <div>
        <input
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            console.log(file);
            setFileImg(file);
          }}
        />
        <button onClick={postFile}>Send Image</button>
      </div>
    </div>
  );
}

export default Update;
