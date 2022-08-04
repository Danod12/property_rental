import React, { useEffect, useState } from "react";
import Axios from "axios";
import Application from "../components/application/Application";

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

                <div class="row justify-content-center">
                  <div class="col-md-4 align-items-center">
                    <img
                      class="ad_image"
                      src={require(`../assets/property_photos/${val.property_photo}`)}
                      alt="interior"
                      width="300"
                      height="200"
                    ></img>
                  </div>
                  <div class="col-md-6  form-title-ad ">
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
