import React from 'react'

function Attendance(props) {
    return(
  <div>
     <h1 style={{color: props.color}}>Attendance</h1>
     <h3>I am {props.who}</h3>
  </div>
    )
}

export default Attendance