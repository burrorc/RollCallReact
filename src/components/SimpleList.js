import React from "react";
import Toggle from "./Toggle";

function SimpleList(props) {
  console.log(props.student.present);
  return (
    <li id={"sa" + props.item} className='pl-3'>
      <div className="row">
        <div className="col-2 col-md-1">
          <div className="row justify-content-around">
            <div className="col-4 px-1">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.present}
                className="present"
                handleChange={props.handleChange}
              />
            </div>
            <div className="col-4 px-1">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.late}
                className="late"
                handleChange={props.handleChange}
              />
            </div>
            <div className="col-4 px-1">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.camera}
                className="camera"
                handleChange={props.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-10 col-md-11 pl-1">
          {props.student.lastName + ", " + props.student.firstName}
        </div>
      </div>
    </li>
  );
}

export default SimpleList;
