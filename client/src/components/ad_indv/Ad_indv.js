import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdContext } from "../Contexts/AdContext";

function Ad_indv({ description, rent, ID }) {
  let { setAdId } = useContext(AdContext);

  const testFunction = () => {
    setAdId(ID);
  };

  return (
    <div>
      Description:{description} Rent: {rent} ID: {ID}:
      <Link onClick={testFunction} to={`/myadverts/${ID}`}>
        View Ad
      </Link>
    </div>
  );
}

export default Ad_indv;
