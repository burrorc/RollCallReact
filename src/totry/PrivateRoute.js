import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  path,
  //I don't know why this is needed "...rest"
  // ...rest
}) => (
  <Route
   //I don't know why this is needed {..rest}
    // {...rest}
    component={(props) =>
    //if authenticated render component otherwise go home
      isLoggedIn ? (
        <Component isLoggedIn={isLoggedIn} {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
