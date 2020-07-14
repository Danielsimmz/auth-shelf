import React, { Component } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Quality extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/interest");
  };
  //this function takes user to previous page
  previous = () => {
    this.props.history.push("/feedback");
  };

  //set state to local variable
  state = {
    input: {
      quality: 0,
    },
  };

  //capture input value
  handleChange = (event) => {
    this.setState({
      input: {
        quality: Number(event.target.value),
      },
    });
  };
  //store input value in global state
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GET_QUALITY", payload: this.state.input.quality });
    console.log(this.state.input);
    //reset the state after submission
    this.setState({
      input: {
        quality: 0,
      },
    });
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
          <b>Rate the quality of the content?</b>
        </p>
        {/*on submission this form will take you to the next page in the process */}
        <form onSubmit={() => this.next()}>
          <button
            variant="container"
            color="primary"
            onClick={() => this.previous()}
          >
            Previous
          </button>
          <input
            value={this.state.input.quality}
            type="number"
            min="0"
            max="10"
            placeholder="Choose from 1-10"
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button
            id="review"
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

export default withRouter(connect()(Quality));
