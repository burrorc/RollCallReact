import React from "react";
import google from "./googleSignin.svg";
//import facebook from "./facebookSignin.png";
function Login(props) {
  return (
    <div
      id="modal-login"
      className="modal fade"
      tabIndex="-1"
      display={props.showLogin}
    >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <form id="loginForm" onSubmit={props.handleLogin}>
            <button
              id="closeLogin"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.resetForm}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h2>Login</h2>
            <p>Please fill in this form to login!</p>
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
                  id="login-email"
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
                  id="login-password"
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  value={props.password}
                  onChange={props.handleChange}
                />
              </div>
              <p
                style={{
                  height: ".75em",
                  color: "red",
                  marginTop: 5,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {props.error}
              </p>
            </div>

            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-light border btn-lg px-0"
                style={{ width: 300 }}
              >
                Login With Email
              </button>
              <p className="my-2">Or</p>
              <button
                style={{ width: 300 }}
                onClick={props.googleLogin}
                type="button"
                className="btn btn-primary btn-lg mb-1 py-0 px-0 align-text-bottom"
              >
                <img
                  style={{ float: "left" }}
                  src={google}
                  alt="sign up with google"
                />
                <span style={{ lineHeight: "46px", verticalAlign: "bottom" }}>
                  Login With Google
                </span>
              </button>
              {/* <button
                style={{
                  width: 300,
                  paddingLeft: 3,
                  backgroundColor: "#3B5998",
                }}
                onClick={props.facebookLogin}
                type="button"
                className="btn btn-primary btn-lg pr-0 py-0 align-text-bottom"
              >
                <img
                  style={{ float: "left", height: 43, paddingTop: 3 }}
                  src={facebook}
                  alt="sign up with facebook"
                />
                <span style={{ lineHeight: "46px", verticalAlign: "bottom" }}>
                  Login With Facebook
                </span>
              </button> */}
            </div>
          </form>
          <div className="text-center">
            <span>Don't have an account? </span>
            <span
              role="button"
              className="primary"
              data-toggle="modal"
              data-target="#modal-signup"
              style={{ color: "#0069D9" }}
              onClick={() => document.getElementById("closeLogin").click()}
            >
              Sign up here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
