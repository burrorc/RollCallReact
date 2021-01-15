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
