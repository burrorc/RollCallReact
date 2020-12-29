import React from "react";
import ReactModal from "react-modal";
import "./dashboard.css";
import ClassesSection from "../components/ClassesSection";
import StudentsSection from "../components/StudentsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// let localClassSelection;
// if(localStorage.getItem("SelItem")!=="DEFAULT"){
//   if(JSON.parse(localStorage.getItem("SelItem"))==null){
//     localClassSelection=undefined
//     console.log("LCSn "+localClassSelection)
//   }else{
//     localClassSelection=JSON.parse(localStorage.getItem("SelItem"))
//     console.log("LCSs "+localClassSelection)
//   }

// } else{
//   localClassSelection=undefined;
//   console.log("LCSu "+localClassSelection)
// }

// window.onload = function() {
//   if(localClassSelection!=null){
//     document.getElementById('selClass').value=localClassSelection;
//   }

// };

let myClassList;
if (JSON.parse(localStorage.getItem("localClassList"))) {
  myClassList = JSON.parse(localStorage.getItem("localClassList"));
} else {
  myClassList = [];
}

const studentsArray = [];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      myClasses: myClassList,
      myStudents: studentsArray,
      itemEditSelection: "",
      itemEditId: "",
      classSelection: undefined,
      previousSelection: "0",
    };
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  updateLocalStorage() {
    console.log(this.state.myClasses);
    const toLocalClassList = JSON.stringify(this.state.myClasses);
    //const toLocalClassSelection = document.getElementById('selClass').value
    window.localStorage.setItem("localClassList", toLocalClassList);
    //window.localStorage.setItem("SelItem", toLocalClassSelection)
    console.log("hey" + window.localStorage.getItem("localClassList"));
    //console.log("updated LCS "+ toLocalClassSelection)
    //document.getElementById("saveChanges").disabled=true
    console.log("reloading");
    //window.location.reload();
  }

  editItem() {
    if (this.state.itemEditSelection === "classes") {
      let myClasses = [...this.state.myClasses];
      myClasses[this.state.itemEditId].subject = document.getElementById(
        "editThis"
      ).value;
      this.setState(
        { myClasses }
        // this.updateLocalStorage
      );
    } else if (this.state.itemEditSelection === "students") {
      let editFirst = document.getElementById("editFirst").value;
      let editLast = document.getElementById("editLast").value;
      let newArray = [...this.state.myClasses];
      newArray[this.state.classSelection].students[this.state.itemEditId] = {
        ...newArray[this.state.classSelection].students[this.state.itemEditId],
        firstName: editFirst,
        lastName: editLast,
      };
      this.setState(
        {
          myClasses: newArray,
        }
        //this.updateLocalStorage
      );
    }
  }

  handleOpenModal(array, item) {
    this.setState(
      { itemEditSelection: array, itemEditId: item },
      () => console.log(this.state.itemEditId),
      this.setState({ showModal: true })
    );
  }

  handleCloseModal() {
    this.editItem();
    this.setState({ showModal: false });
  }

  removeClass(id) {
    const newClassList = this.state.myClasses.filter((subject, index) => {
      if (index !== id) {
        return subject;
      } else {
        return false;
      }
    });
    this.setState({ myClasses: newClassList }, this.updateLocalStorage);
    if (this.state.myClasses.length === 0) {
      this.setState({ itemEditSelection: "" });
    }
  }

  removeStudent(id) {
    this.setState(
      (prevState) => {
        const updatedClass = prevState.myClasses.map((subject, index) => {
          if (index !== this.state.classSelection) {
            console.log("not" + subject.subject);
            return subject;
          }
          const updatedStudents = subject.students.filter((student, index) => {
            if (index !== id) {
              return student;
            } else {
              return false;
            }
          });
          return {
            ...subject,
            students: updatedStudents,
          };
        });
        return {
          myClasses: updatedClass,
        };
      }
      //this.updateLocalStorage
    );
  }

  addStudent(e) {
    let newStudentFirst = document.getElementById("addStudentFirstName").value;
    let newStudentLast = document.getElementById("addStudentLastName").value;
    if (newStudentFirst !== "" && newStudentLast !== "") {
      let newArray = [...this.state.myClasses];
      let studentIndex = newArray[this.state.classSelection].students.length;
      newArray[this.state.classSelection].students[studentIndex] = {
        ...newArray[this.state.classSelection].students[studentIndex],
        firstName: newStudentFirst,
        lastName: newStudentLast,
        present: false,
        late: false,
        camera: false,
      };
      this.setState(
        {
          myClasses: newArray,
        }
        //this.updateLocalStorage()
      );
      document.getElementById("addStudentFirstName").value = "";
      document.getElementById("addStudentLastName").value = "";
    } else {
      alert("Please enter a complete student name");
    }
    e.preventDefault();
  }

  addClass(e) {
    let newClass = document.getElementById("addClassInput").value;
    if (newClass !== "") {
      this.setState({
        myClasses: [...this.state.myClasses, { subject: newClass }],
      });
      this.setState((prevState) => {
        const addStudentsObject = prevState.myClasses.map((subject) => {
          if (subject.students) {
            return subject;
          } else {
            subject.students = [];
            return subject;
          }
        });
        return {
          myClasses: addStudentsObject,
        };
      });
      // this.updateLocalStorage);
      document.getElementById("addClassInput").value = "";
    }

    e.preventDefault();
    console.log(this.state.myClasses);
  }

  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });

    console.log(this.state.classSelection);
  }

  // componentDidUpdate() {
  //   document.getElementById('saveChanges').disabled=false
  // }

  render() {
    let editButtonStyle = {
      border: "none",
      backgroundColor: "transparent",
    };
    console.log("classSelection1 " + this.state.classSelection);
    let displayStudents;
    if (this.state.myClasses.length === 0) {
      console.log("classSelection2 " + this.state.classSelection);
      displayStudents = (
        <li
          style={{
            marginLeft: "-25px",
            listStyleType: "none",
            fontWeight: "bold",
          }}
          className="text-center"
        >
          You have no classes listed
        </li>
      );
    }
    //  else if(localClassSelection===undefined){
    //   displayStudents = this.state.myClasses[0].students.map((student, index) => (
    //     <li id={"sl" + index} key={"sl" + index} style={{ fontWeight: "bold" }}>
    //       {student.firstName + "  " + student.lastName}
    //       <button
    //         className="students"
    //         onClick={(e) => this.handleOpenModal(e.target.className, index)}
    //       >
    //         Edit
    //       </button>
    //       <button onClick={() => this.removeStudent(index)}>Remove</button>
    //     </li>
    //   ));
    // }
    else if (this.state.classSelection === undefined) {
      console.log("classSelection" + this.state.classSelection);
      displayStudents = <span></span>;
    } else if (
      this.state.myClasses[this.state.classSelection].students.length === 0
    ) {
      displayStudents = (
        <li
          style={{
            marginLeft: "-25px",
            listStyleType: "none",
            fontWeight: "bold",
          }}
          className="text-center"
        >
          You have no students listed
        </li>
      );
    } else {
      displayStudents = this.state.myClasses[
        this.state.classSelection
      ].students.map((student, index) => (
        <li id={"sl" + index} key={"sl" + index} style={{ fontWeight: "bold" }}>
          <div className="my-2">
            {student.firstName + "  " + student.lastName}
            <span style={{ float: "right" }}>
            <button className="editRemove">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) =>
                    this.handleOpenModal('students', index)
                  }
                />
                </button>
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => this.removeStudent(index)}
                  
                />
              </button>
            </span>
          </div>
        </li>
      ));
    }

    let displayClasses;
    if (this.state.myClasses.length === 0) {
      displayClasses = (
        <li
          style={{
            marginLeft: "-25px",
            listStyleType: "none",
            fontWeight: "bold",
          }}
          className="text-center"
        >
          You have no classes listed
        </li>
      );
    } else {
      displayClasses = this.state.myClasses.map((subject, index) => (
        <li id={"cl" + index} key={"cl" + index} style={{ fontWeight: "bold" }}>
          <div className="my-2">
            {subject.subject}

            <span style={{ float: "right" }}>
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) =>
                    this.handleOpenModal('classes', index)
                  }
                />
                </button>
                <button className="editRemove">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => this.removeClass(index)}
                  
                />
              </button>
              {/* <button onClick={() => this.removeClass(index)}>Remove</button> */}
            </span>
          </div>
        </li>
      ));
    }

    let editValue;
    if (
      this.state.itemEditSelection === "classes" &&
      this.state.myClasses[this.state.itemEditId]
    ) {
      editValue = this.state.myClasses[this.state.itemEditId].subject;
    } else if (
      this.state.myClasses[this.state.classSelection] !== undefined &&
      this.state.itemEditSelection === "students" &&
      this.state.myClasses[this.state.classSelection].students[
        this.state.itemEditId
      ]
    ) {
      editValue = this.state.myClasses[this.state.classSelection].students[
        this.state.itemEditId
      ];
    } else {
      editValue = "";
    }

    let editOptions;
    if (this.state.itemEditSelection === "classes") {
      editOptions = <input id="editThis" defaultValue={editValue} />;
    } else if (this.state.itemEditSelection === "students") {
      editOptions = (
        <div>
          <input id="editFirst" defaultValue={editValue.firstName} />
          <input id="editLast" defaultValue={editValue.lastName} />
        </div>
      );
    }

    let classList;
    if (this.state.myClasses.length === 0) {
      classList = <option></option>;
    } else {
      classList = this.state.myClasses.map((subject, index) => (
        <option key={"cs" + index} id={"cs" + index} value={index}>
          {subject.subject}
        </option>
      ));
    }

    return (
      <div>
        <div>
          <ReactModal isOpen={this.state.showModal}>
            <form onSubmit={this.handleCloseModal}>
              {editOptions}
              <input type="submit" value="Submit"></input>
            </form>
          </ReactModal>
        </div>
        <div className="container-fluid">
          <button id="saveChanges" onClick={this.updateLocalStorage}>
            Save Changes
          </button>
          <div className="row justify-content-around">
            <ClassesSection
              refVal={(a) => (this._inputElement = a)}
              addClass={this.addClass}
              displayClasses={displayClasses}
            />
            <StudentsSection
              previousSelection={this.state.previousSelection}
              refVal={(a) => (this._inputElement = a)}
              displayStudents={displayStudents}
              addStudent={this.addStudent}
              classList={classList}
              handleClassSelection={() =>
                this.handleClassSelection(
                  document.getElementById("selClass").selectedIndex
                )
              }
            />
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
