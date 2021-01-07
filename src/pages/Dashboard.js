import React from "react";
import ReactModal from "react-modal";
import "./dashboard.css";
import ClassesSection from "../components/ClassesSection";
import StudentsSection from "../components/StudentsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Prompt } from "react-router";

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
      edits: false,
      hasBeenEdited: false,
    };
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.openEdits = this.openEdits.bind(this);
    this.closeEdits = this.closeEdits.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  openEdits() {
    console.log("open");
    this.setState({
      edits: true,
    });
  }

  closeEdits() {
    console.log("close");
    this.setState({
      edits: false,
    });
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
    this.closeEdits();
    this.setState({
      hasBeenEdited: true,
    });
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
    this.openEdits();
  }

  handleOpenModal(array, item) {
    this.setState(
      { itemEditSelection: array, itemEditId: item },
      () => console.log(this.state.itemEditId),
      this.setState({ showModal: true })
    );
  }

  cancelEdit() {
    this.setState({ showModal: false });
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
    this.setState({ myClasses: newClassList });
    if (this.state.myClasses.length === 0) {
      this.setState({ itemEditSelection: "" });
    }
    this.openEdits();
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
    this.openEdits();
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
        comments: "",
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
    this.openEdits();
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
    this.openEdits();
    console.log(this.state.myClasses);
  }

  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });

    console.log(this.state.classSelection);
  }

  componentWillUnmount() {
    if (this.state.hasBeenEdited) {
      window.location.reload();
    }
  }

  render() {
    let editButton;
    if (this.state.edits === false) {
      editButton = <span></span>;
    } else {
      editButton = (
        <button
          id="saveChanges"
          className="mybutton mt-2"
          onClick={this.updateLocalStorage}
        >
          Save Changes
        </button>
      );
    }

    console.log("classSelection1 " + this.state.classSelection);
    let addStudentInputs;
    if (this.state.classSelection === undefined || this.state.myClasses.length===0) {
      addStudentInputs = <span></span>;
    } else {
      addStudentInputs = (
        <div className="d-flex justify-content-center">
          <form className="container-fluid" onSubmit={this.addStudent}>
            <div className="row justify-content-center">
              <div className="row justify-content-center">
                <div
                  className="col-10 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <input
                    ref={(a) => (this._inputElement = a)}
                    id="addStudentFirstName"
                    placeholder="First Name"
                    className="my-1"
                  ></input>
                </div>
                <div
                  className="col-10 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <input
                    ref={(a) => (this._inputElement = a)}
                    id="addStudentLastName"
                    placeholder="Last Name"
                    className="my-1"
                  ></input>
                </div>
              </div>
              <div className="col addStudent" style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  value="submit"
                  style={{ width: 140 }}
                  className="mx-2 my-1 mybutton"
                >
                  Add Student
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }

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
    } else if (this.state.classSelection === undefined) {
      console.log("classSelection" + this.state.classSelection);
      displayStudents = <span></span>;
    } else if (
      this.state.myClasses[this.state.classSelection].students.length === 0
    ) {
      displayStudents = (
        <li
          style={{
            marginLeft: "-40px",
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
          <div className="d-flex">
            <div className="col-10 col-md-9">
              {student.firstName + "  " + student.lastName}
            </div>
            <div className="col edits">
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) => this.handleOpenModal("students", index)}
                />
              </button>
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => this.removeStudent(index)}
                />
              </button>
            </div>
          </div>
        </li>
      ));
    }

    let displayClasses;
    if (this.state.myClasses.length === 0) {
      displayClasses = (
        <li
          style={{
            marginLeft: "-40px",
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
          <div className="d-flex">
            <div className="col-8">{subject.subject}</div>
            <div className="col edits">
              {/* <span style={{ float: "right" }}> */}
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) => this.handleOpenModal("classes", index)}
                />
              </button>
              <button className="editRemove">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => this.removeClass(index)}
                />
              </button>
              {/* </span> */}
            </div>
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
      editOptions = (
        <input id="editThis" defaultValue={editValue} style={{ width: 250 }} />
      );
    } else if (this.state.itemEditSelection === "students") {
      editOptions = (
        <div>
          <input
            id="editFirst"
            className=" my-2"
            defaultValue={editValue.firstName}
            style={{ marginRight: 2, marginLeft: 2, width: 250 }}
          />
          <input
            id="editLast"
            className=" my-2"
            defaultValue={editValue.lastName}
            style={{ marginRight: 2, marginLeft: 2, width: 250 }}
          />
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
        <Prompt
          when={this.state.edits}
          message="Do you want to leave without saving your changes?"
        />
        <div>
          <ReactModal
            isOpen={this.state.showModal}
            className="Modal text-center"
          >
            <form onSubmit={this.handleCloseModal}>
              {editOptions}
              <button type="submit" className="mybutton my-2 mx-1">
                Submit
              </button>
              <button
                className="mybuttonCancel my-2 mx-1"
                onClick={this.cancelEdit}
              >
                Cancel
              </button>
            </form>
          </ReactModal>
        </div>
        <div className="container-fluid">
          <h1 style={{ color: "#2C514C", fontWeight:'bold' }} className="text-center mt-3">
            Dashboard
          </h1>
          <div className="text-center" style={{ height: 30 }}>
            {editButton}
          </div>
          <div className="row justify-content-around">
            <ClassesSection
              refVal={(a) => (this._inputElement = a)}
              addClass={this.addClass}
              displayClasses={displayClasses}
            />
            <StudentsSection
              addStudentInputs={addStudentInputs}
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
          <div className="text-center" style={{ height: 30 }}>
            {editButton}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
