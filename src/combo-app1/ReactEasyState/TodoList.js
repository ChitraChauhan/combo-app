import React, { Component } from "react";
import storeList from "./StoreList";
import { view } from "react-easy-state";

const TodoEditor = view(() => (
  <form onSubmit={e => storeList.onSubmit(e)}>
    <input
      type="text"
      name="title"
      value={storeList.todo.title}
      onChange={e => storeList.onChange(e)}
    />
    {storeList.todo.id ? <button>Update</button> : <button>Add</button>}
  </form>
));

const ListView = view(() => (
  <div>
    <ul>
      {storeList.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
    Pending tasks: {storeList.unfinished()}
  </div>
));

const TodoItem = view(({ todo }) => (
  <div>
    <li>
      <input
        type="checkbox"
        defaultChecked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />{" "}
      <a onClick={e => (storeList.todo = todo)}> {todo.title}</a>{" "}
      <button onClick={() => storeList.removeTodo(todo.id)}>Remove</button>
    </li>
  </div>
));

export default class EasyStateTodoApp extends Component {
  render() {
    return (
      <div>
        <TodoEditor />
        <ListView />
      </div>
    );
  }
}
