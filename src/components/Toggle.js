import React from 'react'

function Toggle(props){
    return(
        <input 
                type="checkbox" 
                checked={props.checked} 
                className={props.className}
                onChange={(e) => props.handleChange(e.target.className, props.studentIndex)}
            />
    )
}
export default Toggle