import React from "react";
import SimpleList from "../../components/SimpleList";
import {db} from "../../../firebase/firebase";

// let recordsArray;
// recordsArray = []
// let localExists = localStorage.getItem("localAttendance");
// if (localExists) {
//   recordsArray = JSON.parse(localExists);
// } else {
//   recordsArray = [];
// }

//let initialState = JSON.parse(localExists);;

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendanceRecord: this.props.userAttendanceRecord,
      classSelection: undefined,
      dateSelection: undefined,
      edit: false,
    };
    this.baseState = this.state;
    //this.cancelSave = this.cancelSave.bind(this);
    this.saveArray = this.saveArray.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }
  // componentDidMount(){
  //   console.log(this.state.myArray)
  //   if(this.props.userID !== null){
  //     db.collection('users').doc(this.props.userID).get().then(doc => {
  //       if(doc.data().attendance){
  //         console.log(doc.data().attendance)
  //         console.log(JSON.parse(localStorage.getItem("localAttendance")))
  //         this.setState({
  //           myArray: doc.data().attendance
  //         })
  //         console.log(this.state.myArray)
  //       }
  //       })
  //     }
  // }
  // cancelSave() {
  //   console.log(this.state.myArray);
  //   console.log(initialState);
  //   this.setState({
  //     myArray: initialState,
  //     edit: false,
  //     classSelection: undefined,
  //   });
  //   document.getElementById("selClass").value = "DEFAULT";
  // }

  saveArray(docID) {
    db.collection("users")
      .doc(docID)
      .set({
        attendance: this.state.attendanceRecord,
      }, { merge: true })
      .then(() => {
        this.setState({
          edit: false,
        });
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    // let updateLocal = JSON.stringify(this.state.myArray);
    // localStorage.setItem("localAttendance", updateLocal);
    // window.location.reload();
  }

  handleEdit(boxName, studentIndex, text) {
    if (this.state.edit === true) {
      this.handleChange(boxName, studentIndex, text);
    }
    if (this.state.edit === false) {
      if (window.confirm("Are you sure you want to edit this record")) {
        this.setState({
          edit: true,
        });
        this.handleChange(boxName, studentIndex, text);
      }
    }
  }
  handleChange(boxName, studentIndex, text) {
    this.setState((prevState) => {
      const updatedArray = prevState.attendanceRecord.map((day, index) => {
        if (index !== prevState.dateSelection) {
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
                      if (student.late === true) {
                        student.present = true;
                      }
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
        attendanceRecord: updatedArray,
      };
    });
    console.log(this.state.attendanceRecord);
  }

  handleDateSelection(date) {
    this.setState({
      dateSelection: date - 1,
      edit: false,
    });
  }
  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
      edit: false,
    });
  }
  render() {
    console.log('records')
    console.log(this.props)
    const dayList = this.state.attendanceRecord.map((day, index) => (
      <option key={"ds" + index} id={"ds" + index} value={index}>
        {day.date}
      </option>
    ));

    let classList;
    if (this.state.dateSelection !== undefined) {
      classList = this.state.attendanceRecord[this.state.dateSelection].attendance.map(
        (day, index) => (
          <option key={"cs" + index} id={"cs" + index} value={index}>
            {day.subject}
          </option>
        )
      );
    }

    let displayClass;
    let displayStudents;

    if (this.state.attendanceRecord.length === 0) {
      displayClass = (
        <h5 className="text-center textC">You have no attendance records</h5>
      );
    } else if (this.state.dateSelection === undefined) {
      displayClass = (
        <h5 className="text-center textC">Select a date to see attendance</h5>
      );
    } else if (this.state.classSelection === undefined) {
      displayClass = (
        <h5 className="text-center textC">Select a class to see attendance</h5>
      );
    } else {
      if (
        this.state.attendanceRecord[this.state.dateSelection].attendance[
          this.state.classSelection
        ].students === undefined
      ) {
        displayClass = (
          <h5 className="text-center">
            There are no students listed for this class
          </h5>
        );
      } else {
        displayStudents = this.state.attendanceRecord[
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
        displayClass = (
          <div className="attendanceRecord">
            <ol style={{ marginRight: "10px" }}>{displayStudents}</ol>
          </div>
        );
      }
    }

    let editButtons;
    if (
      this.state.edit === false ||
      this.state.dateSelection === undefined ||
      this.state.classSelection === undefined ||
      this.state.attendanceRecord[this.state.dateSelection].attendance[
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
              onClick={() => this.saveArray(this.props.userID)}
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
        <h1
          className="text-center mt-5 mb-4 textC"
        >
          Records
        </h1>
        <div className="row d-flex justify-content-center my-2">
          <div className="col-auto">
            <form>
              <div className="form-group" align="center">
                <select
                  defaultValue={"DEFAULT"}
                  className="form-control"
                  id="selDate"
                  style={{ width: 200 }}
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
          </div>
          <div className="col-auto">
            <form>
              <div className="form-group" align="center">
                <select
                  defaultValue={"DEFAULT"}
                  className="form-control"
                  id="selClass"
                  style={{ width: 200 }}
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
          </div>
        </div>
        <div className="row d-flex justify-content-center ">{displayClass}</div>

        {editButtons}
      </div>
    );
  }
}

export default Records;
