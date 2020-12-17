import React from "react";
import ReactModal from "react-modal";

const classesArray = [];
const studentsArray = [];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      myClasses: classesArray,
      myStudents: studentsArray,
      itemEditArray: "",
      itemEditId: "",
      classSelection: undefined,
    };
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.addStudent = this.addStudent.bind(this)
  }

  editItem() {
    if (this.state.itemEditArray === "classes") {
      let myClasses = [...this.state.myClasses];
      myClasses[this.state.itemEditId].subject = document.getElementById(
        "editThis"
      ).value;
      this.setState({ myClasses });
    } else if (this.state.itemEditArray === "students") {
      let myStudents = [...this.state.myStudents];
      myStudents[this.state.itemEditId] = document.getElementById(
        "editThis"
      ).value;
      this.setState({ myStudents });
    }
  }

  handleOpenModal(array, item) {
    this.setState(
      { itemEditArray: array, itemEditId: item },
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
  }

  // removeStudent(id) {
  //   let newArray = [...this.state.myClasses]
  //   const newStudentList = this.state.myClasses[this.state.classSelection].students.filter((student, index) => {
  //     if (index !== id) {
  //       return student;
  //     }
  //   });
  //   newArray[this.state.classSelection].students = {...newArray[this.state.classSelection].students, newStudentList}
  //   this.setState({
  //     myClasses: newArray,
  //     })
  // }
  
  addStudent(e){
    let newStudentFirst = document.getElementById("addStudentFirstName").value
    let newStudentLast = document.getElementById("addStudentLastName").value
    if(newStudentFirst!==''&& newStudentLast!==''){
    let newArray = [...this.state.myClasses]
    let studentIndex = newArray[this.state.classSelection].students.length
    newArray[this.state.classSelection].students[studentIndex] = {...newArray[this.state.classSelection].students[studentIndex], firstName: newStudentFirst, lastName: newStudentLast}
    this.setState({
      myClasses: newArray,
      },
      ()=>console.log(this.state.myClasses)
      );
    
      
    }else{
      alert("Please enter a complete student name")
    }
    e.preventDefault();
  }

  addClass(e) {
    let newClass = document.getElementById('addClassInput').value
    if (newClass !== "") {
      this.setState({
        myClasses: [...this.state.myClasses, {subject: newClass}],
      });
      this.setState((prevState)=>{
        const addStudentsObject = prevState.myClasses.map((subject)=>{
          if(subject.students){
            return subject
          }else{
            subject.students = []
            return subject
          }
        })
        return{
          myClasses: addStudentsObject,
        }
      })
      document.getElementById('addClassInput').value = "";
    }
    
    console.log(this.state.myClasses)
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
      console.log('classSelection'+this.state.classSelection)
      displayStudents = <h5>You have no classes listed</h5>;
    }else  if (this.state.classSelection === undefined) {
      console.log('classSelection'+this.state.classSelection)
      displayStudents = <span></span>;
    }else if (this.state.myClasses[this.state.classSelection].students.length===0){
      displayStudents = <h5>You have no students listed</h5>;
    }
    else {
      displayStudents = this.state.myClasses[this.state.classSelection].students.map((student, index) => (
        <li id={"sl" + index} key={"sl" + index}>
          {student.lastName+', '+student.firstName}
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
      displayClasses = <h5>You have no classes listed</h5>;
    } else {
      displayClasses = this.state.myClasses.map((subject, index) => (
        <li id={"cl" + index} key={"cl" + index}>
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
    if (this.state.itemEditArray === "classes") {
      editValue = this.state.myClasses[this.state.itemEditId].subject;
    }

    let classList;
    if (this.state.myClasses.length === 0) {
      classList = <h5>You have no classes listed</h5>;
    } else {
      classList = this.state.myClasses.map(
        (subject, index) => (
          <option key={"cs"+index} id={"cs" + index} value={index}>
            {subject.subject}
          </option>
        )
      );
    }
    return (
      <div>
        <div>
          <ReactModal isOpen={this.state.showModal}>
            <form onSubmit={this.handleCloseModal}>
              <input id="editThis" defaultValue={editValue} />

              <input type="submit" value="Submit"></input>
            </form>
          </ReactModal>
        </div>
        <div className="row">
        
          <div className="col-12 col-md-3">
          <h3>Classes</h3> 
            <form onSubmit={this.addClass}>
              <input
                ref={(a) => (this._inputElement = a)}
                id="addClassInput"
                placeholder="Add a class"
              ></input>
              <input type="submit" value="Submit"></input>
            </form>

            <ol>{displayClasses}</ol>
          </div>
          <div className="col-12 col-md-6">
          <h3>People</h3>
          <form>
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
                <option key='defaultClass' value="none" disabled selected hidden>
                  Choose Class
                </option>
                {classList}
              </select>
              
            </div>
          </form> 
          <button onClick={()=>this.addStudent()}>click</button>
          <form onSubmit={this.addStudent}>
              <input
                ref={(a) => (this._inputElement = a)}
                id="addStudentFirstName"
                placeholder="First Name"
              ></input>
              <input
                ref={(a) => (this._inputElement = a)}
                id="addStudentLastName"
                placeholder="Last Name"
              ></input>
              <input type="submit" value="Submit"></input>
            </form>

            <ol>{displayStudents}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
