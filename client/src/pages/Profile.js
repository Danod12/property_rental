import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

function Profile() {
  const { userId } = useParams();

  const [myProfile, setMyProfile] = useState([]);

  const getFullProfile = `http://localhost:3001/personal_profile/${userId}`;

  useEffect(() => {
    Axios.get(getFullProfile, {
      id: userId,
    }).then((response) => {
      setMyProfile(response.data);
      console.log(response.data);
      console.log("hello");
    });
  }, []);

  /*Profile

  {
  
      return (
        <div>
          Email = {val.email};
          <Link to={`/work_reference/${val.work_ref}`}>
            View Work Reference
          </Link>
          <br></br>
          <Link to={`/landlord_reference/${val.landlord_ref}`}>
            View Landlord Reference
          </Link>
        </div
      );
    });
  }

  /* */

  /* */

  return (
    <div>
      {myProfile.map((val) => {
        return (
          <div>
            <div class="hero-create-ad vh-120 d-flex align-items-center ">
              <div class="container base-sign-container-create-ad bg-white col-6">
                <div class="row create-header">
                  <div class="row justify-content-center mt-3"></div>
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col-md-3"></div>
                </div>

                <div class="row">
                  <div class="col-md-12 form-title">
                    <br></br>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 form-title">
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

                    <br></br>
                  </div>

                  <div class="col-md-6 "></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Profile);
