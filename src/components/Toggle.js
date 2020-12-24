import React from 'react'

function Toggle(props){
    return(
        <div>
        <input 
                type="checkbox" 
                checked={props.checked} 
                className={props.className}
                onChange={(e) => props.handleChange(e.target.className, props.studentIndex)}
            />
            <label htmlFor="myInput"></label>
            </div>
    )
}
export default Toggle