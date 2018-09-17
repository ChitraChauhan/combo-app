import React, { Component } from "react";

let taskId = 0;

const Todo = [
  {
    id: ++taskId,
    title: "taskA",
    finished: false
  },
  {
    id: ++taskId,
    title: "taskB",
    finished: false
  }
];

const defaultTodo = {
  title: "",
  finished: false
};

const FormContainer = ({ todo, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" name="title" value={todo.title} onChange={onChange} />
    {todo.id ? <button>update</button> : <button>Add</button>}
  </form>
);

const ListContainer = ({ todos, updateTodo, removeTodo }) => (
  <ul>
    {todos &&
      todos.map(todo => (
        <Item
          key={todo.id}
          todo={todo}
          updateTodo={() => updateTodo(todo)}
          removeTodo={() => removeTodo(todo.id)}
        />
      ))}
  </ul>
);

const Item = ({ todo, updateTodo, removeTodo }) => (
  <div>
    <li style={{ float: "left" }} onClick={updateTodo}>
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

export default class ReactTodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: { ...defaultTodo },
      todos: [...Todo]
    };
  }

  // shouldComponentupdateTodo(nextProps, nextState) {
  //   console.log("this.state", this.state);
  //   console.log("nextState", nextState);
  //   if (this.state === nextState) {
  //     console.log("inside if::");
  //     return false;
  //   }
  //   return true;
  // }

  onChange(e) {
    const { todo } = this.state;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  }

  unfinished() {
    console.log("ff");
    return this.state.todos.filter(todo => !todo.finished).length;
  }

  findIndex(id) {
    const { todos } = this.state;
    return todos.findIndex(record => record.id === id);
  }

  updateTodo(record) {
    this.setState({ todo: record });
  }

  removeTodo(id) {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { todos, todo } = this.state;
    if (todo.id) {
      const index = this.findIndex(todo.id);
      todos[index] = todo;
    } else {
      todo.id = ++taskId;
      todos.push({ ...todo });
    }
    this.setState({ todos, todo: { ...defaultTodo } });
  }

  render() {
    const { todo, todos } = this.state;

    return (
      <div>
        <FormContainer
          todo={todo}
          onChange={e => this.onChange(e)}
          onSubmit={e => this.onSubmit(e)}
        />
        <ListContainer
          todos={todos}
          updateTodo={todo => this.updateTodo(todo)}
          removeTodo={id => this.removeTodo(id)}
        />
        <div>Pending tasks: {this.unfinished()}</div>
      </div>
    );
  }
}
