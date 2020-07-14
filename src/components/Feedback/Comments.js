import React, { Component } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//this component is for taking input on how the user feels supported
class Comments extends Component {
  //this function takes you ro the next page in the steps
  next = (event) => {
    this.props.history.push("/review");
  };

  //this function takes you back to the previous page in the steps
//   previous = () => {
//     this.props.history.push("/interest");
//   };

  //set state to local variable
  state = {
    input: {
      comments: "",
    },
  };

  //capture input value
  handleChange = (event) => {
    this.setState({
      input: {
        comments: event.target.value,
      },
    });
  };
  //store input value in global state
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GET_COMMENTS", payload: this.state.input.comments });
    console.log(this.state.input);
    //reset the state
    this.setState({
      input: {
        comments: "",
      },
    });
    this.next();
  };
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>
            <i>Don't forget it!</i>
          </h4>
        </header>
        <p>
          <b>Any comments you want to leave</b>
        </p>
        {/*on submission this form will take you to the next page in the process */}
        <form >
          {/* <button
            variant="container"
            color="primary"
            onClick={() => this.previous}
          >
            Previous
          </button> */}
          <input
            placeholder="Add comments"
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button
            id="review"
            variant="container"
            color="primary"
            type="submit"
            onClick={(event) => this.handleClick(event)}
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(Comments));
