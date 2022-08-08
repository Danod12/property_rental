import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  return (
    <div>
      <div>
        {myProfile.map((val) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(Profile);
