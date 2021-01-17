import React from 'react'

function ToggleButtons(props){
    return(
        <div className="d-flex justify-content-center">
          <button
            className="mx-2 my-2 mybutton"
            style={{ width: 100 }}
            onClick={props.togglePresent}
          >
            {props.ToggleButtonP}
          </button>
          <button
            className="mx-2 my-2 mybutton"
            style={{ width: 100 }}
            onClick={props.toggleCamera}
          >
            {props.ToggleButtonC}
          </button>
        </div>
    )
}

export default ToggleButtons