// Used to store the details of the movie that is clicked
const details = (state = {}, action) => {
  switch (action.type) {
    case "SET_DETAILSS":
      return action.payload;
    default:
      return state;
  }
};

export default details;