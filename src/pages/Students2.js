import React from "react";
import students from "../Students";
import StudentList from "../components/StudentList";

// const studentDisplay = students[1][1].students.map((student) => (
//   <StudentList firstName={student.firstName} lastName={student.lastName} />
// ));

// function Classes() {
//   return (
//     <div className="container">
//       <div className='row'>
//       <div className="col-lg-3 border mt-3" style={{ width: "25vw" }}>
//       <h5 className="text-center mt-2">{classes[1][0].subject}</h5>
//       <ol>{studentDisplay}</ol>
//     </div>
//     </div>
//     </div>
//   );
// }

class Students2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = { students };
  }

  render() {
    const classDisplay2 = this.state.students[0][1].students.map((student) => (
      <StudentList
        firstName={student.firstName}
        lastName={student.lastName}
      />
    ));
    return (
      <div className='container'>
    <div className='row justify-content-around'>
    <div className="col-lg-4 border mt-3 " style={{ width: "35vw" }}>
          <h3 className="text-center mt-2">{this.state.students[0][this.props.id].subject}<button>Edit</button></h3>
         
          <ol className='mx-auto list-group'>
            {classDisplay2}
          </ol>
          </div>
    
    </div>
    </div>
    )
  }
}

export default Students2;
