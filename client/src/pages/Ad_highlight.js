import React, { useEffect, useState } from "react";
import Axios from "axios";

function Ad_highlight({ id_property_ad }) {
  const [adInd, setAdInd] = useState([]);
  const getIndAd = `http://localhost:3001/advert/9`;

  useEffect(() => {
    Axios.get(getIndAd).then((response) => {
      setAdInd(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <h1>This is your main ad</h1>

      {adInd.map((val) => {
        return (
          <div>
            Description: {val.description}
            Rent: {val.rent}
          </div>
        );
      })}
    </div>
  );
}

export default Ad_highlight;
