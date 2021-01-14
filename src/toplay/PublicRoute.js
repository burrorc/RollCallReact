import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
  	authenticated,
    ...rest
}) => (
    <Route {...rest} component={(props)=> 
            authenticated ? (
                <Redirect to="/attendance" />
            ):
                <Component {...props} />
            
    } />
)

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