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

  const deleteProfile = () => {
    Axios.delete("http://localhost:3001/delete_profile", {
      id: userId,
    }).then((response) => {
      alert("Profile Deleted");
    });
  };

  return (
    <div>
      <div>
        {myProfile.map((val) => {
          return (
            <div class="hero-create-ad vh-120 d-flex align-items-center">
              <div class="container base-sign-container-create-ad bg-white col-4">
                <div class="row create-header title-padding">
                  <h3>Profile </h3>
                </div>

                <div class="row d-flex">
                  <div class="col-sm-6  ">
                    <img
                      class="img-circle"
                      src={require(`../assets/photo_references/${val.photo_id}`)}
                      width="200"
                      height="200"
                    ></img>
                  </div>

                  <div class="col-sm-5 ">
                    <div class="row  profile-text-name ">
                      {val.first_name} {val.last_name}
                    </div>

                    <div class="row  profile-contact-text ">
                      E-mail: {val.email} <br></br>
                      Contact No: {val.contact_no} <br></br>
                      <Link
                        class="link-margin"
                        to={`/work_reference/${val.work_ref}`}
                      >
                        View Work Reference
                      </Link>{" "}
                      <br></br>
                      <Link
                        class="link-margin"
                        to={`/landlord_reference/${val.landlord_ref}`}
                      >
                        View Landlord Reference
                      </Link>
                    </div>

                    <div class="row mt-3">
                      <div class="col-lg-12 d-flex justify-content-center ">
                        <button class="delete-button "> Delete Profile</button>
                      </div>
                    </div>
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

export default withRouter(Profile);
