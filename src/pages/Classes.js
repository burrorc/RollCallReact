import React from "react";
import mySampleArray from '../mySampleArray.js'
import ClassButtons from '../components/ClassButtons'
import ReactModal from 'react-modal'
import SimpleList from '../components/SimpleList'

class Classes extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      sampleArray: mySampleArray, 
      showModal: false, 
      classSelection:0};
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.selectClass = this.selectClass.bind(this)
  }
  
  handleOpenModal () {
    this.setState({ showModal: true});
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  selectClass(item){
    console.log(item);
  }

  render() {
    const displayButtons = this.state.sampleArray.map((subject, index)=>(
      <button key={index} className='my-3' onClick={this.handleOpenModal} style={{ height: "100px" }}>
        <ClassButtons item={index} text={subject.subject} />
      </button>
    
    ))
    const displayStudents = this.state.sampleArray[0].students.map((student, index)=>(
      <SimpleList key={index} lastName={student.lastName} firstName={student.firstName}/>
    ))
    
    return(
      <div className="container">
        <div>
        <ReactModal 
           isOpen={this.state.showModal}
           
        >
          
          <ol>
          {displayStudents}
          </ol>
          
<button onClick={this.handleCloseModal}>Close Modal</button>
        

          
        </ReactModal>
        </div>
      <h2>Classes</h2>
      <div className="row">
          <div className="col-6">
            
          </div>
        </div>
        <div className="row justify-content-around">{displayButtons}</div>
      </div>
      
      
    )
  }
}

ReactModal.setAppElement('body')
export default Classes
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
