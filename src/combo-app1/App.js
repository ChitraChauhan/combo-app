import React from "react";

import ReactTodoApp from "./ReactSetState/TaskApp";
import MobxTodoApp from "./Mobx/TodoApp";
import EasyStateTodoApp from "./ReactEasyState/TodoList";
import EasystateApp from "./ReactEasyState/Components/EasystateApp";
import ReduxTodoApp from "./Redux/Components/FormList";
import TaskList from "./Redux/Components/App";
import ContextTodoApp from "./context-api/ReactContext";

const App = () => (
  <div>
    <div>
      <h3>TodoList with React Setstate</h3>
      <ReactTodoApp />
    </div>
    <div>
      <h3>TodoList in Redux</h3>
      {/* Within one File */}
      <ReduxTodoApp />
      {/* <TaskList /> */}
    </div>
    <div>
      <h3>TodoList in Mobx</h3>
      <MobxTodoApp />
    </div>
    <div>
      <h3>TodoList in React Easy State</h3>
      {/* Within one File */}
      <EasyStateTodoApp />
      {/* <EasystateApp/> */}
    </div>
    <div>
      <h3>TodoList with New Context API</h3>
      <ContextTodoApp />
    </div>
  </div>
);

export default App;
