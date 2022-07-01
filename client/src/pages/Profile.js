import React from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams();
  return (
    <div>
      <div>You are authenticated</div>
      <div> Username: {userId}</div>
    </div>
  );
}

export default withRouter(Profile);
