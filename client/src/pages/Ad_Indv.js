import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
function Ad_indv({ description, rent, ID, property_photo }) {
  const { adId } = useParams();

  /*     <Link to={`/myadverts/${ID}`}>View Applicants</Link> */

  return (
    <div class="hero-ad  d-flex align-items-center hero-ad-background">
      <div class="container base-sign-container-ad col-9">
        <div class="row mt-5"></div>

        <div class="row justify-content-center align-items-center">
          <div class="col-md-4 justify-content-center">
            <img
              class="ad_image"
              src={require(`../assets/property_photos/${property_photo}`)}
              alt="interior"
              width="300"
              height="200"
            ></img>
          </div>
          <div class="col-md-6 form-title-ad description-container   ">
            <div class="row description-position mt-3 ">
              <div class="col-md-3 rent-ad-title d-flex justify-content-center">
                Description
              </div>
              <div class="row d-flex justify-content-center mt-2">
                {description}
              </div>
            </div>

            <div class="row description-position mt-3 ">
              <div class="col-md-3 rent-ad-title d-flex justify-content-center">
                Rent
              </div>
              <div class="row d-flex justify-content-center mt-2">{rent}</div>
            </div>

            <div class="row mt-3  button-positioning ">
              <div class="col-md-4">
                {" "}
                <Link class="view-applicants-button" to={`/myadverts/${ID}`}>
                  View Applicants
                </Link>
              </div>
            </div>

            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ad_indv;
