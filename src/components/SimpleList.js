import React from "react";
import Toggle from "./Toggle";

function SimpleList(props) {
  console.log(props.student.present);
  return (
    <li id={"sa" + props.item}>
      <div className="row">
        <div className="col-1">
          <div className="row">
            <div className="col-3 pr-0">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.present}
                className={"present"}
                handleChange={props.handleChange}
              />
            </div>
            <div className="col-3 pr-0">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.late}
                className={"late"}
                handleChange={props.handleChange}
              />
            </div>
            <div className="col-3 pr-0">
              <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.camera}
                className={"camera"}
                handleChange={props.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-11 pl-0">
          {props.student.lastName + ", " + props.student.firstName}
        </div>
      </div>
    </li>
  );
}

export default SimpleList;
