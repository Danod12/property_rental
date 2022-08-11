import Card from "react-bootstrap/Card";
export default function Landing_main() {
  return (
    <div class="hero vh-100 d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 home-text">
            <h1 class="display-4 ">Welcome Home</h1>
            <p>Property Rental. Hassel Free. </p>

            <div class="row ">
              <div class="col-lg-3 homepage-button">
                <a
                  href="/registration/customer"
                  class="btn btn-primary custom-button-width "
                >
                  Register
                </a>
              </div>
              <div class="col-lg-3 homepage-button ">
                <a href="/login" class="btn btn-primary  custom-button-width ">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
