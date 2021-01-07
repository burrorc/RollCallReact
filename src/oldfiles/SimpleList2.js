import React from "react";
import Toggle from "./Toggle2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faClock,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./toggle.css";

function SimpleList(props) {
  console.log(props.student.present);
  return (
    <li id={"sa" + props.item} className="pl-3" style={{display: "table-row"}}>
      
      <div className="mr-3" style={{ width: 60, display:"table-cell" }}>
        <label class="fancy-checkbox">
          <input
            type="checkbox"
            checked={props.student.present}
            className="present"
            onChange={(e) =>
              props.handleChange(e.target.className, props.studentIndex)
            }
          />
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="unchecked fa-fw"
            style={{ color: "#C0C0C0" }}
          />
          <FontAwesomeIcon icon={faCheckCircle} className="checked fa-fw" />
          {/* {props.icons} */}
        </label>
        {/* <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.present}
                className="present"
                handleChange={props.handleChange}
                icons={props.presentIcons}
              /> */}

        <label class="fancy-checkbox">
          <input
            type="checkbox"
            checked={props.student.late}
            className="late"
            onChange={(e) =>
              props.handleChange(e.target.className, props.studentIndex)
            }
          />
          <FontAwesomeIcon
            icon={faClock}
            className="checked fa-fw"
            style={{ color: "#e0e000" }}
          />
          <FontAwesomeIcon
            icon={faClock}
            className="unchecked fa-fw"
            style={{ color: "#C0C0C0" }}
          />
          {/* {props.icons} */}
        </label>
        {/* <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.late}
                className="late"
                handleChange={props.handleChange}
                icons={props.lateIcons}
              /> */}

        <label class="fancy-checkbox">
          <input
            type="checkbox"
            checked={props.student.camera}
            className="camera"
            onChange={(e) =>
              props.handleChange(e.target.className, props.studentIndex)
            }
          />
          <FontAwesomeIcon icon={faVideo} className="checked fa-fw" />
          <FontAwesomeIcon
            icon={faVideoSlash}
            className="unchecked fa-fw"
            style={{ color: "#C0C0C0" }}
          />
          {/* {props.icons} */}
        </label>
        {/* <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.camera}
                className="camera"
                handleChange={props.handleChange}
                icons={props.cameraIcons}
              /> */}
      </div>
      {/* <div className="col-10 col-md-11 pl-1"> */}
      <div style={{display: "table-cell"}}>
        {props.student.lastName + ", " + props.student.firstName}
      </div>
      {/* <div className="col-10 col-md-11 pl-1"> */}
<div className="col-auto">
      <input
        placeholder="Add comments"
        value={props.student.comments}
        className="comments"
        onChange={(e) =>
          props.handleChange(
            e.target.className,
            props.studentIndex,
            e.target.value
          )
        }
      ></input>
      </div>
      
    </li>
  );
}

export default SimpleList;
