import { store } from "react-easy-state";

let taskId = 0;

const defaultTodo = {
  title: "",
  finished: false
};

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

const storeList = store({
  todo: {
    ...defaultTodo
  },

  todos: [...Todo],

  findIndex(id) {
    const { todos } = storeList;
    return todos.findIndex(record => record.id === id);
  },

  onChange(e) {
    storeList.todo.title = e.target.value;
  },

  unfinished() {
    const { todos } = storeList;
    return todos.filter(todo => !todo.finished).length;
  },

  removeTodo(id) {
    storeList.todos = [...storeList.todos.filter(todo => todo.id !== id)];
  },

  onSubmit(e) {
    e.preventDefault();
    const { todo, todos } = storeList;
    if (todo.id) {
      const index = this.findIndex(todo.id);
      todos[index] = todo;
    } else {
      todo.id = ++taskId;
      todos.push({ ...todo });
    }
    storeList.todo = { ...defaultTodo };
  }
});

export default storeList;
