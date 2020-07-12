const videoss = (state = [], action) => {
  switch (action.type) {
    case "SET_VIDEOSS":
      return action.payload;
    default:
      return state;
  }
};

export default videoss;