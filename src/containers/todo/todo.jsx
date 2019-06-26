import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTast, removeTask, completeTask, changeFilter } from '../../actions/actionCreator';

import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';

import './todo.css';


class ToDo extends Component {

  state = {
    // activeFilter: 'all',
    taskText: ''
  }
  handleInputChange = ({target: {value}}) => {
    this.setState({
      taskText: value
    })
  }

  addTast = ({ key }) => {
    const { taskText } = this.state;
    if (taskText.length > 3 && key === 'Enter') {
      const {addTast} = this.props;
      addTast((new Date()).getTime(), taskText, false);
      this.setState({
        taskText: '',
      })
    }
  }

  render() {
    const { activeFilter, taskText } = this.state;
    const { tasks, removeTask, completeTask, filter, changeFilter } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    console.log(taskText);
    return (
      <div className="todo-wrapper">
        <ToDoInput onKeyPress={this.addTast} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList tasksList={tasks} removeTask={removeTask} completeTask={completeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} amount={tasks.length} activeFilter={filter} />}
      </div>
    );
  }
}

export default connect(({ tasks, filter }) => ({
  tasks,
  filter,
}), { addTast, removeTask, completeTask, changeFilter })(ToDo);

