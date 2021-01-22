import React from "react";
import ReactModal from "react-modal";
import ClassesSection from "./ClassesSection";
import StudentsSection from "./StudentsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Prompt } from "react-router";
import { db } from "../../firebase/firebase";
import _ from "lodash";

class Dashboard extends React.Component {
 _isMounted=false;
  constructor(props) {
    super(props);
    this._isMounted = false
    this.state = {
      showModal: false,
      classList: this.props.userClassList,
      itemEditSelection: "",
      itemEditId: "",
      classSelection: undefined,
      edits: false,
      hasBeenEdited: false,
    };
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.openEdits = this.openEdits.bind(this);
    this.closeEdits = this.closeEdits.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateUserDb = this.updateUserDb.bind(this);
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateUserDb(docID) {
    db.collection("users")
      .doc(docID)
      .set({
        classList: this.state.classList,
      }, { merge: true })
      .then(() => {
        if(this._isMounted){
        this.setState({
          edits: false,
          hasBeenEdited: true,
        });
      }
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  openEdits() {
    this.setState({
      edits: true,
    });
  }

  closeEdits() {
    this.setState({
      edits: false,
    });
  }

  editItem() {
    if (this.state.itemEditSelection === "classes") {
      let classList = [...this.state.classList];
      classList[this.state.itemEditId].subject = document.getElementById(
        "editThis"
      ).value;
      this.setState({ classList });
    } else if (this.state.itemEditSelection === "students") {
      let editFirst = _.upperFirst(document.getElementById("editFirst").value);
      let editLast = _.upperFirst(document.getElementById("editLast").value);
      let newArray = [...this.state.classList];
      newArray[this.state.classSelection].students[this.state.itemEditId] = {
        ...newArray[this.state.classSelection].students[this.state.itemEditId],
        firstName: editFirst,
        lastName: editLast,
      };
      this.setState({
        classList: newArray,
      });
    }
    this.openEdits();
  }

  handleOpenModal(array, item) {
    this.setState(
      { itemEditSelection: array, itemEditId: item },
      this.setState({ showModal: true })
    );
  }

  cancelEdit() {
    this.setState({ showModal: false });
  }

  handleCloseModal(e) {
    this.editItem();
    this.setState({ showModal: false });
    e.preventDefault();
  }

  removeClass(id) {
    const newClassList = this.state.classList.filter((subject, index) => {
      if (index !== id) {
        return subject;
      } else {
        return false;
      }
    });
    this.setState({ classList: newClassList });
    if (this.state.classList.length === 0) {
      this.setState({ itemEditSelection: "" });
    }
    this.openEdits();
  }

  removeStudent(id) {
    this.setState((prevState) => {
      const updatedClass = prevState.classList.map((subject, index) => {
        if (index !== this.state.classSelection) {
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
        classList: updatedClass,
      };
    });
    this.openEdits();
  }

  addStudent(e) {
    document.getElementById("addStudentFirstName").focus();
    let newStudentFirst = _.upperFirst(
      document.getElementById("addStudentFirstName").value
    );
    let newStudentLast = _.upperFirst(
      document.getElementById("addStudentLastName").value
    );
    if (newStudentFirst !== "" && newStudentLast !== "") {
      let newArray = [...this.state.classList];
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
      let orderedArray = _.orderBy(
        newArray[this.state.classSelection].students,
        ["firstName"],
        ["asc"]
      );
      let reorderedArray = [...newArray];
      reorderedArray[this.state.classSelection].students = orderedArray;
      this.setState({
        classList: reorderedArray,
      });
      document.getElementById("addStudentFirstName").value = "";
      document.getElementById("addStudentLastName").value = "";
      this.openEdits();
    } else {
      alert("Please enter the student's full name");
    }
    
    e.preventDefault();
    
  }

  addClass(e) {
    let newClass = document.getElementById("addClassInput").value;
    if (newClass !== "") {
      this.setState({
        classList: [...this.state.classList, { subject: newClass }],
      });
      this.setState((prevState) => {
        const addStudentsObject = prevState.classList.map((subject) => {
          if (subject.students) {
            return subject;
          } else {
            subject.students = [];
            return subject;
          }
        });
        return {
          classList: addStudentsObject,
        };
      });
      document.getElementById("addClassInput").value = "";
      this.openEdits();
    }else{
      alert("Please enter a class name")
    }
    e.preventDefault();
   
  }

  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });
  }

  render() {
    let displayEditBtn;
    if (this.state.edits === false) {
      displayEditBtn = { display: "none" };
    } else {
      displayEditBtn = { display: "inline-block" };
    }

    let addStudentInputs;
    if (
      this.state.classSelection === undefined ||
      this.state.classList.length === 0
    ) {
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
    if (this.state.classSelection === undefined) {
      displayStudents = <span></span>;
    } else if (this.state.classList.length === 0) {
      displayStudents = (
        <li
          style={{
            marginLeft: "-25px",
            listStyleType: "none",
          }}
          className="text-center textC"
        >
          You have no classes listed
        </li>
      );
    } else if (
      this.state.classList[this.state.classSelection].students.length === 0
    ) {
      displayStudents = (
        <li
          style={{
            marginLeft: "-40px",
            listStyleType: "none",
          }}
          className="text-center textC"
        >
          You have no students listed
        </li>
      );
    } else {
      displayStudents = this.state.classList[
        this.state.classSelection
      ].students.map((student, index) => (
        <li id={"sl" + index} key={"sl" + index} className="textC">
          <div className="d-flex justify-content-between">
            <div className="col-8">
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
    if(this.state.classList===undefined){
      displayClasses = <span></span>
    }else if (this.state.classList.length === 0) {
      displayClasses = (
        <li
          style={{
            marginLeft: "-40px",
            listStyleType: "none",
          }}
          className="text-center textC"
        >
          You have no classes listed
        </li>
      );
    } else {
      displayClasses = this.state.classList.map((subject, index) => (
        <li id={"cl" + index} key={"cl" + index} className="textC">
          <div className="d-flex justify-content-between">
            <div className="col-8">{subject.subject}</div>
            <div className="col edits">
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
            </div>
          </div>
        </li>
      ));
    }

    let editValue;
    if(this.state.classList === undefined){
      editValue = "";
    }
    else if (
      this.state.itemEditSelection === "classes" &&
      this.state.classList[this.state.itemEditId]
    ) {
      editValue = this.state.classList[this.state.itemEditId].subject;
    } else if (
      this.state.classList[this.state.classSelection] !== undefined &&
      this.state.itemEditSelection === "students" &&
      this.state.classList[this.state.classSelection].students[
        this.state.itemEditId
      ]
    ) {
      editValue = this.state.classList[this.state.classSelection].students[
        this.state.itemEditId
      ];
    } else {
      editValue = "";
    }

    let editOptions;
    if (this.state.itemEditSelection === "classes") {
      editOptions = (
        <input
          id="editThis"
          className=" my-2"
          defaultValue={editValue}
          style={{ width: 250 }}
        />
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
    if(this.state.classList===undefined){
      classList = <option></option>;
    }
    else if (this.state.classList.length === 0) {
      classList = <option></option>;
    } else {
      classList = this.state.classList.map((subject, index) => (
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
            className="Modal2 text-center"
          >
            <form onSubmit={this.handleCloseModal}>
              {editOptions}
              <div>
                <button type="submit" className="mybutton my-2 mx-1">
                  Submit
                </button>
                <button
                type="button"
                  className="mybuttonCancel my-2 mx-1"
                  onClick={this.cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </ReactModal>
        </div>
        <div className="container-fluid">
          <h1 id="clickTitle2" className="text-center mt-5 mb-3 textC">
            Dashboard
          </h1>
          <div className="row justify-content-around">
            <ClassesSection
              refVal={(a) => (this._inputElement = a)}
              addClass={this.addClass}
              displayClasses={displayClasses}
            />
            <StudentsSection
              addStudentInputs={addStudentInputs}
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
          </div>
        </div>
        <div
          className="text-center align-items-center saveChanges"
          style={displayEditBtn}
        >
          <button
            className="pulsingButton"
            id="saveChanges"
            onClick={() => this.updateUserDb(this.props.userID)}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
