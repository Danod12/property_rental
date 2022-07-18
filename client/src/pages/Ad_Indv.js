import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdContext } from "../components/Contexts/AdContext";

export default function Ad_indv({ description, rent, ID }) {
  const { setAdId } = useContext(AdContext);

  return (
    <div>
      Description:{description} Rent: {rent} ID: {ID}:
      <Link to={`/myadverts/${ID}`}>View Ad</Link>
    </div>
  );
}
