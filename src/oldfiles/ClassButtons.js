import React from 'react'

function ClassButtons(props){
    return(
        
        <div className="col" key={props.classIndex} style={{ width: "50vw" }}>
        <h3 className="text-center my-0">{props.text}</h3>
        </div>
    )
}
export default ClassButtons