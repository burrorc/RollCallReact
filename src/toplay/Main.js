import { Switch} from "react-router-dom";
import Home from "./Home";
import Attendance from "./Attendance";
import Dashboard from "./Dashboard";
//import SignIn from "./SignIn";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function Main(props) {
  return (
    <main>
      <Switch>
        <PublicRoute restricted={true} component={Home} authenticated={props.authenticated} path="/" exact />
        <PrivateRoute component={Dashboard} authenticated={props.authenticated} path="/dashboard" exact />
        <PrivateRoute component={Attendance} authenticated={props.authenticated} path="/attendance" exact />
      </Switch>
    </main>
  );
}

export default Main;
