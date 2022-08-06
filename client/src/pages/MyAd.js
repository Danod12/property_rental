import React from "react";
import { useEffect, useState } from "react";

import Axios from "axios";
import AdIndv from "../pages/Ad_indv";

function MyAd() {
  const [dbID, setDbID] = useState(null);
  const [myAds, setMyAds] = useState([]);

  const getMyAds = `http://localhost:3001/adverts/${dbID}`;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setDbID(response.data.user[0].id);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(getMyAds).then((response) => {
      setMyAds(response.data);
    });
  }, [dbID]);

  return (
    <div>
      <div>
        {myAds.map((val) => {
          console.log(val);
          return (
            <div>
              <AdIndv
                description={val.description}
                rent={val.rent}
                ID={val.id_property_ad}
                property_photo={val.property_photo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyAd;
