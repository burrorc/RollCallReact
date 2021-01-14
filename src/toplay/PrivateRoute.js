import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { isLogin } from './utils';

const PrivateRoute = ({
    component: Component,
  	authenticated,
    ...rest
}) => (
    <Route {...rest} component={(props)=> 
            authenticated ? (
                <Component {...props} />
            ):(
                <Redirect to="/" />
            )
    } />
)

export default PrivateRoute;