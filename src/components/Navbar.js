import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home/Home";
import Attendance from "../pages/Attendance/AttendanceGOOD";
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
      userID: null,
      email: "",
      password: "",
      passwordConfirm: "",
      authenticated: false,
      loading: true,
      isLoggedIn: false,
      showSignup: "none",
      showLogin: "none",
      myClasses: [],
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
    this.checkUser = this.checkUser.bind(this);
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
      db.collection('users').doc(cred.user.uid).set({
        userName: cred.user.email
      });
      this.setState({
        userName: cred.user.email,
        userID: cred.user.uid,
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

  googleLogin(newUser) {
    signInWithGoogle()
      .then((cred) => {
        if(newUser){
        db.collection('users').doc(cred.user.uid).set({
          userName: cred.user.email
        }, { merge: true });
      }
      console.log('olduser')
        this.setState({
          userName: cred.user.email,
          userID: cred.user.uid,
          showSignup: "none",
        });
      })
      .then(()=>console.log(this.state.userID))
      .then(() => document.getElementById("closeSignup").click())
      .then(() => document.getElementById("closeLogin").click())
      .catch((error) => {
        this.setState({ error: error.message });
      })
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
      .then((cred)=> {
        db.collection('users').doc(cred.user.uid).set({
          userName: cred.user.email
        });
        this.setState({
          userName: cred.user.email,
          userID: cred.user.uid,
          showSignup: "none",
        });
      })
      .then(()=>{
        
        console.log(this.state.userName)
      })

      .then(() => document.getElementById("closeSignup").click())

      .catch((error) => {
        console.log(error);
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
          userName: cred.user.email,
          userID: cred.user.uid,
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
  checkUser(){
    let activeUser=auth().currentUser
    if (activeUser != null){
     console.log('nmae'+activeUser.email)
     console.log('id'+activeUser.uid)
     this.setState({
       userName: activeUser.email,
       userID: activeUser.uid,
     })
    }else{
      console.log('no active')
    }
  }

  componentDidMount() {
    
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(auth().currentUser.uid);
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
          <span>{this.state.userID}</span>
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
            <button onClick={this.checkUser}>Firestore</button>
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
              <Attendance userID={this.state.userID}/>
            </Route>
            <Route path="/records">
              <Records userID={this.state.userID}/>
            </Route>
            <Route path="/dashboard">
              <Dashboard userID={this.state.userID}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
