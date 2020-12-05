import React from "react";
import classes from "../Classes";
import ClassesList from "../components/ClassesList";

const classesDisplay = classes.map((subject) => (
  <ClassesList title={subject} key={subject.index} />
));

// function Classes() {
//   return (
//     <div className='container'>
//   <div className='row justify-content-around'>
//   { classesDisplay }
//   </div>
//   </div>
//   )
//   }
class Classes extends React.Component {
  constructor() {
    super();
    this.state = { classes };
  }
  render() {
    const newClass = document.getElementById("newClass");
    const addClass = function () {
      classes.push(newClass.value);
      newClass.value = "";
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form style={{ display: "flex" }}>
              <input
                type="text"
                className="form-control"
                name="className"
                placeholder="Add a class here"
                id="newClass"
              />
              <button onClick={addClass} className="btn btn-primary">
                Add Class
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-around">{classesDisplay}</div>
      </div>
    );
  }
}

export default Classes;
