import React from "react";

function Login(props) {
  return (
    <div id="modal-login" className="modal fade" tabindex="-1" display={props.showLogin}>
    <div className="modal-dialog">
      <div className="modal-content p-3">
        <form action="/examples/actions/confirmation.php" method="post">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            id="closeLogin"
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
                type="text"
                className="form-control"
                name="password"
                placeholder="Password"
                required="required"
              />
            </div>
          </div>

          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary btn-lg mx-auto">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <span>Don't have an account? </span>
          <span
            role="button"
            data-toggle="modal"
            data-target="#modal-signup"
            style={{ color: "#0069D9" }}
            onClick={()=>document.getElementById('closeLogin').click()}
            >Sign up here
            </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login