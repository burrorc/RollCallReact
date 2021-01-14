import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { isLogin } from './utils';

const PrivateRoute = ({
  component: Component,
  authenticated,
  color,
  who,
  //I don't know why this is needed "...rest"
  // ...rest
}) => (
  <Route
   //I don't know why this is needed {..rest}
    // {...rest}
    component={(props) =>
    //if authenticated render component otherwise go home
      authenticated ? (
        <Component color={color} who={who} authenticated={authenticated} {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
