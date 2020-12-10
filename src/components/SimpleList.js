import React from "react";

function SimpleList(props) {
  console.log(props.student.present)
  return (
    <li id={'sa'+props.item}>
          
          <input 
                type="checkbox" 
                checked={props.student.present} 
                className={'present'}
                onChange={(e) => props.handleChange(e.target.className, props.studentIndex)}
            />
            <input 
                type="checkbox" 
                checked={props.student.late}
                className={'late'}  
                onChange={(e) => props.handleChange(e.target.className, props.studentIndex)}
            />
            <input 
                type="checkbox" 
                checked={props.student.camera}
                className={'camera'}  
                onChange={(e) => props.handleChange(e.target.className, props.studentIndex)}
            />
            {props.student.lastName + ", " + props.student.firstName}
        
    </li>
  );
}

export default SimpleList;
