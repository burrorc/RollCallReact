import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Attendance from "../pages/Attendance/Attendance";
import Records from "../pages/Records/Records";
import Dashboard from "../pages/Dashboard/Dashboard";
import logo from "./rollCall.png";
import Signup from "./Signup";
import Login from "./Login";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import {
  signup,
  login,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
} from "../firebase/auth";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userName: null,
      userID: null,
      userClassList: [],
      userAttendanceRecord: [],
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
    this.switchModal = this.switchModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.signOut = this.signOut.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.checkUserDb = this.checkUserDb.bind(this);
  }

//gets and assigns user data from firebase
  checkUserDb (user){
      db.collection("users")
        .doc(user)
        .onSnapshot((snapshot) => {
          if (snapshot.data().classList) {
            this.setState({
              userClassList: snapshot.data().classList,
            });
          }
          if (snapshot.data().attendance) {
            this.setState({
              userAttendanceRecord: snapshot.data().attendance,
            });
          }
        });
}

//initiates auth listener and gets user data
  componentDidMount() {
    // this.setState({
    //   userID: localStorage.getItem("rollCallUserID")
    // })
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
        this.checkUserDb(this.state.userID);
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }
  
//resets user cred in state to null
  signOut() {
    signOut()
      .then(() => this.setState({
        userName: null,
        userID: null,
        userClassList:[],
        userAttendanceRecord:[],
      }),
      //localStorage.removeItem('rollCallUserID'),
      )
  }

//clear form
  resetForm() {
    this.setState({
      email: "",
      password: "",
      passwordConfirm: "",
      error: "",
    });
  }

//displays field value as typed
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

//facebook for login with check for new/old user
  facebookLogin(newUser) {
    signInWithFacebook()
      .then((cred) => {
        if (newUser) {
          db.collection("users").doc(cred.user.uid).set(
            {
              userName: cred.user.email,
            },
            { merge: true }
          );
        }
        db.collection("users").doc(cred.user.uid).set({
          userName: cred.user.email,
        });
        this.setState({
          userName: cred.user.email,
          userID: cred.user.uid,
          showSignup: "none",
        });
      })
      .then(() => document.getElementById("closeSignup").click())
      .then(() => document.getElementById("closeLogin").click())
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

//google for login with check for new/old user  
  googleLogin(newUser) {
    signInWithGoogle()
      .then((cred) => {
        if (newUser) {
          db.collection("users").doc(cred.user.uid).set(
            {
              userName: cred.user.email,
            },
            { merge: true }
          );
        }
        this.setState({
          userName: cred.user.email,
          userID: cred.user.uid,
          showSignup: "none",
        });
        //localStorage.setItem('rollCallUserID', this.state.userID)
      })
      .then(() => document.getElementById("closeSignup").click())
      .then(() => document.getElementById("closeLogin").click())
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

//email sign up
  handleSignUp(event) {
    event.preventDefault();
    this.setState({ error: "" });
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        error: "PASSWORD MUST MATCH CONFIRM PASSSWORD",
        password: "",
        passwordConfirm: "",
      });
    } else {
      signup(this.state.email, this.state.password)
        .then((cred) => {
          db.collection("users").doc(cred.user.uid).set({
            userName: cred.user.email,
          });
          this.setState({
            userName: cred.user.email,
            userID: cred.user.uid,
            showSignup: "none",
          });
        })
        .then(() => document.getElementById("closeSignup").click())
        .catch((error) => {
          this.setState({ error: error.message });
        });
    }
  }

//email login
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
      })
      .then(() => document.getElementById("closeLogin").click())
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

//swap between signup and login
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

  render() {
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
          <Switch>
            <Route exact path="/" component={Home}/>
              {/* <Home />
            </Route> */}
            <Route path="/attendance">
              <Attendance
                userID={this.state.userID}
                userClassList={this.state.userClassList}
                userAttendanceRecord={this.state.userAttendanceRecord}
              />
            </Route>
            <Route path="/records">
              <Records userID={this.state.userID} userAttendanceRecord={this.state.userAttendanceRecord}/>
            </Route>
            <Route path="/dashboard">
              <Dashboard userID={this.state.userID} userClassList={this.state.userClassList}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
