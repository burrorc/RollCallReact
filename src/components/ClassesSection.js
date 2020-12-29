import React from "react";

function ClassesSection(props) {
  return (
    <div className="col-11 col-md-4 mt-3 dashboard px-md-0">
      <h3 className="text-center">Classes</h3>
      <div className="d-flex justify-content-center">
        <form onSubmit={props.addClass}>
          <div className="row justify-content-center">
            <div className="col" style={{textAlign: 'center'}}>
              <input
                ref={props.ref}
                id="addClassInput"
                placeholder="Add a class"
                className="mx-2 my-1"
              ></input>
            </div>
            <div className="col" style={{textAlign: 'center'}}>
              <button className="mx-2 my-1 mybutton" type="submit" value="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container-fluid d-flex justify-content-center">
      <div className="my-2 col-10 col-md-12 col-lg-9 px-md-0">
        <ol >{props.displayClasses}</ol>
      </div>
      </div>
    </div>
  );
}
export default ClassesSection;
