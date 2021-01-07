import React from "react";
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
    <li id={"sa" + props.item} className="listItem pl-3">
      <div className="row my-1">
        {/* <div className="col-2 col-md-1"> */}
        <div className="col icons">
          <div className="row justify-content-around">
            <div className="col-4 px-1 pt-2">
              <label className="fancy-checkbox">
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
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="checked fa-fw"
                />
                {/* {props.icons} */}
              </label>
              {/* <Toggle
                studentIndex={props.studentIndex}
                checked={props.student.present}
                className="present"
                handleChange={props.handleChange}
                icons={props.presentIcons}
              /> */}
            </div>
            <div className="col-4 px-1 pt-2">
              <label className="fancy-checkbox">
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
            </div>
            <div className="col-4 px-1 pt-2">
              <label className="fancy-checkbox">
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
          </div>
        </div>
        {/* <div className="col-10 col-md-11 pl-1"> */}
        <div className="col col-md-5 pl-1 pt-2">
          {props.student.lastName + ", " + props.student.firstName}
        </div>
        {/* <div className="col-10 col-md-11 pl-1"> */}
        <div className="col-12 col-md-5 pl-1 my-1">
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
      </div>
    </li>
  );
}

export default SimpleList;
