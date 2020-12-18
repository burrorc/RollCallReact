import React from "react";
import './classes.css'

function ClassButtons2(props) {
  return (
    <div>
      <button
        id={"ca" + props.classIndex}
        className="my-3 classButton"
        onClick={props.handleOpenModal}
        style={{ height: "100px" }}
      >
        <div className="col" style={{ width: "50vw" }}>
          <h3 className="text-center my-0">{props.text}</h3>
        </div>
      </button>
    </div>
  );
}
export default ClassButtons2;
