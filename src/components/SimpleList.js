import React from "react";
import Toggle from "./Toggle";

function SimpleList(props) {
  console.log(props.student.present);
  return (
    <li id={"sa" + props.item}>
      <Toggle
        studentIndex={props.studentIndex}
        checked={props.student.present}
        className={"present"}
        handleChange={props.handleChange}
      />

      <Toggle
        studentIndex={props.studentIndex}
        checked={props.student.late}
        className={"late"}
        handleChange={props.handleChange}
      />

      <Toggle
        studentIndex={props.studentIndex}
        checked={props.student.camera}
        className={"camera"}
        handleChange={props.handleChange}
      />

      {/* <input
        type="checkbox"
        checked={props.student.present}
        className={"present"}
        onChange={(e) =>
          props.handleChange(e.target.className, props.studentIndex)
        }
      />
      <input
        type="checkbox"
        checked={props.student.late}
        className={"late"}
        onChange={(e) =>
          props.handleChange(e.target.className, props.studentIndex)
        }
      />
      <input
        type="checkbox"
        checked={props.student.camera}
        className={"camera"}
        onChange={(e) =>
          props.handleChange(e.target.className, props.studentIndex)
        }
      /> */}
      {props.student.lastName + ", " + props.student.firstName}
    </li>
  );
}

export default SimpleList;
