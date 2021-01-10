import React from "react";

function Signup(props) {
  return (
    <div
      id="modal-signup"
      className="modal fade"
      tabindex="-1"
      display={props.showSignup}
    >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <form id="signupForm">
            <button
              id="closeSignup"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h2>Sign Up</h2>

            <p>Please fill in this form to create an account!</p>
            <hr />

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      width: 40,
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  id="signup-email"
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required="required"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      width: 40,
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    <i className="fa fa-lock px-auto"></i>
                  </span>
                </div>
                <input
                  id="signup-password"
                  type="text"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      width: 40,
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required="required"
                />
              </div>
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-lg mx-auto">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <span>Already have an account? </span>
            <span
              role="button"
              className="primary"
              data-toggle="modal"
              data-target="#modal-login"
              style={{ color: "#0069D9" }}
              onClick={() => document.getElementById('closeSignup').click()}
            >
              Login here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
