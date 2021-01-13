import React from "react";
import ClassButtons from "./ClassButtons";
import ReactModal from "react-modal";
import SimpleList from "../../components/SimpleList";
import AttendanceModal from "./AttendanceModal";
import ToggleButtons from "./ToggleButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {db} from "../../firebase/firebase";
import {
  faTimesCircle,
  faCheckCircle,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

// let attendanceRecord;
// let localExists = localStorage.getItem("localAttendance");
// if (localExists) {
//   attendanceRecord = JSON.parse(localExists);
// } else {
//   attendanceRecord = [];
// }


// let myClassAttendance;
// if (JSON.parse(localStorage.getItem("localClassList"))) {
//   myClassAttendance = JSON.parse(localStorage.getItem("localClassList"));
// } else {
//   myClassAttendance = [];
// }

class Attendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classAttendance: this.props.userClassList,
      showModal: false,
      classSelection: undefined,
      toggleP: false,
      toggleC: false,
      attendanceRecord: this.props.userAttendanceRecord,
    };
    this.togglePresent = this.togglePresent.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.cancelSave = this.cancelSave.bind(this);
    //this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.updateUserDb = this.updateUserDb.bind(this);
  }
 
  // componentDidMount(){
  //   if(this.props.userID !== null){
  //     db.collection('users').doc(this.props.userID).get().then(doc => {
  //       if(doc.data().classList){
  //         this.setState({
  //           classAttendance: doc.data().classList
  //         })
  //       }
  //       if(doc.data().attendance){
  //         this.setState({
  //           attendanceRecord: doc.data().attendance
  //         })
  //       }
  //       })
  //     }
  // }

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
      const newToggleC = !prevState.toggleC;
      const updatedClassAttendanceC = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student) => {
            if (student.camera === newToggleC) {
              return student;
            } else {
              student.camera = newToggleC;
              if(student.camera===true){
                student.present=true;
              }
              return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,
        classAttendance: updatedClassAttendanceC,
        toggleC: newToggleC,
      };
    });
  }

  togglePresent() {
    this.setState((prevState) => {
      const newToggleP = !prevState.toggleP;
      const updatedClassAttendanceP = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student) => {
            if (student.present === newToggleP) {
              return student;
            } else {
              student.present = newToggleP;
              if(student.present===false){
                student.late=false;
                student.camera=false;
              }
              return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,
        classAttendance: updatedClassAttendanceP,
        toggleP: newToggleP,
      };
    });
  }

  handleOpenModal(item) {
    const newDate = new Date().toDateString();
    let addIndex;
    let todaysAttendance = this.state.attendanceRecord
    const dateExists = todaysAttendance.find(function (record, index) {
      if (record.date === newDate) {
        addIndex = index;
        return true;
      } else {
        return false;
      }
    });
    if (dateExists) {
      const recordExists = todaysAttendance[addIndex].attendance.find(
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
  // updateUserDb(docID) {
  //   db.collection("users")
  //     .doc(docID)
  //     .set({
  //       attendance: this.state.myAttendance,
  //     }, { merge: true })
  //     .then(() => {
  //       this.setState({
  //         edits: false,
  //         hasBeenEdited: true,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }
  updateUserDb(docID) {
    const newDate = new Date().toDateString();
    let addIndex;
    let newAttendance = this.state.attendanceRecord
    const dateExists = newAttendance.find(function (record, index) {
      if (record.date === newDate) {
        addIndex = index;
        return true;
      } else {
        return false;
      }
    });
    if (dateExists) {
      if (newAttendance[addIndex].attendance) {
        newAttendance[addIndex].attendance.push(
          this.state.classAttendance[this.state.classSelection]
        );
      } else {
        newAttendance[addIndex].attendance = [];
        newAttendance[addIndex].attendance.push(
          this.state.classAttendance[this.state.classSelection]
        );
      }
      this.setState({ attendanceRecord: newAttendance });
    } else {
      newAttendance.push({ date: newDate });
      newAttendance[newAttendance.length - 1].attendance = [];
      newAttendance[newAttendance.length - 1].attendance.push(
        this.state.classAttendance[this.state.classSelection]
      );
      this.setState({ attendanceRecord: newAttendance });
    }
    db.collection("users")
      .doc(docID)
      .set({
        attendance: this.state.attendanceRecord,
      }, { merge: true })
      .then(() => {
        this.setState({
          edits: false,
        });
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  // updateLocalStorage() {
  //   const newDate = new Date().toDateString();
  //   let addIndex;
  //   let attendanceRecord2 = this.state.myAttendance
  //   const dateExists = attendanceRecord2.find(function (record, index) {
  //     if (record.date === newDate) {
  //       addIndex = index;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   if (dateExists) {
  //     if (attendanceRecord2[addIndex].attendance) {
  //       attendanceRecord2[addIndex].attendance.push(
  //         this.state.classAttendance[this.state.classSelection]
  //       );
  //     } else {
  //       attendanceRecord2[addIndex].attendance = [];
  //       attendanceRecord2[addIndex].attendance.push(
  //         this.state.classAttendance[this.state.classSelection]
  //       );
  //     }
  //     this.setState({ myAttendance: attendanceRecord2 });
  //   } else {
  //     attendanceRecord2.push({ date: newDate });
  //     attendanceRecord2[attendanceRecord2.length - 1].attendance = [];
  //     attendanceRecord2[attendanceRecord2.length - 1].attendance.push(
  //       this.state.classAttendance[this.state.classSelection]
  //     );
  //     this.setState({ myAttendance: attendanceRecord2 });
  //   }
  //   let toLocalAttendance = JSON.stringify(this.state.myAttendance);
  //   localStorage.setItem("localAttendance", toLocalAttendance);
  // }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: undefined });
    this.updateUserDb(this.props.userID);
  }

  handleChange(boxName, studentIndex, text) {
    this.setState((prevState) => {
      const markAttendance = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student, index) => {
            if (index === studentIndex) {
              switch (boxName) {
                case "present":
                  student.present = !student.present;
                  if (student.present === false) {
                    student.late = false;
                    student.camera = false;}
                  break;
                case "late":
                  student.late = !student.late;
                  if (student.late === true) {
                    student.present = true;}
                  break;
                case "camera":
                  student.camera = !student.camera;
                  if (student.camera === true) {
                    student.present = true;}
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
        classAttendance: markAttendance,
      };
    });
    console.log(this.state.classAttendance);
  }

  render() {
    console.log('mounted');
    console.log(this.state.classAttendance);
    console.log(this.state.attendanceRecord);

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
          className="my-2 textC"
          style={{ textAlign: "center", marginRight:55 }}
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
          className="text-center mt-3 textC"
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
export default Attendance;
