import { Switch} from "react-router-dom";
import Home from "./Home";
import Attendance from "./Attendance";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function Main(props) {
  
  return (
    <main>
      <Switch>
        <PublicRoute color="red" component={Home} authenticated={props.authenticated} path="/" exact />
        <PublicRoute color="red" component={SignIn} authenticated={props.authenticated} path="/signin" exact />
        <PrivateRoute color ="blue" who="Boss Man" component={Dashboard} authenticated={props.authenticated} path="/dashboard" exact />
        <PrivateRoute  color ="blue" who={"Worker Man"} component={Attendance} authenticated={props.authenticated} path="/attendance" exact />
      </Switch>
    </main>
  );
}

export default Main;
