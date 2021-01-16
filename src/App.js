import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./totry/Home";
import Attendance from "./totry/Attendance";
import Dashboard from "./totry/Dashboard";
import Records from "./totry/Records";
import PrivateRoute from "./totry/PrivateRoute";
import PublicRoute from "./totry/PublicRoute";
import Header from "./totry/Header";
//import Main from "./totry/Main";
import Footer from "./totry/Footer";
import Signup from "./totry/Signup";
import Login from "./totry/Login";
import { auth } from "./firebase/firebase";
import { db } from "./firebase/firebase";
import {
  signup,
  login,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
} from "./firebase/auth";

class App extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: null,
      userName: null,
      userID: null,
      userClassList: [],
      userAttendanceRecord: [],
      email: "",
      password: "",
      passwordConfirm: "",
      // classSelection: undefined,
    };
    this.changeLogIn = this.changeLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.signOut = this.signOut.bind(this);
    this.checkUserDb = this.checkUserDb.bind(this);
    //this.handleClassSelection = this.handleClassSelection.bind(this);
  }

  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });
  }

  //gets and assigns user data from firebase
  checkUserDb(user) {
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
    this._isMounted = true
    // this.setState({
    //   userID: localStorage.getItem("rollCallUserID")
    // })
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          loading: false,
        });
        this.checkUserDb(this.state.userID);
      } else {
        this.setState({
          isLoggedIn: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //displays field value as typed
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
      .then(() => console.log(this.state.userID))
      .then(() => console.log(this.state.userName))
      .catch((error) => {
        this.setState({ error: error.message });
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

  //resets user cred in state to null
  signOut() {
    signOut().then(
      () =>
        this.setState({
          userName: null,
          userID: null,
          userClassList: [],
          userAttendanceRecord: [],
        })
      //localStorage.removeItem('rollCallUserID'),
    );
  }

  changeLogIn() {
    this.setState((prevState) => {
      return {
        isLoggedIn: !prevState.isLoggedIn,
      };
    });
  }
  render() {
    let home;
    if(this.state.isLoggedIn){
      home=(
        <Attendance
              userID={this.state.userID}
              userClassList={this.state.userClassList}
              userAttendanceRecord={this.state.userAttendanceRecord}
            />
      )
    }else{
      home=(
        <Home />
      )
    }
    let attendance;
    if(this.state.isLoggedIn){
      attendance=(
        <Attendance
              userID={this.state.userID}
              userClassList={this.state.userClassList}
              userAttendanceRecord={this.state.userAttendanceRecord}
            />
      )
    }else{
      attendance=(
        <Home />
      )
    }
    let records;
    if(this.state.isLoggedIn){
      records=(
        <Records
              userID={this.state.userID}
              userAttendanceRecord={this.state.userAttendanceRecord}
            />
      )
    }else{
      records=(
        <Home />
      )
    }
    let dashboard;
    if(this.state.isLoggedIn){
      dashboard=(
        <Dashboard
              userID={this.state.userID}
              userClassList={this.state.userClassList}
            />
      )
    }else{
      dashboard=(
        <Home />
      )
    }
    return (
      <div>
        <Signup
          // showSignup={this.state.showSignup}
          // switchModal={this.switchModal}
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
          // showLogin={this.state.showLogin}
          // switchModal={this.switchModal}
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
        <Header
          isLoggedIn={this.state.isLoggedIn}
          signOut={this.signOut}
          changeLogIn={this.changeLogIn}
        />
        <Switch>
          {/* <PublicRoute
            component={Home}
            isLoggedIn={this.state.isLoggedIn}
            path="/"
            exact
          /> */}
          <Route path="/" exact>
            {home}
            {/* <Attendance
              userID={this.state.userID}
              userClassList={this.state.userClassList}
              userAttendanceRecord={this.state.userAttendanceRecord}
            /> */}
          </Route>
          <Route path="/attendance">
            {attendance}
            {/* <Attendance
              userID={this.state.userID}
              userClassList={this.state.userClassList}
              userAttendanceRecord={this.state.userAttendanceRecord}
            /> */}
          </Route>
          <Route path="/records">
            {records}
            {/* <Records
              userID={this.state.userID}
              userAttendanceRecord={this.state.userAttendanceRecord}
            /> */}
          </Route>
          <Route path="/dashboard">
            {dashboard}
            {/* <Dashboard
              userID={this.state.userID}
              userClassList={this.state.userClassList}
            /> */}
          </Route>
          {/* <PrivateRoute
            component={Attendance}
            isLoggedIn={this.state.isLoggedIn}
            userID={this.state.userID}
            userClassList={this.state.userClassList}
            userAttendanceRecord={this.state.userAttendanceRecord}
            path="/attendance"
            exact
          />
          <PrivateRoute
            component={Records}
            isLoggedIn={this.state.isLoggedIn}
            userID={this.state.userID}
            userAttendanceRecord={this.state.userAttendanceRecord}
            path="/records"
            exact
          />
          <PrivateRoute
            component={Dashboard}
            isLoggedIn={this.state.isLoggedIn}
            userID={this.state.userID}
            userClassList={this.state.userClassList}
            classSelection={this.state.classSelection}
            path="/dashboard"
            exact
          /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
