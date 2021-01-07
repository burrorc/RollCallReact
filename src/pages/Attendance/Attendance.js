import React from "react";
import ClassButtons from "./ClassButtons";
import ReactModal from "react-modal";
import SimpleList from "../../components/SimpleList";
import AttendanceModal from "./AttendanceModal";
import ToggleButtons from "./ToggleButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./attendance.css";

let attendanceRecord;
let localExists = localStorage.getItem("localAttendance");
if (localExists) {
  attendanceRecord = JSON.parse(localExists);
} else {
  attendanceRecord = [];
}

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
      classSelection: undefined,
      toggleP: false,
      toggleC: false,
      myAttendance: attendanceRecord,
    };
    this.togglePresent = this.togglePresent.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.cancelSave = this.cancelSave.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  cancelSave() {
    this.setState((prevState) => {
      prevState.classAttendance[this.state.classSelection].students.map(
        (student) => {
          student.present = false;
          student.late = false;
          student.camera = false;
          student.comments = "";
          return student;
        }
      );
    });
    this.setState({
      showModal: false,
      classSelection: undefined,
      toggleP: false,
      toggleC: false,
    });
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
    const newDate = new Date().toDateString();
    let addIndex;
    const dateExists = attendanceRecord.find(function (record, index) {
      if (record.date === newDate) {
        addIndex = index;
        return true;
      } else {
        return false;
      }
    });
    if (dateExists) {
      const recordExists = attendanceRecord[addIndex].attendance.find(
        ({ subject }) => subject === this.state.classAttendance[item].subject
      );
      if (recordExists !== undefined) {
        alert(
          "You already have taken attendance for this class. Please go to your records in order to make changes"
        );
        document.getElementById("clickTitle").click();
      } else {
        this.setState({ showModal: true, classSelection: item });
      }
    } else {
      this.setState({ showModal: true, classSelection: item });
    }
  }

  updateLocalStorage() {
    const newDate = new Date().toDateString();
    let addIndex;
    const dateExists = attendanceRecord.find(function (record, index) {
      if (record.date === newDate) {
        addIndex = index;
        return true;
      } else {
        return false;
      }
    });
    if (dateExists) {
      if (attendanceRecord[addIndex].attendance) {
        attendanceRecord[addIndex].attendance.push(
          this.state.classAttendance[this.state.classSelection]
        );
      } else {
        attendanceRecord[addIndex].attendance = [];
        attendanceRecord[addIndex].attendance.push(
          this.state.classAttendance[this.state.classSelection]
        );
      }
      this.setState({ myAttendance: attendanceRecord });
    } else {
      attendanceRecord.push({ date: newDate });
      attendanceRecord[attendanceRecord.length - 1].attendance = [];
      attendanceRecord[attendanceRecord.length - 1].attendance.push(
        this.state.classAttendance[this.state.classSelection]
      );
      this.setState({ myAttendance: attendanceRecord });
    }
    let toLocalAttendance = JSON.stringify(this.state.myAttendance);
    localStorage.setItem("localAttendance", toLocalAttendance);
  }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: undefined });
    this.updateLocalStorage();
    window.location.reload();
  }

  handleChange(boxName, studentIndex, text) {
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
                  if (student.present === false) {
                    student.late = false;}
                  break;
                case "late":
                  student.late = !student.late;
                  if (student.late === true) {
                    student.present = true;}
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
          return item;
        }
      });
      return {
        classAttendance: updatedClassAttendance,
      };
    });
    console.log(this.state.classAttendance);
  }

  render() {
    let saveAttendance;
    let ToggleButtonP;
    if (this.state.toggleP === false) {
      ToggleButtonP = (
        <div>
          <FontAwesomeIcon icon={faCheckCircle} /> All
        </div>
      );
    } else {
      ToggleButtonP = (
        <div>
          <FontAwesomeIcon icon={faTimesCircle} /> All
        </div>
      );
    }
    let ToggleButtonC;
    if (this.state.toggleC === false) {
      ToggleButtonC = (
        <div>
          <FontAwesomeIcon icon={faVideo} className="fa-fw" /> All
        </div>
      );
    } else {
      ToggleButtonC = (
        <div>
          <FontAwesomeIcon icon={faVideoSlash} className="fa-fw" /> All
        </div>
      );
    }
    let displayButtons;
    if (this.state.classAttendance.length === 0) {
      displayButtons = (
        <h5>Please go to the Dashboard to setup your classes</h5>
      );
    } else {
      displayButtons = this.state.classAttendance.map((subject, index) => (
        <ClassButtons
          key={"cb" + index}
          classIndex={index}
          text={subject.subject}
          handleOpenModal={() => this.handleOpenModal(index)}
        />
      ));
    }

    let showToggleBtns;
    let displayStudents;
    if (this.state.classAttendance.length === 0 || this.state.classSelection === undefined) {
      displayStudents = <span></span>;
      showToggleBtns = {display: 'none'}
    }else if (
      this.state.classAttendance[this.state.classSelection].students.length !==
      0
    ) {
      showToggleBtns = {display: 'block'}
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
      saveAttendance = (
        <button
          className="mx-2 my-2 mybutton"
          style={{ width: 100 }}
          onClick={this.handleCloseModal}
        >
          Save
        </button>
      );
    } else {
      showToggleBtns = {display: 'none'}
      displayStudents = (
        <h5
          className="my-2"
          style={{ textAlign: "center", fontWeight: "bold", marginRight:55 }}
        >
          You do not have any students listed in this class
        </h5>
      );
      saveAttendance = <span></span>;
    }

    return (
      <div className="container">
        <h1
          id="clickTitle"
          style={{ color: "#2C514C", fontWeight: "bold" }}
          className="text-center mt-3"
        >
          Attendance
        </h1>

        <div>
          <ReactModal isOpen={this.state.showModal} className="Modal">
            <AttendanceModal
              showToggleBtns={showToggleBtns}
              togglePresent={this.togglePresent}
              toggleCamera={this.toggleCamera}
              handleCloseModal={this.handleCloseModal}
              cancelSave={this.cancelSave}
              displayStudents={displayStudents}
              toggleButtons={<ToggleButtons
                togglePresent={this.togglePresent}
                toggleCamera={this.toggleCamera}
                ToggleButtonP={ToggleButtonP}
                ToggleButtonC={ToggleButtonC}
              />}
              saveAttendance={saveAttendance}
            />
          </ReactModal>
        </div>

        <div className="row justify-content-around">{displayButtons}</div>
      </div>
    );
  }
}

ReactModal.setAppElement("body");
export default Classes;
