import { createStore } from "redux";
import reducer from "../reducers";

// Create the store with the reducer
const store = createStore(reducer);
store.dispatch({
    type: "SET_USER",
    user: {
      avatar: "https://www.gravatar.com/avatar/5c3dd2d257ff0e14dbd2583485dbd44b",
      name: "Dave",
      followers: 1234,
      following: 123
    }
  });
  
export default store;
