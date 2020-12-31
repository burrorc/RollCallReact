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
                Add Class
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center">
        <ol style={{ width: "75%" }}>{props.displayClasses}</ol>
       </div> 
     
    </div>
  );
}
export default ClassesSection;
