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

function Toggle(props) {
  return (
    <div>
      <label class="fancy-checkbox">
        <input
          type="checkbox"
          checked={props.checked}
          className={props.className}
          onChange={(e) =>
            props.handleChange(e.target.className, props.studentIndex)
          }
        />
        <FontAwesomeIcon icon={faTimesCircle} className="checked" />
        <FontAwesomeIcon icon={faCheckCircle} className="unchecked" />
        {/* {props.icons} */}
        
      </label>
      {/* <input
        type="checkbox"
        checked={props.checked}
        className={props.className}
        onChange={(e) =>
          props.handleChange(e.target.className, props.studentIndex)
        }
      />
      <label htmlFor="myInput"></label> */}
    </div>
  );
}
export default Toggle;
