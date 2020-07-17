const feedbackReducer = (state = {}, action) => {
  let newState = { ...state };
  if (action.type === "GET_UNDERSTANDING") {
    newState = { ...state, understanding: action.payload };
  } else if (action.type === "GET_QUALITY") {
    newState = { ...state, quality: action.payload };
  } else if (action.type === "GET_INTEREST") {
    newState = { ...state, interest: action.payload };
  } else if (action.type === "GET_COMMENTS") {
    newState = { ...state, comments: action.payload };
  }
  return newState;
};

export default feedbackReducer;
