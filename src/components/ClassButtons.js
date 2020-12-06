import React from 'react'
import ItemText from './ItemText'

function ClassButtons(props){
    return(
        <div className="col" style={{ width: "50vw" }}>
        <h3 className="text-center my-0"><ItemText text={props.text}/></h3>
        </div>
    )
}
export default ClassButtons