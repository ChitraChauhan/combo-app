import React, { Component } from "react";

const TodoContext = React.createContext();
const TodoContext1 = React.createContext();

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

const FormContainer = () => (
  <TodoContext.Consumer>
    {({ todo, onChange, onSubmit }) => (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={onChange}
        />
        {todo.id ? <button>update</button> : <button>Add</button>}
      </form>
    )}
  </TodoContext.Consumer>
);

const ListContainer = () => (
  <TodoContext1.Consumer>
    {({ todos, updateTodo, removeTodo }) => (
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={() => updateTodo(todo)}
            removeTodo={() => removeTodo(todo.id)}
          />
        ))}
      </ul>
    )}
  </TodoContext1.Consumer>
);

const TodoItem = ({ updateTodo, todo, removeTodo }) => (
  <div>
    <li style={{ float: "left" }} onClick={updateTodo}>
      <input
        type="checkbox"
        defaultChecked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />{" "}
      {todo.title}
    </li>
    <button style={{ float: "center" }} onClick={removeTodo}>
      Remove
    </button>
  </div>
);

export default class ContextTodoApp extends Component {
  state = {
    todo: { ...defaultTodo },
    todos: [...Todo]
  };

  onChange(e) {
    const { todo } = this.state;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  }

  updateTodo(record) {
    this.setState({ todo: record });
  }

  unfinished() {
    const { todos } = this.state;
    return todos.filter(todo => !todo.finished).length;
  }

  findIndex(id) {
    const { todos } = this.state;
    return todos.findIndex(record => record.id === id);
  }

  removeTodo(id) {
    const { todos } = this.state;
    let index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    this.setState({ todos });
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
    return (
      <div>
        <TodoContext.Provider
          value={{
            todo: this.state.todo,
            onChange: e => this.onChange(e),
            onSubmit: e => this.onSubmit(e)
          }}
        >
          <FormContainer />
        </TodoContext.Provider>
        <TodoContext1.Provider
          value={{
            todos: this.state.todos,
            updateTodo: todo => this.updateTodo(todo),
            removeTodo: id => this.removeTodo(id)
          }}
        >
          <ListContainer />
        </TodoContext1.Provider>
        <div>Pending tasks: {this.unfinished()}</div>
      </div>
    );
  }
}
