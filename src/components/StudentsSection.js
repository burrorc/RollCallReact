import React from "react";

function StudentsSection(props) {
  return (
    <div className="col-11 col-md-7 dashboard mt-3">
      <h3 className="text-center">Students</h3>

      <div className="d-flex justify-content-center">
        <form className="mx-auto">
          <div className="form-group">
            <select
              defaultValue={"DEFAULT"}
              className="form-control"
              id="selClass"
              onChange={props.handleClassSelection}
            >
              <option value="DEFAULT" disabled hidden>
                Choose Class
              </option>

              {props.classList}
            </select>
          </div>
        </form>
      </div>
      {props.addStudentInputs}

      <div className="d-flex justify-content-center mt-2">
        <ol style={{ width: "75%" }}>{props.displayStudents}</ol>
      </div>
    </div>
  );
}

export default StudentsSection;
