import React, { useEffect, useState } from "react";
import Axios from "axios";
import Application from "../components/application/Application";
import PropertyPhoto from "../assets/images/property_photo.jpeg";

function Rent() {
  const [propertyAdList, setPropertyAdList] = useState([]);

  //displaying rent ads
  useEffect(() => {
    Axios.get("http://localhost:3001/rent").then((response) => {
      setPropertyAdList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        {propertyAdList.map((val) => {
          return (
            <div class="hero-ad  d-flex align-items-center hero-ad-background">
              <div class="container base-sign-container-ad col-9">
                <div class="row mt-5"></div>

                <div class="row ">
                  <div class="col-md-5">
                    <img src={PropertyPhoto} alt="property photo"></img>
                  </div>
                  <div class="col-md-4  form-title-ad ">
                    Description: {val.description} | Rent: {val.rent} | AdNo:{" "}
                    {val.id_property_ad}
                    <br></br>
                    <Application id_property_ad={val.id_property_ad} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rent;
