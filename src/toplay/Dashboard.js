import React from 'react'

function Dashboard(props) {
    return(
  <div>
     <h1 style={{color: props.color}}>Dashboard</h1>
    <h3>I am {props.who}</h3>
  </div>
    )
}

export default Dashboard