import React from "react"

function AttendanceModal(props){
    return(
        <div className="container-fluid">
          <div style={props.showToggleBtns}>
            {props.toggleButtons}
          </div>
              <ol>{props.displayStudents}</ol>
              <div className="d-flex justify-content-center">
              {props.saveAttendance}
                <button
                  className="mx-2 my-2 mybuttonCancel"
                  style={{width:100}}
                  onClick={props.cancelSave}
                >
                  Cancel
                </button>
                
              </div>
            </div>
    )
}

export default AttendanceModal