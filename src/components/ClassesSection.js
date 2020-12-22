import React from 'react'

function ClassesSection(props) {
    return(
        <div className="col-11 col-md-3 mt-3 dashboard">
              <h3 className="text-center">Classes</h3>
              <div className="d-flex justify-content-center">
                <form onSubmit={props.addClass}>
                  <input
                    ref={props.ref}
                    id="addClassInput"
                    placeholder="Add a class"
                    className="mx-2"
                  ></input>
                  <button
                    className="mx-2 mybutton"
                    type="submit"
                    value="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <ol>{props.displayClasses}</ol>
              </div>
            </div>
    )
    // return (
    //   <div>
    //     <button
    //       id={"ca" + props.classIndex}
    //       className="my-3 mybutton"
    //       onClick={props.handleOpenModal}
    //       style={{ height: "100px" }}
    //     >
    //       <div className="col" style={{ width: "50vw" }}>
    //         <h3 className="text-center my-0">{props.text}</h3>
    //       </div>
    //     </button>
    //   </div>
    // );
  }
  export default ClassesSection;