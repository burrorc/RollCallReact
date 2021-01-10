import React from "react";
import google from "./googleSignin.svg";
function Signup(props) {
  return (
    <div
      id="modal-signup"
      className="modal fade"
      tabIndex="-1"
      display={props.showSignup}
    >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <form id="signupForm" onSubmit={props.handleSubmit}>
            <button
              id="closeSignup"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.resetForm}
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
                  value={props.email}
                  onChange={props.handleChange}
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
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  value={props.password}
                  onChange={props.handleChange}
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
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  required="required"
                  value={props.passwordConfirm}
                  onChange={props.handleChange}
                />
              </div>
            </div>

            <div className="form-group text-center">
              <p style={{height: '1em', color:'red', marginTop:"-8", fontWeight: 'bold'}}>{props.error}</p>
              <button type="submit" className="btn btn-primary btn-lg px-0" style={{width:263}}>
                Sign Up With Email
              </button>
              <p className="my-2">Or</p>
              <button style={{width:263}} onClick={props.googleSignIn} type="button" className="btn btn-primary btn-lg mx-auto pl-0 pr-1 py-0">
                <img src={google} alt="sign up with google" />
                Sign Up With Google
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
              onClick={() => document.getElementById("closeSignup").click()}
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
