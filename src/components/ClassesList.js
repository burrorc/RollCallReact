import React from 'react'

function ClassesList(props) {
    return (
        
        <div className="col" style={{ width: "50vw" }}>
        <h3 className="text-center my-0" style={{ fontWeight: '700'}}>{props.title}</h3>
        </div>
    )
}

export default ClassesList