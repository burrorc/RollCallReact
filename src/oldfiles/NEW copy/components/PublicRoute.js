import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  isLoggedIn,
  //path,
  //I don't know why this is needed "...rest"
  //...rest
}) => (
  <Route
   //I don't know why this is needed {..rest}
    //{...rest}
    component={(props) =>
    //if authenticated render component otherwise go home
      isLoggedIn ? (
        <Redirect to="/attendance" />
      ) : (
        <Component isLoggedIn={isLoggedIn} {...props} />
      )
    }
  />
);


// component={(props)=>
//         authenticated ? (
//             <Redirect to="/attendance" />
//         ):
//             <Component {...props} />

// } />

// const PublicRoute = ({component: Component, authenticated, ...rest}) => {
//     return (
//         // restricted = false meaning public route
//         // restricted = true meaning restricted route
//         <Route {...rest} render={props => (
//             authenticated ?
//                 <Redirect to="/attendance" />
//             : <Component {...props} />
//         )} />
//     );
// };

export default PublicRoute;
