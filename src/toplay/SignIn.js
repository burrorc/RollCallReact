import React from 'react'

function SignIn(props) {
    return(
  <div>
    <h1 style={{color: props.color}}>Sign In</h1>
    <h3>{props.authenticated}</h3>
  </div>
    )
}

export default SignIn