import React from "react"

function AttendanceModal(props){
    return(
        <div className="container-fluid">
            {props.toggleButtons}
              <ol>{props.displayStudents}</ol>
              <div className="d-flex justify-content-center">
                <button
                  className="mx-2 my-2 mybuttonCancel"
                  onClick={props.cancelSave}
                >
                  Cancel
                </button>
                {props.saveAttendance}
              </div>
            </div>
    )
}

export default AttendanceModal