import React from "react";
import './classbuttons.css'

function ClassButtons2(props) {
  return (
    <div>
      <button
        id={"ca" + props.classIndex}
        className="my-3 mybutton"
        onClick={props.handleOpenModal}
        style={{ height: "100px" }}
      >
        <div className="col" style={{ width: "50vw" }}>
          <h3 className="text-center my-0" style={{ fontWeight: '900'}}>{props.text}</h3>
        </div>
      </button>
    </div>
  );
}
export default ClassButtons2;
