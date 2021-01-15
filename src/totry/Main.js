import React from "react";
import {Switch} from "react-router-dom";
import Home from "./Home";
import Attendance from "./Attendance";
import Dashboard from "./Dashboard.js";
import Records from "./Records";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        {/* <Signup
        // showSignup={this.state.showSignup}
        // switchModal={this.switchModal}
        // handleSignUp={this.handleSignUp}
        // handleChange={this.handleChange}
        // email={this.state.email}
        // password={this.state.password}
        // passwordConfirm={this.state.passwordConfirm}
        // error={this.state.error}
        // googleLogin={this.googleLogin}
        // facebookLogin={this.facebookLogin}
        // resetForm={this.resetForm}
        />
        <Login
        // showLogin={this.state.showLogin}
        // switchModal={this.switchModal}
        // handleLogin={this.handleLogin}
        // handleChange={this.handleChange}
        // email={this.state.email}
        // password={this.state.password}
        // passwordConfirm={this.state.passwordConfirm}
        // error={this.state.error}
        // googleLogin={this.googleLogin}
        // facebookLogin={this.facebookLogin}
        // resetForm={this.resetForm}
        /> */}
        <Switch>
          <PublicRoute
            component={Home}
            isLoggedIn={this.props.isLoggedIn}
            path="/"
            exact
          />
          <PrivateRoute
            component={Attendance}
            isLoggedIn={this.props.isLoggedIn}
            path="/attendance"
            exact
          />
          <PrivateRoute
            component={Records}
            isLoggedIn={this.props.isLoggedIn}
            path="/records"
            exact
          />
          <PrivateRoute
            component={Dashboard}
            isLoggedIn={this.props.isLoggedIn}
            path="/dashboard"
            exact
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
