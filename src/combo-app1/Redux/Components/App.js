import React from "react";
import TodoList from "./TodoListContainer";
import TodoForm from "./TodoFormContainer"

const TaskList = () => (
    <div>
    <TodoForm />
    <TodoList />
  </div>
);

export default TaskList;