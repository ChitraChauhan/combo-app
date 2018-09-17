import storeList from "../StoreList";
import React from "react";
import { view } from "react-easy-state";

const List = view(() => (
  <div>
    <ul>
      {storeList.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
    Pending tasks: {storeList.unfinished()}
  </div>
));

const TodoItem = view(({ todo }) => (
  <li onClick={e => (storeList.todo = todo)} key={todo.id}>
    <input
      type="checkbox"
      defaultChecked={todo.finished}
      onChange={e => (todo.finished = !todo.finished)}
    />{" "}
    {todo.title}
  </li>
));

export default List;
