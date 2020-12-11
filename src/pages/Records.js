import React from "react";
import mySampleArray from "../mySampleArray.js";


let recordsArray = [["Tue Dec 08 2020"], ["Wed Dec 09 2020"]];
recordsArray.map((day) => {
 day.attendance = mySampleArray
  return day;
});
console.log(recordsArray);

class Records extends React.Component {
  constructor() {
    super();
    this.state = {
      myArray: recordsArray,
      classSelection: undefined,
      dateSelection: undefined,
      edit: false
    };
    this.saveArray = this.saveArray.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }
  saveArray(){
    recordsArray = this.state.myArray
    console.log(recordsArray)
  }
  handleEdit(boxName, studentIndex) {
    if (this.state.edit === true) {
      console.log(this.state.edit)
      this.handleChange(boxName, studentIndex)
    }
    if (this.state.edit === false) {
      if (window.confirm("Are you sure you want to edit this record")) {
        this.setState({
          edit: true
        })
        console.log(this.state.edit)
        this.handleChange(boxName, studentIndex)
      }
    }

  }
  handleChange(boxName, studentIndex) {
    this.setState((prevState) => {
      console.log("date: " + prevState.dateSelection + ", " + prevState.classSelection)
debugger
      const updatedArray = prevState.myArray.map((day, index) => {
        // debugger
        if (index !== prevState.dateSelection) {
          console.log(day)
          return day;
        } else {
          day.attendance.map((subject, index) => {
            if (index !== prevState.classSelection) {
              return subject;
            } else {
              subject.students.map((student, index) => {
                if (index === studentIndex) {
                  switch (boxName) {
                    case "present":
                      student.present = !student.present;
                      break;
                    case "late":
                      student.late = !student.late;
                      break;
                    case "camera":
                      student.camera = !student.camera;
                      break;
                    default:
                  }
                }
                return student;
              })
              return subject;
            }
          })
          return day;
        }
      });

      return {
        myArray: updatedArray,
      };
    });
    console.log(this.state.myArray)
  }

  handleDateSelection(date) {
    this.setState({
      dateSelection: date - 1,
      edit: false,
    });
    console.log(date - 1);
  }
  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
      edit: false,
    });
    console.log(subject - 1);
  }
  render() {
    const dayList = recordsArray.map((day, index) => (
      <option key={"ds"+index} id={"ds" + index} value={index}>
        {day}
        {console.log(this.state.dateSelection, this.state.classSelection)}
      </option>
    ));
    let classList;
    if (this.state.dateSelection === undefined) {
      classList = <h5>Please select a date</h5>;
    } else {
      classList = this.state.myArray[this.state.dateSelection].attendance.map(
        (day, index) => (
          <option key={"cs"+index} id={"cs" + index} value={index}>
            {day.subject}
            {console.log(this.state.dateSelection, this.state.classSelection)}
          </option>
        )
      );
    }

    let displayStudents;
    if (this.state.dateSelection === undefined) {
      displayStudents = <span></span>;
    } else if (this.state.classSelection === undefined) {
      displayStudents = <h5>Select a class to see attendance</h5>;
    } else {
      if (
        this.state.myArray[this.state.dateSelection].attendance[
          this.state.classSelection
        ].students === undefined
      ) {
        displayStudents = <h5>There are no students listed for this class</h5>;
      } else {
        displayStudents = this.state.myArray[
          this.state.dateSelection
        ].attendance[this.state.classSelection].students.map((student, index) => (
          <li key={"li"+index}>
            <input
              type="checkbox"
              checked={student.present}
              className={"present"}
              onChange={(e) => this.handleEdit(e.target.className, index)}
            />
            <input
              type="checkbox"
              checked={student.late}
              className={"late"}
              onChange={(e) => this.handleEdit(e.target.className, index)}
            />
            <input
              type="checkbox"
              checked={student.camera}
              className={"camera"}
              onChange={(e) => this.handleEdit(e.target.className, index)}
            />
            {student.lastName + ", " + student.firstName}
          </li>

        ));
      }
    }
    let displayClass;
    if (this.state.dateSelection === undefined) {
      displayClass = <h5>Please select a date</h5>;
    } else {
      displayClass = (
        <div>
          <form>
            <div className="form-group">
              <select
                className="form-control"
                id="selClass"
                onChange={() =>
                  this.handleClassSelection(
                    document.getElementById("selClass").selectedIndex
                  )
                }
              >
                <option key='defaultClass' value="none" disabled selected hidden>
                  Choose Class
                </option>
                {classList}
              </select>
            </div>
          </form>
          <ol>{displayStudents}</ol>
        </div>
      );
    }

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <select
              className="form-control"
              id="selDate"
              onChange={() =>
                this.handleDateSelection(
                  document.getElementById("selDate").selectedIndex
                )
              }
            >
              <option key='defaultDate' value="none" disabled selected hidden>
                Choose Date
              </option>

              {dayList}
            </select>
          </div>
        </form>
        {displayClass}
        <button onClick={()=> this.saveArray()}>Save Array</button>
      </div>
    );
  }
}


export default Records;
