import React from "react";
import mySampleArray from "../mySampleArray.js";
import ClassButtons from "../components/ClassButtons";
import ReactModal from "react-modal";
import SimpleList from "../components/SimpleList";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleArray: mySampleArray,
      showModal: false,
      classSelection: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
  }

  handleOpenModal(item) {
    this.setState({ showModal: true, classSelection: item });
  }

  handleCloseModal() {
    this.setState({ showModal: false, classSelection: 0 });
  }

  handleToggleAll(){
    this.setState((prevState)=>{
      const updatedSampleArray = prevState.sampleArray.map((item) => {
        if (item.students === undefined) {
          return item;
        } else {
          item.students.map((student) => {
            student.present = !student.present
          }
        }
        return student;
      });
      return item;
    }
  });
  }

  handleChange(boxName, studentIndex) {
    this.setState((prevState) => {
      const updatedSampleArray = prevState.sampleArray.map((item) => {
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
        mySampleArray: updatedSampleArray,
      };
    });
  }
  render() {
    
    const displayButtons = this.state.sampleArray.map((subject, index) => (
      <button
        key={index}
        id={"ca" + index}
        className="my-3"
        onClick={() => this.handleOpenModal(index)}
        style={{ height: "100px" }}
      >
        <ClassButtons classIndex={index} text={subject.subject} />
      </button>
    ));
    let displayStudents;
    if (this.state.sampleArray[this.state.classSelection].students) {
      displayStudents = this.state.sampleArray[
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
    const displayToggle = <div>
    <input 
              type="checkbox" 
              //checked={} 
              className={'present'}
              onChange={()=>this.handleToggleAll}
          />
          <ol>{displayStudents}</ol>
  </div>
    return (
      <div className="container">
        <div>
          <ReactModal isOpen={this.state.showModal}>
          {/* <input 
                type="checkbox" 
                //checked={} 
                className={'present'}
                onChange={()=>this.handleToggleAll}
            />
            <ol>{displayStudents}</ol> */}
            {displayToggle}
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
// import React from "react";
// import classes from "../Classes";
// import ClassesList from "../components/ClassesList";
// import ReactModal from "react-modal"
// import Students2 from "./Students2"

// // function Classes() {
// //   return (
// //     <div className='container'>
// //   <div className='row justify-content-around'>
// //   { classesDisplay }
// //   </div>
// //   </div>
// //   )
// //   }
// class Classes extends React.Component {
//   constructor() {
//     super();
//     this.state = { classes, showModal: false };
//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   handleOpenModal () {
//     this.setState({ showModal: true });
//   }

//   handleCloseModal () {
//     this.setState({ showModal: false });
//   }

//   render() {
//     const classesDisplay = classes.map((subject) => (
//       <button className='my-3' onClick={this.handleOpenModal} style={{ height: "100px" }}>
//         <ClassesList title={subject} key={subject.index} />
//       </button>
//     ));
//     const newClass = document.getElementById("newClass");
//     const addClass = function () {
//       classes.push(newClass.value);
//       newClass.value = "";
//     };
//     return (
//       <div className="container">
//         <div>

//         <ReactModal
//            isOpen={this.state.showModal}
//            contentLabel="Minimal Modal Example"
//         >
// <button onClick={this.handleCloseModal}>Close Modal</button>
//         <Students2 id={0}/>

//         </ReactModal>
//       </div>
//         <div className="row">
//           <div className="col-6">
//             <form style={{ display: "flex" }}>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="className"
//                 placeholder="Add a class here"
//                 id="newClass"
//               />
//               <button onClick={addClass} className="btn btn-primary">
//                 Add Class
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="row justify-content-around">{classesDisplay}</div>
//       </div>
//     );
//   }
// }

// export default Classes;
