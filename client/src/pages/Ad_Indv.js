import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
function Ad_indv({ description, rent, ID, property_photo }) {
  const { adId } = useParams();

  return (
    <div class="hero-ad  d-flex align-items-center hero-ad-background">
      <div class="container base-sign-container-ad col-9">
        <div class="row mt-5"></div>

        <div class="row justify-content-center">
          <div class="col-md-4 align-items-center">
            <img
              class="ad_image"
              src={require(`../assets/property_photos/${property_photo}`)}
              alt="interior"
              width="300"
              height="200"
            ></img>
          </div>

          <div class="col-md-6  form-title-ad ">
            Description: {description} | Rent: {rent}
            <br></br>
            <Link to={`/myadverts/${ID}`}>View Applicants</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ad_indv;
