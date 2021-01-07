import React from 'react'

function StudentList(props) {
    return (
        
            <li className="list-group-item">{props.lastName}, {props.firstName}</li>
    )
}

export default StudentList