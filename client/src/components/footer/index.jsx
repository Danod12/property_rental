import React from "react";
import Logo from "../../assets/images/main_logo.png";

function index() {
  return (
    <div>
      <footer>
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-md-3 align-items-center">
                <img class="footer-logo" src={Logo}></img>
              </div>

              <div class="col-md-4 text-position-about ">
                <h3>About</h3>
                <p class="footer-text ">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  sed faucibus dui. Phasellus ornare mauris pharetra tellus
                  congue gravida. Donec vel dui in ante pulvinar suscipit at id
                  ligula.
                </p>
              </div>

              <div class="col-md-4 text-position-contact ">
                <h3 class=" footer-title ">Contact</h3>
                <ul class="list-unstyled footer-text">
                  <li class="list-margin">
                    {" "}
                    Address: 123 Fictional Road, Faketown, D23DW27{" "}
                  </li>
                  <li class="list-margin">
                    {" "}
                    E-mail: x19219318@student.ncirl.ie{" "}
                  </li>
                  <li class="list-margin"> Phone: 083-234-1234 </li>
                  <br></br>
                  <a href="https://www.facebook.com">
                    <i class="bi bi-facebook icon-size"></i>
                  </a>
                  <a href="https://www.twitter.com">
                    <i class="bi bi-twitter icon-size"></i>
                  </a>
                  <a href="https://www.instagram.com">
                    <i class="bi bi-instagram icon-size"></i>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default index;
