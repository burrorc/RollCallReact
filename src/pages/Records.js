import React from "react";
import mySampleArray from "../mySampleArray.js";

const recordsArray = [["Tue Dec 08 2020"], ["Wed Dec 09 2020"]];
recordsArray.map((day) => {
  day.attendance = mySampleArray;
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
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }
  handleChange(boxName, studentIndex) {
    this.setState((prevState) => {
      const updatedArray = prevState.myArray.map((day, index) => {
        if (day.index !== prevState.dateSelection) {
          return day;
        } else {
          day.attendance.map((subject, index) => {
            if (subject.index !== prevState.classSelection) {
              return subject;
            }else{
             subject.students.map((student, index)=>{
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
  }

  handleDateSelection(date) {
    this.setState({
      dateSelection: date - 1,
    });
    console.log(date - 1);
  }
  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });
    console.log(subject - 1);
  }
  render() {
    const dayList = recordsArray.map((day, index) => (
      <option key={index} id={"ds" + index} value={index}>
        {day}
      </option>
    ));
    let classList;
    if (this.state.dateSelection === undefined) {
      classList = <h5>Please select a date</h5>;
    } else {
      classList = this.state.myArray[this.state.dateSelection].attendance.map(
        (day, index) => (
          <option key={index} id={"cs" + index} value={index}>
            {day.subject}
          </option>
        )
      );
    }
    // const classList = this.state.myArray[
    //   this.state.dateSelection
    // ].attendance.map((day, index) => (
    //   <option key={index} id={"cs" + index}>
    //     {day.subject}
    //   </option>
    // ));
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
          <li>
            <input
              type="checkbox"
              checked={student.present}
              className={"present"}
              onChange={(e) =>
                this.handleChange(e.target.className, index)
              }
            />
            <input
              type="checkbox"
              checked={student.late}
              className={"late"}
              // onChange={(e) =>
              //   props.handleChange(e.target.className, props.studentIndex)
              // }
            />
            <input
              type="checkbox"
              checked={student.camera}
              className={"camera"}
              // onChange={(e) =>
              //   props.handleChange(e.target.className, props.studentIndex)
              // }
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
    // const classList = recordsArray.map((subject, index) => (
    //   <option key={index} id={'cs'+index}>{subject.subject}</option>
    // ));

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
              {/* {classList} */}
              {dayList}
            </select>
          </div>
        </form>
        {displayClass}
        {/* <form>
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
              <option value="none" disabled selected hidden>
                Choose Class
              </option>
              {classList}
            </select>
          </div>
        </form> */}
        {/* <ol>{displayStudents}</ol> */}
      </div>
    );
  }
}
// function Records() {
//   return (
//     <div className="container">
//       <h2>Form control: select</h2>
//       <p>The form below contains two dropdown menus (select lists):</p>
//       <form>
//         <div className="form-group">

//           <select className="form-control" id="sel1">
//           <option value="" disabled selected hidden>Choose Class</option>
//             {classList}
//           </select>
//         </div>
//       </form>
//     </div>
//   );
// }

export default Records;
