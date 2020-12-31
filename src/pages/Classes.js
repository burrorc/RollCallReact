import React from "react";
//import mySampleArray from "../mySampleArray.js";
import ClassButtons2 from "../components/ClassButtons2";
import ReactModal from "react-modal";
import SimpleList from "../components/SimpleList";
import AttendanceModal from "../components/AttendanceModal";
import ToggleButtons from "../components/ToggleButtons";

let attendanceRecord=[["Tue Dec 08 2020"], ["Wed Dec 09 2020"]];
attendanceRecord.map((day) => {
  day.attendance = [];
  return day;
});
console.log(attendanceRecord)

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
      myAttendance: attendanceRecord
    };
    this.togglePresent = this.togglePresent.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.cancelSave = this.cancelSave.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  cancelSave(){
    this.setState((prevState)=>{
      prevState.classAttendance[this.state.classSelection].students.map((student)=>{
        student.present = false;
        student.late = false;
        student.camera = false;
        return student;
      })
    });
    this.setState({ showModal: false, classSelection: undefined, toggleP: false, toggleC: false });
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
    const dateExists = attendanceRecord.find(function(record, index) {
      if(record == newDate){
        addIndex = index;
        return true;
      }else{
        return false;
      }
        
    });
    if(dateExists){
      const recordExists = attendanceRecord[addIndex].attendance.find( ({ subject }) => subject === this.state.classAttendance[item].subject )
      if(recordExists !== undefined){
        alert('You already have taken attendance for this class. Please go to your records in order to make changes')
        document.getElementById('clickTitle').click();
      }else{
        this.setState({ showModal: true, classSelection: item });
      }
    }else{
      this.setState({ showModal: true, classSelection: item });
    }
    
  }

  updateLocalStorage() {
    const newDate = new Date().toDateString();
    let addIndex;
    const dateExists = attendanceRecord.find(function(record, index) {
      if(record == newDate){
        addIndex = index;
        return true;
      }else{
        return false;
      }
        
    });
    if(dateExists){
      if(attendanceRecord[addIndex].attendance){
        attendanceRecord[addIndex].attendance.push(this.state.classAttendance[this.state.classSelection])
      }else{
        attendanceRecord[addIndex].attendance=[]
        attendanceRecord[addIndex].attendance.push(this.state.classAttendance[this.state.classSelection])
      }
      this.setState({myAttendance: attendanceRecord})
      console.log('added class')
      console.log(attendanceRecord)
      console.log(this.state.myAttendance)
    }else{
      attendanceRecord.push([newDate]);
      attendanceRecord[attendanceRecord.length-1].attendance=[]
      attendanceRecord[attendanceRecord.length-1].attendance.push(this.state.classAttendance[this.state.classSelection])
      this.setState({myAttendance: attendanceRecord})
      console.log('added date and class')
      console.log(attendanceRecord)
      console.log(this.state.myAttendance)
    }
    console.log("to local");
    let toLocalAttendance = JSON.stringify(this.state.myAttendance);
    console.log(JSON.stringify(attendanceRecord));
    console.log(JSON.parse(toLocalAttendance));
    // let toLocalAttendance = JSON.stringify(attendanceRecord);
    // localStorage.setItem("localAttendance", toLocalAttendance);
    // console.log('to local');
    // console.log(JSON.parse(localStorage.getItem("localAttendance")));
    // const toLocalAttendance = JSON.stringify(this.state.myClasses);
    // //const toLocalClassSelection = document.getElementById('selClass').value
    // window.localStorage.setItem("localClassList", toLocalClassList);
    // //window.localStorage.setItem("SelItem", toLocalClassSelection)
    // console.log("hey" + window.localStorage.getItem("localClassList"));
    // //console.log("updated LCS "+ toLocalClassSelection)
    // //document.getElementById("saveChanges").disabled=true
    // console.log("reloading")
    // window.location.reload();
  }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: undefined });
    this.updateLocalStorage();
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
    let saveAttendance;
    console.log("classSelection " + this.state.classSelection);
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
    let toggleButtons;
    let displayStudents;
    if (this.state.classAttendance.length === 0) {
      displayStudents = <span></span>;
      toggleButtons = <span></span>;
    } else if (this.state.classSelection === undefined) {
      toggleButtons = <span></span>;
      displayStudents = <span></span>;
    } else if (
      this.state.classAttendance[this.state.classSelection].students.length !==
      0
    ) {
      console.log("you have students");
      toggleButtons = (
        <ToggleButtons
          togglePresent={this.togglePresent}
          toggleCamera={this.toggleCamera}
          ToggleButtonP={ToggleButtonP}
          ToggleButtonC={ToggleButtonC}
        />
      );
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
                  onClick={this.handleCloseModal}
                >
                  Save Attendance
                </button>
      )
    } else {
      console.log("you do not have students");
      toggleButtons = <span></span>;
      displayStudents = (
        <h5 className="my-2" style={{textAlign: 'center', fontWeight: 'bold'}}>You currently have no students listed in this class</h5>
      );
      saveAttendance=<span></span>;
    }

    return (
      <div className="container">
        <h1 style={{color: '#2C514C'}} className='text-center'>Attendance</h1>
        
        <div>
          <ReactModal isOpen={this.state.showModal} className="Modal">
            <AttendanceModal
              togglePresent={this.togglePresent}
              toggleCamera={this.toggleCamera}
              handleCloseModal={this.handleCloseModal}
              cancelSave={this.cancelSave}
              displayStudents={displayStudents}
              toggleButtons={toggleButtons}
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
