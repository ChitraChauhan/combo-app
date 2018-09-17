import React, { Component } from "react";

import { decorate, observable, computed, action } from "mobx";
import { observer } from "mobx-react";

let taskId = 0;

const Todo1 = [
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

//class 1
class Todo {
  id = Math.random();
  title = "";
  finished = false;
  constructor(title) {
    this.title = title;
  }
}

decorate(Todo, {
  title: observable,
  finished: observable
});

//class 2
class TodoStore {
  todos = [...Todo1];
  todo = {
    ...defaultTodo
  };

  add(title) {
    this.todos.push(new Todo(title));
  }

  get unfinished() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  removeTodo(id) {
    let index = this.todos.findIndex(t => t.id === id);
    return this.todos.splice(index, 1);
    // this.todos.remove(this.todos[index]);
  }
}

decorate(TodoStore, {
  todos: observable,
  todo: observable,
  add: action,
  removeTodo: action,
  unfinished: computed
});

const TodoItem = observer(({ todo }) => (
  <div>
    <li >
      <input
        type="checkbox"
        checked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />{" "}
      <a onClick={e => (store.todo = todo)}> {todo.title}</a>{" "}
      <button onClick={() => store.removeTodo(todo.id)}>Remove</button>
    </li>
  </div>
));

const TodoEditor = observer(({ store }) => {
  let input;
  let todo = store.todo;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!store.todo.id) {
          store.add(input.value);
        }
        store.todo = { ...defaultTodo };
        input.focus();
      }}
    >
      <input
        type="text"
        ref={node => (input = node)}
        value={todo.title}
        onChange={e => (todo.title = e.target.value)}
      />
      {todo.id ? <button>Update</button> : <button>Add</button>}
    </form>
  );
});

const TodoList = observer(({ store }) => (
  <div>
    <TodoEditor store={store} />
    <ul>
      {store.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
    <div>Pending tasks: {store.unfinished}</div>
  </div>
));

const store = new TodoStore();

export default class MobxTodoApp extends Component {
  render() {
    return <TodoList store={store} />;
  }
}
