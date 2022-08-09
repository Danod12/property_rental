import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import Verification_render_true from "../components/verification_render/Verification_render_true";
import Verification_render_false from "../components/verification_render/Verification_render_false";
import Applicants_Page from "../components/applicants_page/Applicants_Page";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  const [applicantList, setApplicantList] = useState([]);
  const [fullApplicantProfile, setFullApplicantProfile] = useState([]);
  const [show, setShow] = useState(true);

  const hideButton = () => {
    setShow(false);
  };

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
    console.log(fullProfile);
  };

  const viewer = () => {
    <p> Full Applicant Profile</p>;
    console.log(fullApplicantProfile);

    <p>Applicant</p>;
    console.log(applicants);

    <p> Applicant list </p>;
    console.log(applicantList);

    console.log(fullProfile);
  };

  return (
    <div class="container">
      {show ? (
        <Applicants_Page
          findFullProfiles={findFullProfiles}
          hideButton={hideButton}
          adId={adId}
        />
      ) : null}

      <div class="row">
        {fullApplicantProfile.map((val) => {
          let verified = null;

          if (val.verification == 1) {
            verified = true;
          } else {
            verified = false;
          }

          return (
            <div class="col-md-4 mb-4 mt-5">
              <div class="card">
                <div>
                  {verified ? (
                    <Verification_render_true />
                  ) : (
                    <Verification_render_false />
                  )}
                </div>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    Name: {val.first_name} {val.last_name}
                  </li>
                  <li class="list-group-item">Contact No: {val.contact_no}</li>
                  <li class="list-group-item">Email: {val.email}</li>
                </ul>
                <div class="card-body link-position">
                  <Link to={`/work_reference/${val.work_ref}`}>
                    Work Reference
                  </Link>{" "}
                  <Link to={`/landlord_reference/${val.landlord_ref}`}>
                    Landlord Reference
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Applicants;
