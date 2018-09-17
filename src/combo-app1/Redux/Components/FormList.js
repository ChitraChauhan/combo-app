import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveTodo, removeTodo, updateTodo } from "../actions";

class TodoForm extends Component {
  onChange = e => {
    const { todo } = this.props;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  };

  render() {
    const { todo, saveTodo } = this.props;
    return (
      <form onSubmit={e => saveTodo(e)}>
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={e => this.onChange(e)}
        />
        {todo.id ? <button>Update</button> : <button>Add</button>}
      </form>
    );
  }
}

const TodoList = ({ todos, removeTodo, updateTodo }) => (
  <div>
    <ul>
      {todos &&
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
    </ul>
    Pending Tasks:
    {todos && todos.filter(todo => !todo.finished).length}
  </div>
);

const TodoItem = ({ todo, removeTodo, updateTodo }) => (
  <div>
    <li style={{ float: "left" }} onClick={() => updateTodo(todo)}>
      <input
        type="checkbox"
        checked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />{" "}
      {todo.title}
    </li>
    <button style={{ float: "center" }} onClick={() => removeTodo(todo.id)}>
      Remove
    </button>
  </div>
);

const mapStateToProps = state => {
  return {
    todos: state.todos,
    todo: state.todo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveTodo: saveTodo,
      removeTodo: removeTodo,
      updateTodo: updateTodo
    },
    dispatch
  );
};

var TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

var TodoFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);

export default class ReduxTodoApp extends Component {
  render() {
    return (
      <div>
        <TodoFormContainer />
        <TodoListContainer />
      </div>
    );
  }
}
