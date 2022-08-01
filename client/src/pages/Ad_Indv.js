import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
function Ad_indv({ description, rent, ID }) {
  const { adId } = useParams();

  console.log(adId, "hi");
  return (
    <div>
      Description:{description} Rent: {rent} adId: {ID}:
      <Link to={`/myadverts/${ID}`}>View Ad</Link>
    </div>
  );
}

export default Ad_indv;
