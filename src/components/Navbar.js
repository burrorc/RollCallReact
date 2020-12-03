import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Classes from '../pages/Classes'
import Records from '../pages/Records'
import Students from '../pages/Students'
import Setup from '../pages/Setup'

function Navbar() {
  return (
      <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Roll Call</Link>
        
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
          <div className="navbar-nav ml-auto">
            <Link to="/classes" className='loggedInLinks nav-item nav-link'>Classes</Link>
            <Link to="/students" className='loggedInLinks nav-item nav-link'>Students</Link>
            <Link to="/records" className='loggedInLinks nav-item nav-link'>Records</Link>
            <Link to="/setup" className='loggedInLinks nav-item nav-link'>Setup</Link>
    
            <a role="button" className="loggedOutLinks nav-item nav-link navbar-right " href="#" data-toggle="modal" data-target="#modal-signup">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> Sign Up</a>
            <a role="button" className="loggedOutLinks nav-item nav-link navbar-right " href="#" data-toggle="modal" data-target="#modal-login">
              <i class="fa fa-sign-in" aria-hidden="true"></i> Login
            </a>
          </div>
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

export default Navbar;
