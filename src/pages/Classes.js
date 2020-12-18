import React from "react";
//import mySampleArray from "../mySampleArray.js";
import ClassButtons2 from "../components/ClassButtons2";
import ReactModal from "react-modal";
import SimpleList from "../components/SimpleList";

let myClassAttendance;
if(JSON.parse(localStorage.getItem("localClassList"))){
  myClassAttendance=JSON.parse(localStorage.getItem("localClassList"))
}else{
  myClassAttendance=[]
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
    this.toggleCamera = this.toggleCamera.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    
  }

  toggleCamera(){
    this.setState((prevState) => {
      const newToggle = !prevState.toggleC
      const updatedClassAttendance2 = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else 
        {
          item.students.map((student) => {
            if(student.camera === newToggle){
              return student
            }else{
            student.camera = newToggle
            return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,classAttendance: updatedClassAttendance2,toggleC:newToggle
      };
    });
  }

  togglePresent(){
   this.setState((prevState) => {
      const newToggle = !prevState.toggleP
      const updatedClassAttendance2 = prevState.classAttendance.map((item) => {
        if (item.students === undefined) {
          return item;
        } else 
        {
          item.students.map((student) => {
            if(student.present === newToggle){
              return student
            }else{
            student.present = newToggle
            return student;
            }
          });
          return item;
        }
      });
      return {
        ...prevState,classAttendance: updatedClassAttendance2,toggleP:newToggle
      };
    });
  }

  handleOpenModal(item) {
    this.setState({ showModal: true, classSelection: item });
  }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: 0 });
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
    let ToggleButtonP
    if(this.state.toggleP===false){
      ToggleButtonP = "All Present"
    }else{
      ToggleButtonP= "Clear All"
    }
    let ToggleButtonC
    if(this.state.toggleC===false){
      ToggleButtonC = "All On"
    }else{
      ToggleButtonC= "Clear All"
    }
    let displayButtons;
    if(this.state.classAttendance.length===0){
      displayButtons = <h5>Please go to the Dashboard to setup your classes</h5>
    }else{
      displayButtons = this.state.classAttendance.map((subject, index) => (
        <ClassButtons2 key={'cb'+index} classIndex={index} text={subject.subject} handleOpenModal={() => this.handleOpenModal(index)}/> 
      ));
    }
     
    let displayStudents;
    if(this.state.classAttendance.length===0){
      displayStudents=<span></span>
    }else if (this.state.classAttendance[this.state.classSelection].students) {
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
        <div>
          <ReactModal isOpen={this.state.showModal}>
            <button style={{width:100}} onClick={this.togglePresent}>{ToggleButtonP}</button>
            <button style={{width:100}} onClick={this.toggleCamera}>{ToggleButtonC}</button>
          {/* <input 
              type="checkbox" 
              //checked={} 
              className={'present'}
              onChange={this.togglePresent}
          />
          <input 
              type="checkbox" 
              //checked={} 
              className={'camera'}
              onChange={this.toggleCamera}
          /> */}
            <ol>{displayStudents}</ol>

            <button onClick={this.handleCloseModal}>Close Modal</button>
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
