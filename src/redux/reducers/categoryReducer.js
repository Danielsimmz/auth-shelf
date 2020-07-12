const showcategory = (state = [], action) => {
  switch (action.type) {
    case "PUT_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export default showcategory;