import React from "react";

function Applicants_Page({ adId, findFullProfiles, hideButton }) {
  const buttonMethods = () => {
    findFullProfiles();
    hideButton();
  };

  return (
    <div>
      <div class="hero-create-applications vh-120 d-flex align-items-center">
        <div class="container base-sign-container-applications col-6">
          <div class="row">
            <div class="col-md-8 mx-auto text-center">
              <h6 class="text-primary">Your Applications For Ad {adId} </h6>
              <br></br>
              <button class="show-profile" onClick={buttonMethods}>
                View Applications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicants_Page;
