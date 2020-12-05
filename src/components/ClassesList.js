import React from 'react'

function ClassesList(props) {
    return (
        
        <div className="col-lg-3 border mt-3 " style={{ width: "35vw" }}>
        <h3 className="text-center mt-2">{props.title}</h3>
        
        </div>
    )
}

export default ClassesList