import React from "react";

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      myClasses: ['math','science'],
      items:[]

    }
    this.addItem=this.addItem.bind(this)
  }
  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = this._inputElement.value;
   
      this.setState((prevState) => {
        return { 
          myClasses: prevState.myClasses.concat(newItem) 
        };
      });
     
      this._inputElement.value = "";
    }
     
    console.log(this.myClasses.items);
       
    e.preventDefault();
  }
render(){
  console.log(this.state.myClasses)
  let displayClasses
  if(this.state.myClasses.length === 0){
    displayClasses = <li>You have no classes registered</li>
  }else{
    displayClasses = this.state.myClasses.map((subject, index)=>(
      <li key={'cl'+index}>{subject}</li>
    ))
  }
  return(
    <div>
    <h2>Dashboard</h2>
    <form onSubmit={this.addItem}>
          <input ref={(a) => this._inputElement = a} 
                  placeholder="enter task">
          </input>
          <button type="submit">add</button>
        </form>
    <ol>
      {displayClasses}
    </ol>
    </div>
  )
}
}


export default Dashboard