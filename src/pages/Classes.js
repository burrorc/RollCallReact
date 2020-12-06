import React from "react";
import mySampleArray from '../mySampleArray.js'
import ClassButtons from '../components/ClassButtons'
import ReactModal from 'react-modal'

class Classes extends React.Component {
  constructor(props){
    super(props)
    this.state = { mySampleArray, showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render() {
    const displayButtons = mySampleArray.map((subject)=>(
      <button className='my-3' onClick={this.handleOpenModal} style={{ height: "100px" }}>
        <ClassButtons text={subject.subject} />
      </button>
      
    ));
    return(
      <div className="container">
        <div>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
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
