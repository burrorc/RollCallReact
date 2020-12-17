import React from 'react'

class Task extends React.Component{
    constructor(props){
        super(props);

        this.removeTask = this.removeTask.bind(this);
        this.markDone = this.markDone.bind(this)

        this.state ={
            backgroundColor:''
        }
    }
removeTask(){
    this.props.removeTask(this.props.id)
}
markDone(){
    if(this.state.backgroundColor===''){
        this.setState({backgroundColor: 'rgb(144,238,144,0.5)'})
    }else{
        this.setState({backgroundColor:''})
    }
    }
render(){
    return(
    <div>
        <div>
            <div>
                <h2>{this.props.text}</h2>
            </div>
            <div>
                <button onClick={this.markDone}>V</button>
                <button onClick={this.removeTask}>V</button>
            </div>
        </div>
    </div>
    )
}
}
export default Task