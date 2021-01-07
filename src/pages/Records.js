import React from "react";
import mySampleArray from "../mySampleArray.js";
import SimpleList from "../components/SimpleList";
import "./records.css";

let recordsArray;
let localExists = localStorage.getItem("localAttendance");
if (localExists){
  alert('yes')
  recordsArray = JSON.parse(localExists)
  console.log(recordsArray);
}else{
  alert('no')
  recordsArray = [];
}
// let recordsArray = [{date: "Tue Dec 08 2020"}, {date: "Wed Dec 09 2020"}];
// recordsArray.map((day) => {
//   day.attendance = mySampleArray;
//   return day;
// });
// console.log(recordsArray);

class Records extends React.Component {
  constructor() {
    super();
    this.state = {
      myArray: recordsArray,
      classSelection: undefined,
      dateSelection: undefined,
      edit: false,
    };
    this.baseState = this.state;
    this.cancelSave = this.cancelSave.bind(this);
    this.saveArray = this.saveArray.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }

  cancelSave(){
    this.setState({
      edit: false,
      classSelection: undefined,
      
    });
    document.getElementById("selClass").value = "DEFAULT";
  }

  saveArray() {
    this.setState({
      edit: false,
    });
    recordsArray = this.state.myArray;
    console.log(recordsArray);
  }
  handleEdit(boxName, studentIndex) {
    if (this.state.edit === true) {
      console.log(this.state.edit);
      this.handleChange(boxName, studentIndex);
    } if (this.state.edit === false) {
      if (window.confirm("Are you sure you want to edit this record")) {
        this.setState({
          edit: true,
        });
        console.log(this.state.edit);
        this.handleChange(boxName, studentIndex);
      }
    }
  }
  handleChange(boxName, studentIndex, text) {
    this.setState((prevState) => {
      console.log(
        "date: " + prevState.dateSelection + ", " + prevState.classSelection
      );

      const updatedArray = prevState.myArray.map((day, index) => {
        // debugger
        if (index !== prevState.dateSelection) {
          console.log(day);
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
                    case "comments":
                      student.comments = text;
                      break;
                    default:
                  }
                }
                return student;
              });
              return subject;
            }
          });
          return day;
        }
      });

      return {
        myArray: updatedArray,
      };
    });
    console.log(this.state.myArray);
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
      <option key={"ds" + index} id={"ds" + index} value={index}>
        {day.date}
        {console.log(this.state.dateSelection, this.state.classSelection)}
      </option>
    ));
    let classList;
    if (this.state.dateSelection === undefined) {
      classList = <h5>Please select a date</h5>;
    } else {
      classList = this.state.myArray[this.state.dateSelection].attendance.map(
        (day, index) => (
          <option key={"cs" + index} id={"cs" + index} value={index}>
            {day.subject}
            {console.log(this.state.dateSelection, this.state.classSelection)}
          </option>
        )
      );
    }

    let displayStudents;
    let displayStudentsMessage;
    let displayList;
    if (this.state.dateSelection === undefined) {
      displayStudentsMessage = <span></span>;
      displayStudents = <span></span>;
      displayList = { display: "none" };
    } else if (this.state.classSelection === undefined) {
      displayList = { display: "none" };
      displayStudentsMessage = (
        <h5 className="text-center">Select a class to see attendance</h5>
      );
    } else {
      if (
        this.state.myArray[this.state.dateSelection].attendance[
          this.state.classSelection
        ].students === undefined
      ) {
        displayList = { display: "none" };
        displayStudentsMessage = (
          <h5 className="text-center">
            There are no students listed for this class
          </h5>
        );
      } else {
        displayList = { display: "block" };
        displayStudents = this.state.myArray[
          this.state.dateSelection
        ].attendance[
          this.state.classSelection
        ].students.map((student, index) => (
          <SimpleList
            key={index}
            studentIndex={index}
            student={student}
            handleChange={this.handleEdit}
          />
        ));
      }
    }
    let displayClass;
    if (this.state.myArray.length===0){
      displayClass = <h5 className="text-center">You have no attendance records</h5>;
    }
    else if (this.state.dateSelection === undefined) {
      displayClass = <h5 className="text-center">Please select a date</h5>;
    } else {
      displayClass = (
        <div>
          <form>
            <div className="form-group" align="center">
              <select
                defaultValue={"DEFAULT"}
                className="form-control"
                id="selClass"
                style={{ width: 300 }}
                onChange={() =>
                  this.handleClassSelection(
                    document.getElementById("selClass").selectedIndex
                  )
                }
              >
                <option value="DEFAULT" disabled hidden>
                  Choose Class
                </option>
                {classList}
              </select>
            </div>
          </form>
          <div>{displayStudentsMessage}</div>
          <div className="row d-flex justify-content-center ">
            <div style={displayList} className="attendanceRecord">
              <ol style={{ marginRight: "10px" }}>{displayStudents}</ol>
            </div>
          </div>
        </div>
      );
    }

    let editButtons;
    if (
      this.state.dateSelection === undefined ||
      this.state.classSelection === undefined ||
      this.state.myArray[this.state.dateSelection].attendance[
        this.state.classSelection
      ].students === undefined
    ) {
      editButtons = <span></span>;
    } else {
      editButtons = (
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="mx-2 my-2 mybutton"
              onClick={() => this.saveArray()}
            >
              Save Changes
            </button>
            <button
              className="mx-2 my-2 mybuttonCancel"
              onClick={() => this.cancelSave()}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <h1 style={{ color: "#2C514C", fontWeight:'bold' }} className="text-center mt-3">
          Records
        </h1>
        <div className="row d-flex justify-content-center">
          <div className="col my-2">
            <form>
              <div className="form-group" align="center">
                <select
                  defaultValue={"DEFAULT"}
                  className="form-control"
                  id="selDate"
                  style={{ width: 300 }}
                  onChange={() =>
                    this.handleDateSelection(
                      document.getElementById("selDate").selectedIndex
                    )
                  }
                >
                  <option value="DEFAULT" disabled hidden>
                    Choose Date
                  </option>

                  {dayList}
                </select>
              </div>
            </form>
            {displayClass}
          </div>
        </div>
        {editButtons}
      </div>
    );
  }
}

export default Records;
