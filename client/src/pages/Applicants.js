import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";

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

      {fullApplicantProfile.map((val) => {
        return (
          <div>
            id: {val.id}
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
  );
}

export default Applicants;
