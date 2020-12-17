import React from "react";
import Task from "./Task";

class TasksList extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.tasks.map((task) => (
            <Task
              key={task.key}
              text={task.text}
              id={task.id}
              removeTask={this.props.removeTask}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TasksList;
