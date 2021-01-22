import React from 'react'
import {Link} from 'react-router-dom'
import logo from "./rollCall.png";


function Header(props){

let displayLinks;
if(props.isLoggedIn){
    displayLinks = (
        <div className="navbar-nav ml-auto">
          <Link
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            to="/attendance"
            className="loggedInLinks nav-item nav-link"
          >
            <span className="textI">ATTENDANCE</span>
          </Link>
          <Link
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            to="/records"
            className="loggedInLinks nav-item nav-link"
          >
            <span className="textI">RECORDS</span>
          </Link>
          <Link
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            to="/dashboard"
            className="loggedInLinks nav-item nav-link"
          >
            <span className="textI">DASHBOARD</span>
          </Link>
          <button
            type="button"
            className="btn btn-link loggedInLinks nav-item nav-link mybuttonAlt"
            style={{
              lineHeight: " 22px",
              color: "#036937",
              fontWeight: "bold",
              width: 118,
              textAlign: "center",
            }}
            onClick={() => props.signOut()}
          >
            <i className="fa fa-sign-out"></i>
            <span> SIGN OUT</span>
          </button>
        </div>
      );
}  else {
    displayLinks = (
      <div className="navbar-nav ml-auto">
        <button
          type="button"
          className="btn btn-link nav-item nav-link navbar-right loggedOutLinks shadow-none"
          data-toggle="modal"
          data-target="#modal-signup"
          style={{color: "white"}}
        >
          <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
        </button>
        <button
          type="button"
          className="btn btn-link nav-item nav-link navbar-right loggedOutLinks shadow-none"
          data-toggle="modal"
          data-target="#modal-login"
          style={{color: "white"}}
        >
          <i className="fa fa-user-circle-o" aria-hidden="true"></i> Login
        </button>
      </div>
    );
  }
    return(
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark fixed-top myNav">
            <Link to="/" className="navbar-brand align-bottom">
              <img src={logo} alt="logo" style={{ height: 30 }} />
              <span className="align-middle" id="logoTitle">
                {" "}
                ROLL CALL
              </span>
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
        </div>
    )
}

export default Header