import React from "react";

function ClassesSection(props) {
  return (
    <div className="col-11 col-md-4 mt-3 dashboard px-md-0">
      <h3 className="text-center textC" style={{marginTop: 10}}>Classes</h3>
      <div className="container-fluid d-flex justify-content-center">
        <form 
        onSubmit={props.addClass} 
        style={{width: '100%'}}>
          <div className="row justify-content-center mb-2">
            <div className="col-10 col-sm-6 col-md-8 col-lg-6" style={{textAlign: 'center'}}>
              <input
                ref={props.ref}
                id="addClassInput"
                placeholder="Add a class"
                className=" my-1"
              ></input>
            </div>
            <div className="col" style={{flex: '0 0 150px'}}>
              <button className="mx-0 my-1 mybutton" type="submit" value="submit">
                Add Class
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center">
        <ol style={{ width: "75%" }}>
          {props.displayClasses}
          </ol>
       </div> 
     
    </div>
  );
}
export default ClassesSection;
