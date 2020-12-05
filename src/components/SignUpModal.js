import React from 'react'

function SignUpModal(){
    return (
    <div id="modal-signup" className="modal fade" tabindex='-1'>
    <div className="modal-dialog">
      <div className="modal-content p-3">
      <form action="/examples/actions/confirmation.php" method="post">
      <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <hr />
            <div className="form-group">
            <div className="input-group">
            <div className="input-group-prepend">
            <span
                    class="input-group-text"
                    style="
                      width: 40px;
                      text-align: center;
                      display: inline-block;
                    "
                  >
                    <i class="fa fa-user"></i>
                  </span>
            </div>
            <input
                  type="email"
                  class="form-control"
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
                    class="input-group-text"
                    style="
                      width: 40px;
                      text-align: center;
                      display: inline-block;
                    "
                  >
                    <i class="fa fa-lock px-auto"></i>
                  </span>
            </div>
            <input
                  type="text"
                  class="form-control"
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
                    class="input-group-text"
                    style="
                      width: 40px;
                      text-align: center;
                      display: inline-block;
                    "
                  >
                    <i class="fa fa-check"></i>
                  </span>
              </div>
              <input
                  type="text"
                  class="form-control"
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
      Already have an account?
            <a
              role="button"
              href="#"
              data-toggle="modal"
              data-target="#modal-login"
              >Login here</a>
      </div>
      </div>
    </div>
  </div>
        
    )
}
export default SignUpModal