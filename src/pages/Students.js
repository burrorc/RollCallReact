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

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = { students };
  }

  render() {
    const classDisplay = this.state.students.map(function (item) {
      const students = item[1].students.map((student) => (
        <StudentList
          firstName={student.firstName}
          lastName={student.lastName}
        />
      ));
      return (
        <div className="col-lg-3 border mt-3 " style={{ width: "35vw" }}>
          <h3 className="text-center mt-2">{item[0].subject}</h3>
          <ol className='mx-auto list-group'>{students}</ol>
          </div>
      );
    });
    return (
      <div className='container'>
    <div className='row justify-content-around'>
    { classDisplay }
    </div>
    </div>
    )
  }
}

export default Students;
