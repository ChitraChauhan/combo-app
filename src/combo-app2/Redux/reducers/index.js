// Create a reducer with an empty initial state
const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Respond to the SET_USER action and update
    // the state accordingly
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}

export default reducer