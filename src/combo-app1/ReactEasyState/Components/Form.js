import storeList from "../StoreList";
import React from "react";
import { view } from "react-easy-state";

const Form = view(() => (
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

export default Form;
