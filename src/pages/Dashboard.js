import React from "react";
import ReactModal from "react-modal";
import './dashboard.css' 

const classesArray = [];
const studentsArray = [];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      myClasses: classesArray,
      myStudents: studentsArray,
      itemEditSelection: "",
      itemEditId: "",
      classSelection: undefined,
    };
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  editItem() {
    if (this.state.itemEditSelection === "classes") {
      let myClasses = [...this.state.myClasses];
      myClasses[this.state.itemEditId].subject = document.getElementById(
        "editThis"
      ).value;
      this.setState({ myClasses });
    } else if (this.state.itemEditSelection === "students") {
      let editFirst = document.getElementById('editFirst').value
      let editLast = document.getElementById('editLast').value
      let newArray = [...this.state.myClasses];
      newArray[this.state.classSelection].students[this.state.itemEditId] = {
        ...newArray[this.state.classSelection].students[this.state.itemEditId],
        firstName: editFirst,
        lastName: editLast,
      };
      this.setState(
        {
          myClasses: newArray,
        },
        () => console.log(this.state.myClasses)
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
      }
    });
    this.setState({ myClasses: newClassList });
    if(this.state.myClasses.length===0){
      this.setState({itemEditSelection:''})
    }
  }

  removeStudent(id) {
    this.setState((prevState)=>{
      const updatedClass = prevState.myClasses.map((subject, index)=>{
        if(index !== this.state.classSelection){
          console.log('not'+subject.subject)
          return subject
        }
        const updatedStudents = subject.students.filter((student, index) => {
          if (index !== id) {
            return student;
          }
        });
        return {
          ...subject,
          students: updatedStudents
        };
      });
      return{
        myClasses: updatedClass
      }
    })
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
      };
      this.setState(
        {
          myClasses: newArray,
        },
        () => console.log(this.state.myClasses)
      );
      document.getElementById("addStudentFirstName").value=''
      document.getElementById("addStudentLastName").value=''
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
      document.getElementById("addClassInput").value = "";
    }

    console.log(this.state.myClasses);
    e.preventDefault();
  }

  handleClassSelection(subject) {
    this.setState({
      classSelection: subject - 1,
    });

    console.log(this.state.classSelection);
  }

  render() {
    
    let displayStudents;
    if (this.state.myClasses.length === 0) {
      console.log("classSelection" + this.state.classSelection);
      displayStudents = <h5 className="text-center" >You have no classes listed</h5>;
    } else if (this.state.classSelection === undefined) {
      console.log("classSelection" + this.state.classSelection);
      displayStudents = <span></span>;
    } else if (
      this.state.myClasses[this.state.classSelection].students.length === 0
    ) {
      displayStudents = <h5 className="text-center">You have no students listed</h5>;
    } else {
      displayStudents = this.state.myClasses[
        this.state.classSelection
      ].students.map((student, index) => (
        <li id={"sl" + index} key={"sl" + index} style={{fontWeight: 'bold'}}>
          {student.firstName + "  " + student.lastName}
          <button
            className="students"
            onClick={(e) => this.handleOpenModal(e.target.className, index)}
          >
            Edit
          </button>
          <button onClick={() => this.removeStudent(index)}>Remove</button>
        </li>
      ));
    }

    let displayClasses;
    console.log(this.state.myClasses);
    if (this.state.myClasses.length === 0) {
      displayClasses = <h5 className="text-center">You have no classes listed</h5>;
    } else {
      displayClasses = this.state.myClasses.map((subject, index) => (
        <li id={"cl" + index} key={"cl" + index} style={{fontWeight: 'bold'}}>
          {subject.subject}
          <button
            className="classes"
            onClick={(e) => this.handleOpenModal(e.target.className, index)}
          >
            Edit
          </button>
          <button onClick={() => this.removeClass(index)}>Remove</button>
        </li>
      ));
    }

    let editValue;
    if (this.state.itemEditSelection === "classes" && this.state.myClasses[this.state.itemEditId]) {
      editValue = this.state.myClasses[this.state.itemEditId].subject;
    }else if(this.state.myClasses[this.state.classSelection]!== undefined && this.state.itemEditSelection==='students'&& this.state.myClasses[this.state.classSelection].students[this.state.itemEditId]){
      editValue = this.state.myClasses[this.state.classSelection].students[this.state.itemEditId]
    }else{
      editValue=''
    }

    let editOptions;
    if (this.state.itemEditSelection==='classes'){
      editOptions = <input id="editThis" defaultValue={editValue} />
    }else if (this.state.itemEditSelection==='students'){
      editOptions = <div>
        <input id="editFirst" defaultValue={editValue.firstName} />
        <input id="editLast" defaultValue={editValue.lastName} />
      </div>
    }

    let classList;
    if (this.state.myClasses.length === 0) {
      classList = <h5>You have no classes listed</h5>;
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
        <div className='container-fluid'>
        <div className="row justify-content-around">
          <div className="col-12 col-md-3 mt-3 dashboard">
            <h3 className="text-center">Classes</h3>
            <div className="d-flex justify-content-center" >
            <form onSubmit={this.addClass}>
              <input
                ref={(a) => (this._inputElement = a)}
                id="addClassInput"
                placeholder="Add a class"
                className='mx-2'
              ></input>
              {/* <input className='mx-2'type="submit" value="Submit"></input> */}
              <button className='mx-2 mybutton' type='submit' value='submit'>Submit</button>
            </form>
            </div>
            <div className="d-flex justify-content-center mt-2">
            <ol>{displayClasses}</ol>
            </div>
          </div>
          <div className="col-12 col-md-5 dashboard mt-3">
            <h3 className="text-center">People</h3>
            <div className="d-flex justify-content-center" >
            <form className="mx-auto">
              <div className="form-group">
                <select
                  className="form-control"
                  id="selClass"
                  onChange={() =>
                    this.handleClassSelection(
                      document.getElementById("selClass").selectedIndex
                    )
                  }
                >
                  <option
                    key="defaultClass"
                    value="none"
                    disabled
                    selected
                    hidden
                  >
                    Choose Class
                  </option>
                 
                  {classList}
                  
                </select>
              </div>
            </form>
            </div>
            <div className="d-flex justify-content-center" >
            <form onSubmit={this.addStudent}>
              <div className="d-flex justify-items-center">
              <input
                ref={(a) => (this._inputElement = a)}
                id="addStudentFirstName"
                placeholder="First Name"
                className='mx-2'
              ></input>
              <input
                ref={(a) => (this._inputElement = a)}
                id="addStudentLastName"
                placeholder="Last Name"
                className='mx-2'
              ></input>
              {/* <input className='mx-2' type="submit" value="Submit"></input> */}
              <button className='mx-2 mybutton' type='submit' value='submit'>Submit</button>
              </div>
            </form>
            </div>
            <div className="d-flex justify-content-center mt-2">
            <ol>{displayStudents}</ol>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-3 dashboard">
            <h3 className="text-center">Settings</h3>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Dashboard;
