import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home/Home";
import Attendance from "../pages/Attendance/Attendance";
import Records from "../pages/Records/Records";
import Dashboard from "../pages/Dashboard/Dashboard";
import logo from "./rollCall.png";
import Signup from "./Signup";
import Login from "./Login";
import { auth } from "../firebase/firebase";
import {db} from "../firebase/firebase";
import { signup, login, signInWithGoogle, signInWithFacebook, signOut} from "../firebase/auth";

let classList= JSON.parse(localStorage.getItem("localClassList"));
let attendance= JSON.parse(localStorage.getItem("localAttendance"));

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userName: null,
      email: "",
      password: "",
      passwordConfirm: "",
      authenticated: false,
      loading: true,
      isLoggedIn: false,
      showSignup: "none",
      showLogin: "none",
    };
    this.openSignup = this.openSignup.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.signOut = this.signOut.bind(this);
    this.resetForm = this.resetForm.bind(this);
    // this.sendFirestore = this.sendFirestore.bind(this);
  }
  
  // sendFirestore(){
  //   db.collection("users").add({
  //     user: this.state.user,
  //     classList: classList,
  //     attendance: attendance,

  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });
  // };

  signOut(){
    signOut()
    .then (()=>console.log('signed out'))
  }

  resetForm(){
    this.setState({
      email: "",
      password: "",
      passwordConfirm: "",
      error:"",
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  facebookLogin(){
    signInWithFacebook()
    .then((cred)=>{
      this.setState({
        userName: cred.user.email,
        showSignup: "none",
      });
      console.log(this.state.userName)
    })
    .then(() => document.getElementById("closeSignup").click())
    .then(() => document.getElementById("closeLogin").click())

      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  googleLogin() {
    signInWithGoogle()
      .then((cred) => {
        this.setState({
          userName: cred.user.email,
          showSignup: "none",
        });
        console.log(this.state.userName)
      })
      .then(() => document.getElementById("closeSignup").click())
      .then(() => document.getElementById("closeLogin").click())
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleSignUp(event) {
    event.preventDefault();
    this.setState({ error: "" });
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        error: "PASSWORD MUST MATCH CONFIRM PASSSWORD",
        password: "",
        passwordConfirm: "",
      });
    }else{
    signup(this.state.email, this.state.password)
      .then((cred) => {
        this.setState({
          user: cred.user.email,
          showSignup: "none",
        });
      })
      .then(() => document.getElementById("closeSignup").click())

      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  }

  handleLogin(event) {
    event.preventDefault();
    this.setState({ error: "" });
    login(this.state.email, this.state.password)
      .then((cred) => {
        this.setState({
          user: cred.user.email,
          showLogin: "none",
        });
        console.log(this.state.user)
      })
      .then(() => document.getElementById("closeLogin").click())

      .catch((error) => {
        this.setState({ error: error.message });
      });
    
  }
  // async handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ error: "" });
  //   try {
  //     await signup(this.state.email, this.state.password);
  //   } catch (error) {
  //     this.setState({ error: error.message });
  //   }
  // }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userName: user.email,
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  switchModal(modal) {
    if (modal === "signup") {
      document.getElementById("closeSignup").click();
      this.setState({
        showLogin: "block",
      });
    } else if (modal === "login") {
      document.getElementById("closeLogin").click();
      this.setState({
        showSignup: "block",
      });
    }
  }

  openSignup() {
    this.setState({
      showSignup: "block",
    });
  }
  openLogin() {
    this.setState({
      showLogin: "block",
    });
  }
  render() {
    let displayLinks;
    if (this.state.authenticated) {
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
            style={{ lineHeight:' 22px', color: "#036937", fontWeight: "bold", width:118, textAlign:'center' }}
            onClick={()=>this.signOut()}
          >
            <i className="fa fa-sign-out"></i><span> SIGN OUT</span>
          </button>
          
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
            style={{ color: "white", fontWeight: "bold", width:105,textAlign:'left' }}
            onClick={() => this.openSignup()}
          >
            <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
          </button>
          <button
            type="button"
            className="btn btn-link loggedOutLinks nav-item nav-link navbar-right "
            data-toggle="modal"
            data-target="#modal-login"
            style={{ color: "white", fontWeight: "bold", width:105, textAlign:'left' }}
          >
            <i className="fa fa-user-circle-o" aria-hidden="true"></i> Login
          </button>
        </div>
      );
    }

    return (
      <Router>
        <div>
          <Signup
            showSignup={this.state.showSignup}
            switchModal={this.switchModal}
            handleSignUp={this.handleSignUp}
            handleChange={this.handleChange}
            email={this.state.email}
            password={this.state.password}
            passwordConfirm={this.state.passwordConfirm}
            error={this.state.error}
            googleLogin={this.googleLogin}
            facebookLogin={this.facebookLogin}
            resetForm={this.resetForm}
          />
          <Login
            showLogin={this.state.showLogin}
            switchModal={this.switchModal}
            handleLogin={this.handleLogin}
            handleChange={this.handleChange}
            email={this.state.email}
            password={this.state.password}
            passwordConfirm={this.state.passwordConfirm}
            error={this.state.error}
            googleLogin={this.googleLogin}
            facebookLogin={this.facebookLogin}
            resetForm={this.resetForm}
          />
          <nav className="navbar navbar-expand-lg navbar-dark myNav">
            <Link to="/" className="navbar-brand align-bottom">
              <img src={logo} alt="logo" style={{ height: 40 }} />
              <span className="align-middle" id="logoTitle">
                {" "}
                ROLL CALL
              </span>
            </Link>
            <button onClick={this.sendFirestore}>Firestore</button>
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
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/attendance">
              <Attendance />
            </Route>
            <Route path="/records">
              <Records />
            </Route>
            <Route path="/dashboard">
              <Dashboard userName={this.state.userName}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
