import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  const [applicantList, setApplicantList] = useState([]);

  const { adId } = useParams();

  const getIndAd = `http://localhost:3001/advert/${adId}`;

  useEffect(() => {
    Axios.get(getIndAd).then((response) => {
      setApplicants(response.data);
    });
  }, []);

  let applicantArray = [];
  let noCustomers = applicants.length;
  let i = 0;

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

  console.log(applicants);
  return (
    <div>
      <h1>This is your main ad</h1>
    </div>
  );
}

export default Applicants;
