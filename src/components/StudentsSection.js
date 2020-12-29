import React from 'react'


function StudentsSection(props) {
    return(
        <div className="col-11 col-md-7 dashboard mt-3">
              <h3 className="text-center">Students</h3>
              <div className="d-flex justify-content-center">
                <form className="mx-auto">
                  <div className="form-group">
                    <select
                      defaultValue={'DEFAULT'}
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
              <div className="d-flex justify-content-center">
                <form onSubmit={props.addStudent}>
                  <div className="d-flex justify-items-center">
                    <input
                      ref={props.refVal}
                      id="addStudentFirstName"
                      placeholder="First Name"
                      className="mx-2"
                    ></input>
                    <input
                      ref={props.refVal}
                      id="addStudentLastName"
                      placeholder="Last Name"
                      className="mx-2"
                    ></input>
                    <button
                      className="mx-2 mybutton"
                      type="submit"
                      value="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="my-2">
                <ol>{props.displayStudents}</ol>
              </div>
            </div>
    )
}

export default StudentsSection