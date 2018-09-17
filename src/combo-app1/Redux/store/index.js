import { createStore } from "redux";
// import {addTodo} from "../actions"
import todoReducer from "../reducers";

const store = createStore(todoReducer);
console.log(store.getState())
// store.subscribe(() => console.log('Look ma, Redux!!'))
// console.log(store.dispatch( addTodo({ title: 'TaskA', id: 0, finished: false }) ))

export default store;