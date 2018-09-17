let id = 0;

const defaultTodo = {
  title: "",
  finished: false
};

const initialState = {
  todos: [
    { title: "TaskA", id: ++id, finished: false },
    { title: "TaskB", id: ++id, finished: false }
  ],
  todo: { ...defaultTodo }
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TODO":
      return { ...state, todo: { ...action.todo } };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.id)]
      };
    case "SAVE_TODO":
      action.savePayload.preventDefault();
      const { todos, todo } = state;
      if (!todo.id) {
        todo.id = ++id;
        todos.push({ ...todo });
      } else {
        const index = todos.findIndex(record => record.id === todo.id);
        todos[index] = todo;
      }
      return {
        ...state,
        todos: [...state.todos],
        todo: { ...defaultTodo }
      };
    default:
      return state;
  }
};

export default todoReducer;
