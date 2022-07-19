import React, { useEffect, useState } from "react";
import Axios from "axios";
import Application from "../components/application/Application";

function Rent() {
  const [propertyAdList, setPropertyAdList] = useState([]);

  //displaying rent ads
  useEffect(() => {
    Axios.get("http://localhost:3001/rent").then((response) => {
      setPropertyAdList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      This is the rent page
      <div>
        {propertyAdList.map((val) => {
          return (
            <div>
              <h1>
                Description: {val.description} | Rent: {val.rent} | AdNo:{" "}
                {val.id_property_ad}
              </h1>
              <Application id_property_ad={val.id_property_ad} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rent;
