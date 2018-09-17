import React from "react";
import ReactApp from "./ReactSetState/ReactApp";
import ReduxApp from "./Redux/Components/ReduxApp";
import ReactContextApp from "./context-api/ReactContext";
// import ReactContextApp from "./context-api/ReactContext1"

const App = () => (
  <div>
    <ReactApp />
    <ReduxApp />
    <ReactContextApp />
  </div>
);

export default App;
