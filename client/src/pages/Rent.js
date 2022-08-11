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
                <div class="row justify-content-center align-items-center">
                  <div class="col-md-4 justify-content-center">
                    <img
                      class="ad_image"
                      src={require(`../assets/property_photos/${val.property_photo}`)}
                      alt="interior"
                      width="300"
                      height="250"
                    ></img>
                  </div>
                  <div class="col-md-6 form-title-ad description-container mt-4 ">
                    <div class="row description-position mt-3 ">
                      <div class="col-md-3 rent-ad-title d-flex justify-content-center">
                        Description
                      </div>
                      <div class="row d-flex justify-content-center mt-2">
                        {val.description}
                      </div>
                    </div>

                    <div class="row description-position mt-3 ">
                      <div class="col-md-3 rent-ad-title d-flex justify-content-center">
                        Rent
                      </div>
                      <div class="row d-flex justify-content-center mt-2">
                        {val.rent}
                      </div>
                    </div>

                    <div class="row mt-3 ">
                      <Application id_property_ad={val.id_property_ad} />
                    </div>

                    <br></br>
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
