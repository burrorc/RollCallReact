import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Classes from "../pages/Classes";
import Records from "../pages/Records";
import Students from "../pages/Students";
import Setup from "../pages/Setup";

class Navbar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  render() {
    let displayLinks;
    if (this.state.isLoggedIn) {
      displayLinks = (
        <div className="navbar-nav ml-auto">
          <Link to="/classes" className="loggedInLinks nav-item nav-link">
            Classes
          </Link>
          <Link to="/students" className="loggedInLinks nav-item nav-link">
            Students
          </Link>
          <Link to="/records" className="loggedInLinks nav-item nav-link">
            Records
          </Link>
          <Link to="/setup" className="loggedInLinks nav-item nav-link">
            Setup
          </Link>
        </div>
      );
    } else {
      displayLinks = (
        <div className="navbar-nav ml-auto">
          <button
            type="button"
            className="btn btn-link loggedOutLinks nav-item nav-link navbar-right "
            data-toggle="modal"
            data-target="#modal-signup"
          >
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> Sign Up
          </button>
          <button
            type="button"
            className="btn btn-link loggedOutLinks nav-item nav-link navbar-right "
            data-toggle="modal"
            data-target="#modal-login"
          >
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> login
          </button>

        </div>
      );
    }

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              Roll Call
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse navbar-right "
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav ml-auto">{displayLinks}</div>
            </div>
          </nav>
          <Switch>
            <Route path="/classes">
              <Classes />
            </Route>
            <Route path="/students">
              <Students />
            </Route>
            <Route path="/records">
              <Records />
            </Route>
            <Route path="/setup">
              <Setup />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar2;
