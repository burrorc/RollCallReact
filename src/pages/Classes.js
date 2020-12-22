import React from "react";
//import mySampleArray from "../mySampleArray.js";
import ClassButtons2 from "../components/ClassButtons2";
import ReactModal from "react-modal";
import SimpleList from "../components/SimpleList";

let myClassAttendance;
if (JSON.parse(localStorage.getItem("localClassList"))) {
  myClassAttendance = JSON.parse(localStorage.getItem("localClassList"));
} else {
  myClassAttendance = [];
}

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classAttendance: myClassAttendance,
      showModal: false,
      classSelection: 0,
      toggleP: false,
      toggleC: false,
    };
    this.togglePresent = this.togglePresent.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  toggleCamera() {
    this.setState((prevState) => {
      const newToggle = !prevState.toggleC;
      const updatedClassAttendance2 = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student) => {
            if (student.camera === newToggle) {
              return student;
            } else {
              student.camera = newToggle;
              return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,
        classAttendance: updatedClassAttendance2,
        toggleC: newToggle,
      };
    });
  }

  togglePresent() {
    this.setState((prevState) => {
      const newToggle = !prevState.toggleP;
      const updatedClassAttendance2 = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student) => {
            if (student.present === newToggle) {
              return student;
            } else {
              student.present = newToggle;
              return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,
        classAttendance: updatedClassAttendance2,
        toggleP: newToggle,
      };
    });
  }

  handleOpenModal(item) {
    this.setState({ showModal: true, classSelection: item });
  }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: 0 });
    // window.localStorage.setItem("SelItem", '');
    // window.location.reload();
  }

  handleChange(boxName, studentIndex) {
    this.setState((prevState) => {
      const updatedClassAttendance = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student, index) => {
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
          });
          return item;
        }
      });

      return {
        myclassAttendance: updatedClassAttendance,
      };
    });
  }

  render() {
    let ToggleButtonP;
    if (this.state.toggleP === false) {
      ToggleButtonP = "All Present";
    } else {
      ToggleButtonP = "Clear All";
    }
    let ToggleButtonC;
    if (this.state.toggleC === false) {
      ToggleButtonC = "All On";
    } else {
      ToggleButtonC = "Clear All";
    }
    let displayButtons;
    if (this.state.classAttendance.length === 0) {
      displayButtons = (
        <h5>Please go to the Dashboard to setup your classes</h5>
      );
    } else {
      displayButtons = this.state.classAttendance.map((subject, index) => (
        <ClassButtons2
          key={"cb" + index}
          classIndex={index}
          text={subject.subject}
          handleOpenModal={() => this.handleOpenModal(index)}
        />
      ));
    }

    let displayStudents;
    if (this.state.classAttendance.length === 0) {
      displayStudents = <span></span>;
    } else if (this.state.classAttendance[this.state.classSelection].students) {
      displayStudents = this.state.classAttendance[
        this.state.classSelection
      ].students.map((student, index) => (
        <SimpleList
          key={index}
          studentIndex={index}
          student={student}
          handleChange={this.handleChange}
        />
      ));
    } else {
      displayStudents = (
        <h5>You currently have no students listed in this class</h5>
      );
    }

    return (
      <div className="container">
        <input id="myInput" type="checkbox" name="myInput"/>
        <label for="myInput"><i class="fas fa-ad"></i>Some text</label>
        <div>
          <ReactModal isOpen={this.state.showModal} className="Modal">
            <div className="container">
              <div className="d-flex justify-content-center">
                <button
                  className="mx-2 my-2 mybutton"
                  style={{ width: 120 }}
                  onClick={this.togglePresent}
                >
                  {ToggleButtonP}
                </button>
                <button
                  className="mx-2 my-2 mybutton"
                  style={{ width: 120 }}
                  onClick={this.toggleCamera}
                >
                  {ToggleButtonC}
                </button>
              </div>
              <ol>{displayStudents}</ol>
              <div className="d-flex justify-content-center">
                <button
                  className="mx-2 my-2 mybuttonCancel"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="mx-2 my-2 mybutton"
                  onClick={this.handleCloseModal}
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
        <h2>Classes</h2>
        <div className="row">
          <div className="col-6"></div>
        </div>
        <div className="row justify-content-around">{displayButtons}</div>
      </div>
    );
  }
}

ReactModal.setAppElement("body");
export default Classes;
