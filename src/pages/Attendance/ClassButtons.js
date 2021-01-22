import React from "react";

function ClassButtons(props) {
  return (
    <div className="align-middle">
      <button
        id={"ca" + props.classIndex}
        className="my-3 mybutton"
        onClick={props.handleOpenModal}
        style={{ height: "100px", width:"400px" }}
      >
        <div>
          <h3 className="text-center my-0" style={{ fontWeight: '900'}}>{props.text}</h3>
        </div>
      </button>
    </div>
  );
}
export default ClassButtons;
