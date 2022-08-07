import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  const [applicantList, setApplicantList] = useState([]);
  const [fullApplicantProfile, setFullApplicantProfile] = useState([]);

  const { adId } = useParams();

  const getIndAd = `http://localhost:3001/advert/${adId}`;

  useEffect(() => {
    Axios.get(getIndAd).then((response) => {
      setApplicants(response.data);
    });
  }, []);

  let applicantArray = [];
  let fullProfile = [];
  let noCustomers = applicants.length;
  let i = 0;
  let j = 0;

  useEffect(() => {
    const findProfiles = async () => {
      for (i; i < noCustomers; i++) {
        const response = await Axios.post(
          "http://localhost:3001/application_profiles",
          {
            customerNumber: applicants[i].id_user_customer,
          }
        ).then((response) => {
          applicantArray[i] = response.data;
        });
      }
    };
    findProfiles();

    setApplicantList(applicantArray);
  }, [applicants]);

  const findFullProfiles = () => {
    for (j; j < noCustomers; j++) {
      fullProfile[j] = {
        id: applicants[j].id_user_customer,
        verification: applicants[j].verification,
        first_name: applicantList[j][0].first_name,
        last_name: applicantList[j][0].last_name,
        contact_no: applicantList[j][0].contact_no,
        email: applicantList[j][0].email,
        work_ref: applicantList[j][0].work_ref,
        landlord_ref: applicantList[j][0].landlord_ref,
        photo_id: applicantList[j][0].photo_id,
      };
    }
    setFullApplicantProfile(fullProfile);
  };

  return (
    <div>
      <button onClick={findFullProfiles}>Find Profiles</button>
      <div>
        <section id="section">
          <div class="container">
            <div class="row">
              <div class="col-md-8 mx-auto text-center">
                <h6 class="text-primary">Your Rental Applications</h6>
                <h1>Applications</h1>
                <p>
                  These are the users that have responded to your property ads
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-leg-4">
                <div class="applications">
                  <div class="iconbox ">I</div>
                  <h5>Profile</h5>
                  <p>Profile Info</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Applicants;
